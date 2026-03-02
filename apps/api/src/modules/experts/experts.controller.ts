import {
    Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request, UseInterceptors
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiSecurity, ApiResponse } from '@nestjs/swagger';
import { ExpertsService } from './experts.service';
import { ExpertFiltersDto, UpdateExpertDto, CreateExpertDto } from './experts.dto';
import { SessionGuard } from '../auth/session.guard';

@ApiTags('experts')
@Controller('experts')
export class ExpertsController {
    constructor(private readonly expertsService: ExpertsService) {}

    @Get()
    @ApiOperation({ summary: 'Uzman listesi (filtre + sayfalama)' })
    @ApiResponse({ status: 200, description: 'Uzman listesi' })
    getAll(@Query() filters: ExpertFiltersDto) {
        return this.expertsService.getAll(filters);
    }

    @Get('specialties')
    @UseInterceptors(CacheInterceptor)
    @CacheKey('specialties_all')
    @CacheTTL(3600000) // 1 Hour
    @ApiOperation({ summary: 'Tüm uzmanlık alanlarını getir' })
    async getSpecialties() {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        return prisma.specialty.findMany();
    }

    @Get('degrees')
    @UseInterceptors(CacheInterceptor)
    @CacheKey('degrees_all')
    @CacheTTL(3600000)
    @ApiOperation({ summary: 'Tüm uzmanlık derecelerini getir' })
    async getDegrees() {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        return prisma.degreeType.findMany();
    }

    @Get('titles')
    @UseInterceptors(CacheInterceptor)
    @CacheKey('titles_all')
    @CacheTTL(3600000)
    @ApiOperation({ summary: 'Tüm uzman ünvanlarını getir' })
    async getTitles() {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        return prisma.title.findMany();
    }

    @Get('therapeutic-approaches')
    @UseInterceptors(CacheInterceptor)
    @CacheKey('approaches_all')
    @CacheTTL(3600000)
    @ApiOperation({ summary: 'Tüm çalışma ekollerini (terapi türlerini) getir' })
    async getTherapeuticApproaches() {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        return prisma.therapeuticApproach.findMany();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Uzman detayı' })
    @ApiResponse({ status: 200, description: 'Uzman bilgileri' })
    @ApiResponse({ status: 404, description: 'Uzman bulunamadı' })
    getById(@Param('id') id: string) {
        return this.expertsService.getById(+id);
    }

    @Post()
    @UseGuards(SessionGuard)
    @ApiSecurity('cookieAuth')
    @ApiOperation({ summary: 'Yeni uzman profili oluştur' })
    @ApiResponse({ status: 201, description: 'Uzman profili oluşturuldu' })
    create(@Body() dto: CreateExpertDto, @Request() req: { user: { id: number } }) {
        return this.expertsService.create(dto, req.user.id);
    }

    @Patch(':id')
    @UseGuards(SessionGuard)
    @ApiSecurity('cookieAuth')
    @ApiOperation({ summary: 'Uzman profilini güncelle' })
    @ApiResponse({ status: 200, description: 'Güncellenmiş uzman bilgileri' })
    update(@Param('id') id: string, @Body() dto: UpdateExpertDto) {
        return this.expertsService.update(+id, dto);
    }
}
