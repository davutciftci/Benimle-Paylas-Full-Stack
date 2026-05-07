import { IsString, IsOptional, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
    @ApiProperty({ description: 'Uzman ID' })
    @IsNumber()
    expertId: number;

    @ApiProperty({ example: '2026-05-08T14:00:00.000Z', description: 'Randevu başlangıç tarihi/saati (ISO 8601)' })
    @IsDateString()
    date: string;

    @ApiPropertyOptional({ description: 'Notlar' })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiPropertyOptional({ enum: ['online', 'in-person'], default: 'online' })
    @IsEnum(['online', 'in-person'])
    @IsOptional()
    sessionType?: 'online' | 'in-person';
}

export class UpdateAppointmentStatusDto {
    @ApiProperty({ enum: ['pending', 'confirmed', 'cancelled', 'completed'] })
    @IsEnum(['pending', 'confirmed', 'cancelled', 'completed'])
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}
