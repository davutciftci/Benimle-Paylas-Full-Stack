import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Benimle Paylaş API')
        .setDescription(
            'Benimle Paylaş psikoloji danışmanlık platformu REST API dokümantasyonu.\n\n' +
            '**Kimlik doğrulama:** Bearer JWT token kullanılmaktadır.\n' +
            'Giriş yaptıktan sonra `/auth/login` endpoint\'inden aldığınız token\'ı Authorize butonuyla ekleyin.'
        )
        .setVersion('1.0.0')
        .setContact('Benimle Paylaş', 'https://benimlepaylas.com', 'info@benimlepaylas.com')
        .setLicense('Proprietary', '')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'Authorization',
                description: 'JWT token girin',
                in: 'header',
            },
            'access-token'
        )
        .addTag('auth', 'Kimlik doğrulama işlemleri')
        .addTag('users', 'Kullanıcı işlemleri')
        .addTag('experts', 'Uzman/psikolog işlemleri')
        .addTag('appointments', 'Randevu işlemleri')
        .addTag('reviews', 'Değerlendirme işlemleri')
        .addTag('blog', 'Blog yazıları')
        .addTag('faq', 'Sıkça sorulan sorular')
        .addTag('contact', 'İletişim mesajları')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
        customSiteTitle: 'Benimle Paylaş API Docs',
        customCss: `
            .swagger-ui .topbar { background-color: #2563eb; }
            .swagger-ui .topbar-wrapper .link span { color: white; }
        `,
    });
}
