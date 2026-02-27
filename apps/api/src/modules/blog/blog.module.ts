import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { AuthModule } from '../auth';

@Module({
    imports: [AuthModule],
    controllers: [BlogController],
    providers: [BlogService],
})
export class BlogModule {}
