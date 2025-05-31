# ──────────────────────────────────────────────────────────────────────
# ETAPA 1: frontend-builder → instalar y compilar Next.js
# ──────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS frontend-builder

# 1.1) Definimos build-args para Supabase
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# 1.2) Convertimos esos build-args en variables de entorno
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}

# 1.3) Directorio de trabajo para frontend
WORKDIR /app/frontend

# 1.4) Copiamos sólo package.json y package-lock.json para optimizar cache
COPY frontend/package.json frontend/package-lock.json* ./

# 1.5) Instalamos dependencias del frontend
RUN npm install

# 1.6) Copiamos el resto de la carpeta frontend
COPY frontend/ ./

# 1.7) Ejecutamos la build de Next.js
RUN npm run build



# ──────────────────────────────────────────────────────────────────────
# ETAPA 2: backend-builder → instalar dependencias del backend
# ──────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS backend-builder

# 2.1) Directorio de trabajo para backend
WORKDIR /app/backend

# 2.2) Copiamos package.json y package-lock.json de backend
COPY backend/package.json backend/package-lock.json* ./

# 2.3) Instalamos dependencias del backend
RUN npm install

# 2.4) Copiamos el resto de la carpeta backend
COPY backend/ .



# ──────────────────────────────────────────────────────────────────────
# ETAPA 3: runner → armamos la imagen final con backend + frontend compilado
# ──────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

# 3.1) Definimos el directorio raíz en contenedor
WORKDIR /app

# 3.2) Copiamos el backend ya instalado
COPY --from=backend-builder /app/backend ./backend

# 3.3) Copiamos el frontend ya compilado (incluye la carpeta .next, public, etc.)
COPY --from=frontend-builder /app/frontend ./

# 3.4) Copiamos el script de inicio (start.sh) y le damos permiso
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# 3.5) Exponemos puertos (Next en 3000 y tu backend en 4000, ajústalo si es otro puerto)
EXPOSE 3000 4000

# 3.6) Comando por defecto: ejecutamos start.sh para levantar backend + frontend
CMD ["./start.sh"]
