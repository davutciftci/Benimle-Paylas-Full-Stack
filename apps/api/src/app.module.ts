import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { ExpertsModule } from './modules/experts';
import { AppointmentsModule } from './modules/appointments';
import { ReviewsModule } from './modules/reviews';
import { BlogModule } from './modules/blog';
import { FaqModule } from './modules/faq';
import { ContactModule } from './modules/contact';
import { EmailModule } from './email/email.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                '../../config/api/.env',
                '.env',
            ],
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
    ],
})
export class AppModule {}
