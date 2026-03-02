import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './faq.dto';
import { SessionGuard } from '../auth/session.guard';

@ApiTags('faq')
@Controller('faq')
export class FaqController {
    constructor(private readonly faqService: FaqService) {}

    @Get()
    @ApiOperation({ summary: 'Sıkça sorulan sorular listesi' })
    getAll() {
        return this.faqService.getAll();
    }

    @Post()
    @UseGuards(SessionGuard)
    @ApiSecurity('cookieAuth')
    @ApiOperation({ summary: 'SSS ekle (admin)' })
    create(@Body() dto: CreateFaqDto) {
        return this.faqService.create(dto);
    }

    @Delete(':id')
    @UseGuards(SessionGuard)
    @ApiSecurity('cookieAuth')
    @ApiOperation({ summary: 'SSS sil (admin)' })
    delete(@Param('id') id: string) {
        return this.faqService.delete(+id);
    }
}
