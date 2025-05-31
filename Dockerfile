# Use official Node.js image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend ./backend

# Copy frontend files
COPY frontend ./frontend

# Install dependencies for backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
RUN npm install

# Install dependencies for frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install && npm run build

# Volver al directorio raíz
WORKDIR /app

# Copiar script de inicio
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Exponer puertos (ajusta si tu backend usa otro puerto)
EXPOSE 3000 4000

# Comando para iniciar ambos servicios
CMD ["./start.sh"]
