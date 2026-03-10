import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionGuard } from './session.guard';
import { RolesGuard } from './roles.guard';
import { EmailModule } from '../../email/email.module';

@Module({
    imports: [
        EmailModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, SessionGuard, RolesGuard],
    exports: [SessionGuard, RolesGuard],
})
export class AuthModule {}
