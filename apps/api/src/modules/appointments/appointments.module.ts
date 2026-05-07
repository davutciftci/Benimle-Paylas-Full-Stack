import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { AuthModule } from '../auth';
import { EmailModule } from '../../email/email.module';

@Module({
    imports: [AuthModule, EmailModule],
    controllers: [AppointmentsController],
    providers: [AppointmentsService],
})
export class AppointmentsModule {}
