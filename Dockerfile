# Stage 1: Build Backend (NestJS)
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

COPY backend/package*.json ./
COPY backend/nest-cli.json ./
COPY backend/tsconfig*.json ./
COPY backend/apps ./apps
COPY backend/libs ./libs

RUN npm ci --legacy-peer-deps
RUN npm run build:all

# Stage 2: Build Frontend (Next.js)
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ .

# Build arguments for frontend
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SESSION_DURATION

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SESSION_DURATION=$NEXT_PUBLIC_SESSION_DURATION

RUN npm run build

# Stage 3: Production - Combine both services
FROM node:20-alpine

WORKDIR /app

# Install process manager
RUN npm install -g pm2

# Copy backend files
COPY --from=backend-builder /app/backend/package*.json ./backend/
COPY --from=backend-builder /app/backend/nest-cli.json ./backend/
COPY --from=backend-builder /app/backend/tsconfig*.json ./backend/
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules

# Copy frontend files
COPY --from=frontend-builder /app/frontend/package.json /app/frontend/package-lock.json ./frontend/
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/next.config.ts ./frontend/next.config.ts
COPY --from=frontend-builder /app/frontend/src ./frontend/src

# Install frontend production dependencies
WORKDIR /app/frontend
RUN npm ci --omit=dev

WORKDIR /app

# Backend build arguments and environment variables
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASS
ARG DB_NAME
ARG DB_POOL_MODE
ARG PORT_CORE
ARG PORT_CLINICAL
ARG PORT_NUTRITION
ARG PORT_ODONTO
ARG PORT_PATIENT
ARG PORT_PHARMACY
ARG PORT_VACCINATION
ARG PORT_GATEWAY
ARG SCHEMA_CORE
ARG SCHEMA_CLINICAL
ARG SCHEMA_NUTRITION
ARG SCHEMA_ODONTO
ARG SCHEMA_PATIENT
ARG SCHEMA_PHARMACY
ARG SCHEMA_VACCINATION

ENV DB_HOST=$DB_HOST \
    DB_PORT=$DB_PORT \
    DB_USER=$DB_USER \
    DB_PASS=$DB_PASS \
    DB_NAME=$DB_NAME \
    DB_POOL_MODE=$DB_POOL_MODE \
    PORT_CORE=$PORT_CORE \
    PORT_CLINICAL=$PORT_CLINICAL \
    PORT_NUTRITION=$PORT_NUTRITION \
    PORT_ODONTO=$PORT_ODONTO \
    PORT_PATIENT=$PORT_PATIENT \
    PORT_PHARMACY=$PORT_PHARMACY \
    PORT_VACCINATION=$PORT_VACCINATION \
    PORT_GATEWAY=$PORT_GATEWAY \
    SCHEMA_CORE=$SCHEMA_CORE \
    SCHEMA_CLINICAL=$SCHEMA_CLINICAL \
    SCHEMA_NUTRITION=$SCHEMA_NUTRITION \
    SCHEMA_ODONTO=$SCHEMA_ODONTO \
    SCHEMA_PATIENT=$SCHEMA_PATIENT \
    SCHEMA_PHARMACY=$SCHEMA_PHARMACY \
    SCHEMA_VACCINATION=$SCHEMA_VACCINATION

# Create PM2 ecosystem file
RUN echo '{ \
  "apps": [ \
    { \
      "name": "backend", \
      "script": "npm", \
      "args": "run start:all", \
      "cwd": "/app/backend", \
      "env": { \
        "NODE_ENV": "production" \
      } \
    }, \
    { \
      "name": "frontend", \
      "script": "npm", \
      "args": "start", \
      "cwd": "/app/frontend", \
      "env": { \
        "NODE_ENV": "production" \
      } \
    } \
  ] \
}' > ecosystem.config.json

# Expose both ports
EXPOSE 3000 3010

# Start both services with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.json"]