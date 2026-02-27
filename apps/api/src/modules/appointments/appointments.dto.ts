import { IsString, IsOptional, IsEnum, IsDateString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
    @ApiProperty({ description: 'Uzman ID' })
    @IsString()
    expertId: string;

    @ApiProperty({ example: '2024-12-15', description: 'Randevu tarihi (YYYY-MM-DD)' })
    @IsDateString()
    date: string;

    @ApiProperty({ example: '10:00', description: 'Başlangıç saati (HH:mm)' })
    @IsString()
    startTime: string;

    @ApiProperty({ example: '11:00', description: 'Bitiş saati (HH:mm)' })
    @IsString()
    endTime: string;

    @ApiProperty({ enum: ['online', 'in-person'], description: 'Seans tipi' })
    @IsEnum(['online', 'in-person'])
    sessionType: 'online' | 'in-person';

    @ApiPropertyOptional({ description: 'Notlar' })
    @IsString()
    @IsOptional()
    notes?: string;
}

export class UpdateAppointmentStatusDto {
    @ApiProperty({ enum: ['pending', 'confirmed', 'cancelled', 'completed'] })
    @IsEnum(['pending', 'confirmed', 'cancelled', 'completed'])
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}
