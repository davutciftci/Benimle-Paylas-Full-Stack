import {
    Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request,
} from '@nestjs/common';
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

    /** Referans listeleri (admin dashboard’da eklenen veriler). Cache yok; expert her zaman güncel listeyi görür. */
    @Get('specialties')
    @ApiOperation({ summary: 'Tüm uzmanlık alanlarını getir (expert dashboard)' })
    async getSpecialties() {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        return prisma.specialty.findMany({ orderBy: { name: 'asc' } });
    }

    @Get('degrees')
    @ApiOperation({ summary: 'Tüm mezuniyet dereceleri / bölüm listesini getir (expert dashboard)' })
    async getDegrees() {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        return prisma.degreeType.findMany({ orderBy: { name: 'asc' } });
    }

    @Get('titles')
    @ApiOperation({ summary: 'Tüm uzman ünvanlarını getir (expert dashboard)' })
    async getTitles() {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        return prisma.title.findMany({ orderBy: { name: 'asc' } });
    }

    @Get('therapeutic-approaches')
    @ApiOperation({ summary: 'Tüm çalışma ekollerini getir (expert dashboard)' })
    async getTherapeuticApproaches() {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        return prisma.therapeuticApproach.findMany({ orderBy: { name: 'asc' } });
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
