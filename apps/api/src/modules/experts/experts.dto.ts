import {
    IsString,
    IsOptional,
    IsArray,
    IsNumber,
    IsEnum,
    Min,
    Max,
    MaxLength,
} from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ExpertFiltersDto {
    @ApiPropertyOptional({ description: 'Ad veya uzmanlık alanı aramak için' })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ description: 'Virgülle ayrılmış uzmanlık alanları' })
    @IsString()
    @IsOptional()
    specialty?: string;

    @ApiPropertyOptional({ description: 'Virgülle ayrılmış sigorta şirketleri' })
    @IsString()
    @IsOptional()
    insurance?: string;

    @ApiPropertyOptional({ description: 'Minimum ücret' })
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    minPrice?: number;

    @ApiPropertyOptional({ description: 'Maksimum ücret' })
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    maxPrice?: number;

    @ApiPropertyOptional({ enum: ['online', 'in-person'], description: 'Seans tipi' })
    @IsEnum(['online', 'in-person'])
    @IsOptional()
    sessionType?: 'online' | 'in-person';

    @ApiPropertyOptional({ description: 'Minimum puan filtresi (1-5)' })
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(5)
    @Type(() => Number)
    rating?: number;

    @ApiPropertyOptional({ description: 'Sayfa numarası', default: 1 })
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    page?: number;

    @ApiPropertyOptional({ description: 'Sayfa başına kayıt', default: 10 })
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(50)
    @Type(() => Number)
    pageSize?: number;
}

export class UpdateExpertDto {
    @ApiPropertyOptional({ description: 'Kısa açıklama' })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @ApiPropertyOptional({ description: 'Tam açıklama' })
    @IsString()
    @IsOptional()
    fullDescription?: string;

    @ApiPropertyOptional({ description: 'Uzmanlık alanları', type: [String] })
    @IsArray()
    @IsOptional()
    specialty?: string[];

    @ApiPropertyOptional({ enum: ['online', 'in-person'], isArray: true })
    @IsArray()
    @IsOptional()
    sessionTypes?: ('online' | 'in-person')[];

    @ApiPropertyOptional({ description: 'Desteklenen diller', type: [String] })
    @IsArray()
    @IsOptional()
    languages?: string[];

    @ApiPropertyOptional({ description: 'Desteklenen sigorta şirketleri', type: [String] })
    @IsArray()
    @IsOptional()
    insurance?: string[];

    @ApiPropertyOptional({ description: 'Minimum ücret' })
    @IsNumber()
    @IsOptional()
    priceMin?: number;

    @ApiPropertyOptional({ description: 'Maksimum ücret' })
    @IsNumber()
    @IsOptional()
    priceMax?: number;
}

export class CreateExpertDto {
    @ApiProperty({ example: 'Dr. Ayşe Demir' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Klinik Psikolog' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Travma, anksiyete ...' })
    @IsString()
    description: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    fullDescription?: string;

    @ApiProperty({ type: [String], example: ['Travma Terapisi', 'BDT'] })
    @IsArray()
    specialty: string[];

    @ApiProperty({ example: '10+ Yıl' })
    @IsString()
    experience: string;

    @ApiProperty({ type: [String], example: ['Türkçe', 'İngilizce'] })
    @IsArray()
    languages: string[];

    @ApiProperty({ enum: ['online', 'in-person'], isArray: true })
    @IsArray()
    sessionTypes: ('online' | 'in-person')[];

    @ApiProperty({ example: 800 })
    @IsNumber()
    priceMin: number;

    @ApiProperty({ example: 1200 })
    @IsNumber()
    priceMax: number;

    @ApiPropertyOptional({ type: [String] })
    @IsArray()
    @IsOptional()
    insurance?: string[];
}
