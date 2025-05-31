#!/bin/sh
# Inicia backend y frontend en paralelo
cd /app/backend && npm run start &
cd /app/frontend && npm run start
