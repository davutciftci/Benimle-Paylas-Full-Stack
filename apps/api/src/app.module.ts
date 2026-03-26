import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { ExpertsModule } from './modules/experts';
import { AppointmentsModule } from './modules/appointments';
import { ReviewsModule } from './modules/reviews';
import { BlogModule } from './modules/blog';
import { FaqModule } from './modules/faq';
import { ContactModule } from './modules/contact';
import { EmailModule } from './email/email.module';
import { SignLanguageModule } from './modules/sign-language';
import { ReferenceModule } from './modules/reference';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                '../../config/api/.env',
                '.env',
            ],
        }),
        SignLanguageModule,
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: async () => ({
                store: await redisStore({
                    socket: {
                        host: process.env.REDIS_HOST || 'localhost',
                        port: parseInt(process.env.REDIS_PORT || '6379', 10),
                    },
                }),
            }),
        }),
        EmailModule,
        AuthModule,
        UsersModule,
        ExpertsModule,
        AppointmentsModule,
        ReviewsModule,
        BlogModule,
        FaqModule,
        ContactModule,
        ReferenceModule,
    ],
})
export class AppModule {}
