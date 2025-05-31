# ─────────────────────────────────────────────────────────────
# ETAPA 1: BUILDER (instalar dependencias y compilar la app)
# ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

# Declarar build‐args para Supabase
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Pasar los build‐args a ENV para que Next.js los lea durante el build
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# Definir el directorio de trabajo
WORKDIR /app/frontend

# Copiar package.json y lock file para aprovechar la cache de Docker
COPY frontend/package.json frontend/package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el resto de archivos fuente
COPY frontend/ .

# Ejecutar la compilación de Next.js
RUN npm run build

# ─────────────────────────────────────────────────────────────
# ETAPA 2: RUNNER (solo archivos de producción)
# ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS runner

# Directorio de trabajo en la etapa de producción
WORKDIR /app/frontend

# Copiar solo lo necesario desde la etapa "builder"
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/node_modules ./node_modules
COPY --from=builder /app/frontend/package.json ./package.json
COPY --from=builder /app/frontend/public ./public

# Exponer puerto 3000 para que Next.js lo sirva
EXPOSE 3000

# Comando por defecto para iniciar Next.js en modo producción
CMD ["npm", "start"]
