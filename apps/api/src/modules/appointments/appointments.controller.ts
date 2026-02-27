import {
    Controller, Get, Post, Patch, Param, Body, UseGuards, Request
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from './appointments.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('appointments')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Post()
    @ApiOperation({ summary: 'Yeni randevu oluştur' })
    @ApiResponse({ status: 201, description: 'Randevu oluşturuldu' })
    create(@Body() dto: CreateAppointmentDto, @Request() req: { user: { sub: number } }) {
        return this.appointmentsService.create(dto, req.user.sub);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Kullanıcının randevuları' })
    getForUser(@Param('userId') userId: string) {
        return this.appointmentsService.getForUser(+userId);
    }

    @Get('expert/:expertId')
    @ApiOperation({ summary: 'Uzmanın randevuları' })
    getForExpert(@Param('expertId') expertId: string) {
        return this.appointmentsService.getForExpert(+expertId);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Randevu durumu güncelle' })
    updateStatus(@Param('id') id: string, @Body() dto: UpdateAppointmentStatusDto) {
        return this.appointmentsService.updateStatus(+id, dto);
    }
}
