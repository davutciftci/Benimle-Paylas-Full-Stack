import { IsString, IsOptional, IsEnum, IsDateString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
    @ApiProperty({ description: 'Uzman ID' })
    @IsNumber()
    expertId: number;

    @ApiProperty({ example: '2024-12-15', description: 'Randevu tarihi (YYYY-MM-DD)' })
    @IsDateString()
    date: string;



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
