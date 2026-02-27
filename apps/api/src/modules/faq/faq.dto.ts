import { IsString, IsOptional, IsNumber, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateFaqDto {
    @ApiProperty({ description: 'Soru' })
    @IsString()
    @MaxLength(300)
    question: string;

    @ApiProperty({ description: 'Cevap' })
    @IsString()
    answer: string;

    @ApiPropertyOptional({ description: 'Kategori' })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    category?: string;

    @ApiPropertyOptional({ description: 'Sıralama', default: 0 })
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    order?: number;
}
