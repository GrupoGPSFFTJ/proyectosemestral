FROM node:20-alpine

WORKDIR /app

COPY ../../package*.json ./
COPY ../../nest-cli.json ./
COPY ../../tsconfig*.json ./
COPY ../../libs ./libs
COPY . .

RUN npm ci --legacy-peer-deps

RUN npm run build:gateway

ARG PORT_GATEWAY

ENV PORT_GATEWAY=$PORT_GATEWAY

EXPOSE 3010

CMD ["node", "dist/apps/api-gateway/main.js"]