# ─────────────────────────────────────────────────────────────
# ETAPA 1: Builder (instalar dependencias y compilar Next.js)
# ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

# 1) Declara build‐args para Supabase
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# 2) Convertir build‐args en variables de entorno
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3) Definir directorio de trabajo
WORKDIR /app/frontend

# 4) Copiar package.json y lockfile para aprovechar caché
COPY frontend/package.json frontend/package-lock.json* ./

# 5) Instalar dependencias
RUN npm install

# 6) Copiar el resto del código (layouts, páginas, utils, etc.)
COPY frontend/ .

# 7) Ejecutar la build en modo producción
RUN npm run build

# ─────────────────────────────────────────────────────────────
# ETAPA 2: Runner (solo archivos ya compilados)
# ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS runner

# 1) Definir directorio de trabajo
WORKDIR /app/frontend

# 2) Copiar únicamente lo necesario desde el builder
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/node_modules ./node_modules
COPY --from=builder /app/frontend/package.json ./package.json
COPY --from=builder /app/frontend/public ./public

# 3) Exponer puerto 3000
EXPOSE 3000

# 4) Iniciar el servidor de Next.js en modo producción
CMD ["npm", "start"]
