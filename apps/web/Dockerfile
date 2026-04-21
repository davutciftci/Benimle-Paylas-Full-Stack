# Web - Vite/React
# Debian tabanlı imaj: bun + Alpine'da bazı registry tarball'ları çıkarılamıyor (react-icons vb.)
FROM oven/bun:1 AS builder

WORKDIR /app

# Tüm workspace'ler (bun install için gerekli)
COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY database/package.json ./database/

RUN bun install

# Build (API URL build-time: browser localhost'tan erişecek)
COPY apps/web/ ./apps/web/
COPY tsconfig.base.json ./
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

RUN cd apps/web && bun run build

# Production - nginx ile static serve
FROM nginx:alpine

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
