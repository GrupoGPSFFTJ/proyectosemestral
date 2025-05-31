# ─────────────────────────────────────────────────────────────
# 1) STAGE “frontend-builder”: Instalar dependencias y compilar React/Next
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS frontend-builder

# 1.1) Definimos build‐args para que podamos pasar las variables de Supabase
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# 1.2) Convertimos esos build‐args en variables de entorno durante la build
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}

# 1.3) Nos movemos al directorio del frontend
WORKDIR /app/frontend

# 1.4) Copiamos package.json y package-lock.json para aprovechar capa de caché
COPY frontend/package.json frontend/package-lock.json* ./

# 1.5) Instalamos dependencias del frontend
RUN npm install

# 1.6) Copiamos TODO el resto de los archivos del frontend
COPY frontend/ .

# 1.7) Ejecutamos la build de Next.js (gracias a que ya tenemos las env vars)
RUN npm run build


# ─────────────────────────────────────────────────────────────
# 2) STAGE “backend-builder”: Instalar dependencias del backend
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS backend-builder

# 2.1) Directorio de trabajo para backend
WORKDIR /app/backend

# 2.2) Copiamos package.json y package-lock.json del backend
COPY backend/package.json backend/package-lock.json* ./

# 2.3) Instalamos dependencias del backend
RUN npm install

# 2.4) Copiamos el resto de los archivos de tu backend
COPY backend/ .


# ─────────────────────────────────────────────────────────────
# 3) STAGE “runner”: Empaquetar la imagen final con ambos servicios
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

# 3.1) Directorio raíz donde vivirá todo en producción
WORKDIR /app

# 3.2) Copiamos el backend ya instalado
COPY --from=backend-builder /app/backend ./backend

# 3.3) Copiamos el frontend ya compilado
COPY --from=frontend-builder /app/frontend ./

# 3.4) Copiamos el script de inicio (start.sh) y le damos permiso de ejecución
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# 3.5) Exponemos ambos puertos (ajusta según tu backend/frontend)
#      Supongamos: 
#      · El frontend (Next.js) arranca en el puerto 3000
#      · El backend (Express/Node) arranca en el puerto 4000
EXPOSE 3000 4000

# 3.6) Comando final: ejecutamos el script que arranca ambos servicios
CMD ["./start.sh"]
