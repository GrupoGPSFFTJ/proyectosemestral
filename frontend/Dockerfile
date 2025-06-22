# Usa una imagen oficial de Node.js como base
FROM node:20-alpine AS builder

WORKDIR /app

# Copia los archivos necesarios
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Recibe los secrets como argumentos de build
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SESSION_DURATION

# Los expone como variables de entorno en el contenedor
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SESSION_DURATION=$NEXT_PUBLIC_SESSION_DURATION

# Construye la aplicación Next.js
RUN npm run build

# Imagen final para producción
FROM node:20-alpine

WORKDIR /app

# Copia solo los archivos necesarios desde el builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/src ./src

# Instala dependencias de producción
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["npm", "start"]