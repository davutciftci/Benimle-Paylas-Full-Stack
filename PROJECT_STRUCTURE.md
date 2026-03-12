# Proje Yapısı

## Branch Stratejisi (Git Flow)

| Branch | Amaç |
|--------|------|
| `main` | Production – sadece stabil, deploy edilmiş kod |
| `develop` | Günlük geliştirme, entegrasyon |

**Akış:**
```
feature/xyz  ──┐
fix/abc      ──┼──► develop ──► main (release hazır olduğunda)
hotfix/xyz   ──┘
```

- Günlük commit'ler → `develop`
- Release / deploy öncesi → `develop` → `main` (PR ile)
- CI/CD: `develop` (test/build), `main` (deploy)

---

## Dizin Yapısı

```
benimle-paylas-full-stack/
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # Vite/React frontend (src/ tek kaynak)
├── config/
│   ├── api/          # API ortam değişkenleri (.env)
│   └── web/          # Web ortam değişkenleri (.env)
├── database/         # Prisma schema, migrations
│   └── prisma/
├── package.json      # Monorepo root
└── docker-compose.yml
```

## Ortam Değişkenleri

- **API:** `config/api/.env` (Docker: env_file, local: app.module)
- **Web:** `config/web/.env` (Vite envDir)
- **Database:** `database/prisma/.env` (Prisma migrate)

## node_modules

- **Kök node_modules:** Gerekli (bun/npm workspace hoisting)
- **apps/*/node_modules:** Workspace bazlı bağımlılıklar

## Veritabanı

Postgres verisi `postgres_data` volume'da kalıcıdır. Container yeniden başlasa bile veriler korunur.
