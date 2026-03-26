import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { ReferenceController } from './reference.controller';
import { ReferenceService } from './reference.service';

@Module({
    imports: [AuthModule],
    controllers: [ReferenceController],
    providers: [ReferenceService],
})
export class ReferenceModule {}

