import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { SignLanguageService } from './sign-language.service';
import { CreateSignLanguageWordDto } from './sign-language.dto';
import { SessionGuard } from '../auth/session.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('sign-language')
@Controller('sign-language')
export class SignLanguageController {
    constructor(private readonly signLanguageService: SignLanguageService) {}

    @Get()
    @ApiOperation({ summary: 'Tüm işaret dili kelimelerini getir' })
    getAll() {
        return this.signLanguageService.getAll();
    }

    @Get(':word')
    @ApiOperation({ summary: 'Kelimeye göre işaret dili videosu getir' })
    findByWord(@Param('word') word: string) {
        return this.signLanguageService.findByWord(word);
    }

    @Post()
    @Roles('admin')
    @UseGuards(SessionGuard, RolesGuard)
    @ApiSecurity('cookieAuth')
    @ApiOperation({ summary: 'Yeni kelime ekle (admin)' })
    create(@Body() dto: CreateSignLanguageWordDto) {
        return this.signLanguageService.create(dto);
    }

    @Delete(':id')
    @Roles('admin')
    @UseGuards(SessionGuard, RolesGuard)
    @ApiSecurity('cookieAuth')
    @ApiOperation({ summary: 'Kelime sil (admin)' })
    delete(@Param('id') id: string) {
        return this.signLanguageService.delete(+id);
    }
}