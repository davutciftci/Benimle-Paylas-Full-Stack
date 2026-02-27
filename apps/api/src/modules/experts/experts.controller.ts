import {
    Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ExpertsService } from './experts.service';
import { ExpertFiltersDto, UpdateExpertDto, CreateExpertDto } from './experts.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

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

    @Get(':id')
    @ApiOperation({ summary: 'Uzman detayı' })
    @ApiResponse({ status: 200, description: 'Uzman bilgileri' })
    @ApiResponse({ status: 404, description: 'Uzman bulunamadı' })
    getById(@Param('id') id: string) {
        return this.expertsService.getById(+id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Yeni uzman profili oluştur' })
    @ApiResponse({ status: 201, description: 'Uzman profili oluşturuldu' })
    create(@Body() dto: CreateExpertDto, @Request() req: { user: { sub: number } }) {
        return this.expertsService.create(dto, req.user.sub);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Uzman profilini güncelle' })
    @ApiResponse({ status: 200, description: 'Güncellenmiş uzman bilgileri' })
    update(@Param('id') id: string, @Body() dto: UpdateExpertDto) {
        return this.expertsService.update(+id, dto);
    }
}
