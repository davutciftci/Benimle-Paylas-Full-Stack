import {
    Controller, Get, Post, Delete, Body, Param, UseGuards, ConflictException, NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { SessionGuard } from '../auth/session.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
    CreateSpecialtyDto,
    CreateDegreeDto,
    CreateTitleDto,
    CreateTherapeuticApproachDto,
} from './reference.dto';

const prisma = new PrismaClient();

@ApiTags('admin/reference')
@ApiSecurity('cookieAuth')
@Controller('admin/reference')
@UseGuards(SessionGuard, RolesGuard)
@Roles('admin')
export class ReferenceController {
    @Get('specialties')
    @ApiOperation({ summary: 'Uzmanlık alanları listesi' })
    getSpecialties() {
        return prisma.specialty.findMany({ orderBy: { name: 'asc' } });
    }

    @Post('specialties')
    @ApiOperation({ summary: 'Yeni uzmanlık alanı ekle' })
    @ApiResponse({ status: 201, description: 'Oluşturuldu' })
    @ApiResponse({ status: 409, description: 'Bu isim zaten var' })
    async createSpecialty(@Body() dto: CreateSpecialtyDto) {
        const existing = await prisma.specialty.findFirst({ where: { name: { equals: dto.name, mode: 'insensitive' } } });
        if (existing) throw new ConflictException('Bu uzmanlık alanı zaten kayıtlı');
        return prisma.specialty.create({ data: { name: dto.name.trim() } });
    }

    @Delete('specialties/:id')
    @ApiOperation({ summary: 'Uzmanlık alanını sil' })
    @ApiResponse({ status: 200, description: 'Silindi' })
    async deleteSpecialty(@Param('id') id: string) {
        const num = parseInt(id, 10);
        if (Number.isNaN(num)) throw new NotFoundException('Geçersiz ID');
        await prisma.specialty.delete({ where: { id: num } }).catch(() => {
            throw new NotFoundException('Uzmanlık alanı bulunamadı veya kullanımda');
        });
        return { success: true };
    }

    @Get('degrees')
    @ApiOperation({ summary: 'Mezuniyet dereceleri / bölüm listesi' })
    getDegrees() {
        return prisma.degreeType.findMany({ orderBy: { name: 'asc' } });
    }

    @Post('degrees')
    @ApiOperation({ summary: 'Yeni mezuniyet derecesi / bölüm ekle' })
    @ApiResponse({ status: 201, description: 'Oluşturuldu' })
    async createDegree(@Body() dto: CreateDegreeDto) {
        const existing = await prisma.degreeType.findFirst({ where: { name: { equals: dto.name, mode: 'insensitive' } } });
        if (existing) throw new ConflictException('Bu derece zaten kayıtlı');
        return prisma.degreeType.create({ data: { name: dto.name.trim(), description: dto.description?.trim() || null } });
    }

    @Delete('degrees/:id')
    @ApiOperation({ summary: 'Mezuniyet derecesini sil' })
    async deleteDegree(@Param('id') id: string) {
        const num = parseInt(id, 10);
        if (Number.isNaN(num)) throw new NotFoundException('Geçersiz ID');
        await prisma.degreeType.delete({ where: { id: num } }).catch(() => {
            throw new NotFoundException('Derece bulunamadı veya kullanımda');
        });
        return { success: true };
    }

    @Get('titles')
    @ApiOperation({ summary: 'Uzman ünvanları listesi' })
    getTitles() {
        return prisma.title.findMany({ orderBy: { name: 'asc' } });
    }

    @Post('titles')
    @ApiOperation({ summary: 'Yeni uzman ünvanı ekle' })
    @ApiResponse({ status: 201, description: 'Oluşturuldu' })
    async createTitle(@Body() dto: CreateTitleDto) {
        const existing = await prisma.title.findFirst({ where: { name: { equals: dto.name, mode: 'insensitive' } } });
        if (existing) throw new ConflictException('Bu ünvan zaten kayıtlı');
        return prisma.title.create({ data: { name: dto.name.trim() } });
    }

    @Delete('titles/:id')
    @ApiOperation({ summary: 'Uzman ünvanını sil' })
    async deleteTitle(@Param('id') id: string) {
        const num = parseInt(id, 10);
        if (Number.isNaN(num)) throw new NotFoundException('Geçersiz ID');
        await prisma.title.delete({ where: { id: num } }).catch(() => {
            throw new NotFoundException('Ünvan bulunamadı veya kullanımda');
        });
        return { success: true };
    }

    @Get('therapeutic-approaches')
    @ApiOperation({ summary: 'Çalışma ekolleri listesi' })
    getTherapeuticApproaches() {
        return prisma.therapeuticApproach.findMany({ orderBy: { name: 'asc' } });
    }

    @Post('therapeutic-approaches')
    @ApiOperation({ summary: 'Yeni çalışma ekolü ekle' })
    @ApiResponse({ status: 201, description: 'Oluşturuldu' })
    async createTherapeuticApproach(@Body() dto: CreateTherapeuticApproachDto) {
        const existing = await prisma.therapeuticApproach.findFirst({ where: { name: { equals: dto.name, mode: 'insensitive' } } });
        if (existing) throw new ConflictException('Bu ekol zaten kayıtlı');
        return prisma.therapeuticApproach.create({ data: { name: dto.name.trim() } });
    }

    @Delete('therapeutic-approaches/:id')
    @ApiOperation({ summary: 'Çalışma ekolünü sil' })
    async deleteTherapeuticApproach(@Param('id') id: string) {
        const num = parseInt(id, 10);
        if (Number.isNaN(num)) throw new NotFoundException('Geçersiz ID');
        await prisma.therapeuticApproach.delete({ where: { id: num } }).catch(() => {
            throw new NotFoundException('Ekol bulunamadı veya kullanımda');
        });
        return { success: true };
    }
}
