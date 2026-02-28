import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { GlobalExceptionFilter } from './config/error-handler';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bodyParser: true });

    // JSON body size limit - profil fotoğrafı base64 için
    app.use(require('express').json({ limit: '20mb' }));
    app.use(require('express').urlencoded({ limit: '20mb', extended: true }));

    // CORS
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });

    // Global prefix
    app.setGlobalPrefix('api');

    // Global validation pipe
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

    // Global exception filter
    app.useGlobalFilters(new GlobalExceptionFilter());

    // Swagger
    setupSwagger(app);

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`\n🚀 API sunucusu çalışıyor: http://localhost:${port}/api`);
    console.log(`📚 Swagger UI: http://localhost:${port}/api/docs\n`);
}

bootstrap();
