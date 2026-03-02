import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity, ApiQuery } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './blog.dto';
import { SessionGuard } from '../auth/session.guard';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get()
    @ApiOperation({ summary: 'Blog yazıları listesi' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'pageSize', required: false, type: Number })
    getAll(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
        return this.blogService.getAll(Number(page) || 1, Number(pageSize) || 10);
    }

    @Get('id/:id')
    @ApiOperation({ summary: 'Blog yazısı detayı (ID ile)' })
    getById(@Param('id') id: string) {
        return this.blogService.getById(Number(id));
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Blog yazısı detayı (slug ile)' })
    getBySlug(@Param('slug') slug: string) {
        return this.blogService.getBySlug(slug);
    }

    @Post()
    @UseGuards(SessionGuard)
    @ApiSecurity('cookieAuth')
    @ApiOperation({ summary: 'Yeni blog yazısı oluştur (admin)' })
    create(@Body() dto: CreateBlogPostDto, @Request() req: { user: { id: string; email: string } }) {
        return this.blogService.create(dto, req.user.email);
    }
}
