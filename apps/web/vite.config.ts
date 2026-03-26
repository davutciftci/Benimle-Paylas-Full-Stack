import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    envDir: path.resolve(__dirname, '../../config/web'),
    server: {
        port: 5173,
        strictPort: true, // 5174'e düşmesin, 5173 meşgulse hata versin
        host: true, // 0.0.0.0 - ağdan ve localhost'tan erişim
        proxy: {
            '/api': {
                target: process.env.VITE_API_URL || 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                configure: (proxy) => {
                    // Session cookie'lerin proxy üzerinden düzgün çalışması için
                    proxy.on('proxyRes', (proxyRes) => {
                        const setCookie = proxyRes.headers['set-cookie'];
                        if (setCookie) {
                            proxyRes.headers['set-cookie'] = setCookie.map((cookie) =>
                                cookie
                                    .replace(/;\s*Domain=[^;]*/gi, '; Domain=localhost')
                                    .replace(/;\s*Secure/gi, '')
                            );
                        }
                    });
                },
            },
        },
    },
}));
