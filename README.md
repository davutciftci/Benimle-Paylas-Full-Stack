# Benimle Paylaş - Monorepo

Psikolojik danışmanlık platformu. NestJS backend + React/Vite frontend monorepo yapısı.

## Başlangıç

```bash
bun install
bun run db:migrate
bun run db:generate

# Ayrı terminallerde:
bun run dev:api    # Backend: http://localhost:3000
bun run dev:web    # Frontend: http://localhost:5173
```

## Belgeler

- **Proje amacı:** [README-PURPOSE.md](README-PURPOSE.md)
- **Backend-Frontend bağlantısı:** [backend-frontend-readme.md](backend-frontend-readme.md)
- **API Swagger:** `http://localhost:3000/api/docs`
