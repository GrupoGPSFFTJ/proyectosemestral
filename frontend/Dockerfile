# Dockerfile para el frontend Angular

# Etapa 1: Construcción de la aplicación
FROM node:20-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production=false

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos construidos desde la etapa de build
COPY --from=build /app/dist/frontend_angular/browser /usr/share/nginx/html

# Exponer el puerto 4200
EXPOSE 4200

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
