import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { GlobalExceptionFilter } from './config/error-handler';
import { Redis } from 'ioredis';
const session = require('express-session');
const { RedisStore } = require('connect-redis');

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bodyParser: true });


    app.use(require('express').json({ limit: '20mb' }));
    app.use(require('express').urlencoded({ limit: '20mb', extended: true }));


    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cookie'],
    });

    const redisClient = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
    });
    app.use(
        session({
            store: new RedisStore({ client: redisClient, prefix: 'sess:' }),
            name: 'connect.sid',
            secret: process.env.SESSION_SECRET || 'super-secret-key-benimle-paylas',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
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
