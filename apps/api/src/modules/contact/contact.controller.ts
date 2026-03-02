import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './contact.dto';
import { SessionGuard } from '../auth/session.guard';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'İletişim mesajı gönder' })
    create(@Body() dto: CreateContactDto) {
        return this.contactService.create(dto);
    }

    @Get()
    @UseGuards(SessionGuard)
    @ApiSecurity('cookieAuth')
    @ApiOperation({ summary: 'Tüm mesajları listele (admin)' })
    getAll() {
        return this.contactService.getAll();
    }
}
