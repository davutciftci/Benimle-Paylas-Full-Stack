# API - NestJS + Prisma (Monorepo)
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Tüm proje (.dockerignore node_modules, dist, .git hariç)
COPY . .

# Dependencies - tam proje ile lockfile uyumlu
RUN bun install

# Prisma generate
RUN cd database && bunx prisma generate

# Build
RUN cd apps/api && bun run build

# Production image - builder'dan node_modules kopyala (lockfile sorunundan kaçın)
FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY database/ ./database/

# Builder'dan node_modules ve dist (workspace hoisting - root yeterli)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["sh", "-c", "cd /app/database && bunx prisma migrate deploy; bun /app/apps/api/dist/main.js"]
