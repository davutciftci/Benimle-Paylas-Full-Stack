import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { SessionGuard } from '../auth/session.guard';
import { CreateDegreeDto, CreateReferenceNameDto } from './reference.dto';
import { ReferenceService } from './reference.service';

@ApiTags('admin/reference')
@ApiSecurity('cookieAuth')
@Controller('admin/reference')
export class ReferenceController {
    constructor(private readonly referenceService: ReferenceService) {}

    @Get('specialties')
    @ApiOperation({ summary: 'Uzmanlık alanlarını getir' })
    getSpecialties() {
        return this.referenceService.getSpecialties();
    }

    @Post('specialties')
    @Roles('admin')
    @UseGuards(SessionGuard, RolesGuard)
    @HttpCode(201)
    @ApiOperation({ summary: 'Uzmanlık alanı ekle (admin)' })
    createSpecialty(@Body() dto: CreateReferenceNameDto) {
        return this.referenceService.createSpecialty(dto);
    }

    @Delete('specialties/:id')
    @Roles('admin')
    @UseGuards(SessionGuard, RolesGuard)
    @HttpCode(204)
    @ApiOperation({ summary: 'Uzmanlık alanı sil (admin)' })
    deleteSpecialty(@Param('id') id: string) {
        return this.referenceService.deleteSpecialty(+id);
    }

    @Get('degrees')
    @ApiOperation({ summary: 'Derece/bölümleri getir' })
    getDegrees() {
        return this.referenceService.getDegrees();
    }

    @Post('degrees')
    @Roles('admin')
    @UseGuards(SessionGuard, RolesGuard)
    @HttpCode(201)
    @ApiOperation({ summary: 'Derece/bölüm ekle (admin)' })
    createDegree(@Body() dto: CreateDegreeDto) {
        return this.referenceService.createDegree(dto);
    }

    @Delete('degrees/:id')
    @Roles('admin')
    @UseGuards(SessionGuard, RolesGuard)
    @HttpCode(204)
    @ApiOperation({ summary: 'Derece/bölüm sil (admin)' })
    deleteDegree(@Param('id') id: string) {
        return this.referenceService.deleteDegree(+id);
    }

    @Get('titles')
    @ApiOperation({ summary: 'Uzman ünvanlarını getir' })
    getTitles() {
        return this.referenceService.getTitles();
    }

    @Post('titles')
    @Roles('admin')
    @UseGuards(SessionGuard, RolesGuard)
    @HttpCode(201)
    @ApiOperation({ summary: 'Uzman ünvanı ekle (admin)' })
    createTitle(@Body() dto: CreateReferenceNameDto) {
        return this.referenceService.createTitle(dto);
    }

    @Delete('titles/:id')
    @Roles('admin')
    @UseGuards(SessionGuard, RolesGuard)
    @HttpCode(204)
    @ApiOperation({ summary: 'Uzman ünvanı sil (admin)' })
    deleteTitle(@Param('id') id: string) {
        return this.referenceService.deleteTitle(+id);
    }

    @Get('therapeutic-approaches')
    @ApiOperation({ summary: 'Çalışma ekollerini getir' })
    getTherapeuticApproaches() {
        return this.referenceService.getTherapeuticApproaches();
    }

    @Post('therapeutic-approaches')
    @Roles('admin')
    @UseGuards(SessionGuard, RolesGuard)
    @HttpCode(201)
    @ApiOperation({ summary: 'Çalışma ekolü ekle (admin)' })
    createTherapeuticApproach(@Body() dto: CreateReferenceNameDto) {
        return this.referenceService.createTherapeuticApproach(dto);
    }

    @Delete('therapeutic-approaches/:id')
    @Roles('admin')
    @UseGuards(SessionGuard, RolesGuard)
    @HttpCode(204)
    @ApiOperation({ summary: 'Çalışma ekolü sil (admin)' })
    deleteTherapeuticApproach(@Param('id') id: string) {
        return this.referenceService.deleteTherapeuticApproach(+id);
    }
}

