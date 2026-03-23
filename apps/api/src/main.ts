import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { GlobalExceptionFilter } from './config/error-handler';
import { createClient } from 'redis';
const session = require('express-session');
const { RedisStore } = require('connect-redis');

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: true });

    // Nginx/proxy arkasında doğru host ve scheme için
    app.set('trust proxy', 1);


    app.use(require('express').json({ limit: '20mb' }));
    app.use(require('express').urlencoded({ limit: '20mb', extended: true }));


    const corsOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
        : ['http://localhost:5173', 'http://127.0.0.1:5173'];
    app.enableCors({
<<<<<<< Updated upstream
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
=======
        origin: corsOrigins,
>>>>>>> Stashed changes
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cookie'],
    });

    const redisClient = createClient({
        socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
        }
    });
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
    app.use(
        session({
            store: new RedisStore({ client: redisClient, prefix: 'sess:', disableTouch: true }),
            name: 'connect.sid',
            secret: process.env.SESSION_SECRET || 'super-secret-key-benimle-paylas',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
<<<<<<< Updated upstream
                // secure=true sadece HTTPS'te çalışır - localhost HTTP kullandığında cookie gönderilmez
                secure: process.env.COOKIE_SECURE === 'true',
=======
                // Secure=true sadece HTTPS ile; Docker/local HTTP'de false olmalı
                secure: process.env.USE_HTTPS === 'true',
>>>>>>> Stashed changes
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            },
        }),
    );

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        })
    );

    app.useGlobalFilters(new GlobalExceptionFilter());

    setupSwagger(app);

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`\n🚀 API sunucusu çalışıyor: http://localhost:${port}/api`);
    console.log(`📚 Swagger UI: http://localhost:${port}/api/docs\n`);
}

bootstrap();
