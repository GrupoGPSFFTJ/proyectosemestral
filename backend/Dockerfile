FROM node:18-bullseye

WORKDIR /app

# Instala dependencias de compilación
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

# Primero copia solo package.json para cachear las dependencias
COPY package*.json ./

# Instala bcrypt compilándolo desde fuente
RUN npm install bcrypt --build-from-source && \
    npm install

COPY . .

RUN npm run build || echo "No build step"

EXPOSE 3000

CMD ["npm", "run", "start"]