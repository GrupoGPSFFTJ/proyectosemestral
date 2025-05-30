# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa de builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Variables de entorno (puedes sobreescribirlas al ejecutar)
ENV NODE_ENV=production
ENV PORT=3000

# Puerto expuesto
EXPOSE $PORT

# Comando de inicio
CMD ["node", "dist/server.js"]