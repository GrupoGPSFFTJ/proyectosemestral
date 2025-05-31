#!/usr/bin/env sh
# start.sh

# 1) Arrancamos el backend (suponiendo que el entrypoint sea server.js o index.js)
cd /app/backend
# Ajusta aquí “server.js” si tu backend tiene otro archivo principal
node server.js &

# 2) Arrancamos el frontend (Next.js) en producción. 
#    En la imagen final, los archivos compilados de Next están directamente en /app
cd /app
npm run start

# 3) “wait” para que el contenedor no se detenga mientras el frontend esté corriendo
wait
