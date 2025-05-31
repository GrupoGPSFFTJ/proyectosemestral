# ─────────────────────────────────────────────────────────────
# ETAPA 1: instalar dependencias y compilar (Build Stage)
# ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

# 1) Declarar build‐args para la URL y la Key de Supabase
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# 2) Pasar esos valores a variables de entorno (serán visibles durante build y runtime)
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3) Definir el directorio de trabajo dentro del contenedor
WORKDIR /app/frontend

# 4) Copiar solo package.json y package-lock.json para aprovechar caché de Docker
COPY frontend/package.json frontend/package-lock.json* ./

# 5) Instalar dependencias de Node.js
RUN npm install

# 6) Copiar el resto del código fuente de tu aplicación Next.js
COPY frontend/ .

# 7) Ejecutar la build de Next.js (generará la carpeta .next)
RUN npm run build

# ─────────────────────────────────────────────────────────────
# ETAPA 2: preparar imagen de producción (Production Stage)
# ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS runner

# 1) Definir el mismo WORKDIR (no hace falta reinstalar dependencias)
WORKDIR /app/frontend

# 2) Copiar únicamente la carpeta .next y node_modules de la etapa anterior,
#    así como el package.json (necesario para npm start o next start)
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/node_modules ./node_modules
COPY --from=builder /app/frontend/package.json ./package.json

# 3) También copia cualquier otro recurso estático (por ejemplo public/)
COPY --from=builder /app/frontend/public ./public

# 4) Exponer el puerto que utiliza Next.js (por defecto 3000)
EXPOSE 3000

# 5) Comando por defecto para arrancar el servidor de producción de Next.js
CMD ["npm", "start"]
