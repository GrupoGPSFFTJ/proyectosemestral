FROM node:20-alpine

WORKDIR /app

COPY ../../package*.json ./
COPY ../../nest-cli.json ./
COPY ../../tsconfig*.json ./
COPY ../../libs ./libs
COPY . .

RUN npm ci --legacy-peer-deps

RUN npm run build:nutrition-service

ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASS
ARG DB_NAME
ARG DB_POOL_MODE

ARG PORT_NUTRITION
ARG SCHEMA_NUTRITION

ENV DB_HOST=$DB_HOST \
    DB_PORT=$DB_PORT \
    DB_USER=$DB_USER \
    DB_PASS=$DB_PASS \
    DB_NAME=$DB_NAME \
    DB_POOL_MODE=$DB_POOL_MODE \
    PORT_NUTRITION=$PORT_NUTRITION \
    SCHEMA_NUTRITION=$SCHEMA_NUTRITION

EXPOSE 3003

CMD ["node", "dist/apps/nutrition-service/main.js"]