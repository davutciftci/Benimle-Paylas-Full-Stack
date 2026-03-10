import { Module } from '@nestjs/common';
import { SignLanguageController } from './sign-language.controller';
import { SignLanguageService } from './sign-language.service';
import { AuthModule } from '../auth';

@Module({
    imports: [AuthModule],
    controllers: [SignLanguageController],
    providers: [SignLanguageService],
})
export class SignLanguageModule {}