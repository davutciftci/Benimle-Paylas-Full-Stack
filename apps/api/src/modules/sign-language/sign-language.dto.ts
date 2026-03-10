import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSignLanguageWordDto {
    @ApiProperty({ description: 'Kelime' })
    @IsString()
    @MaxLength(100)
    word: string;

    @ApiPropertyOptional({ description: 'Video URL' })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    videoUrl?: string;

    @ApiPropertyOptional({ description: 'Kategori (buton, baslik, form, genel)' })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    category?: string;

    @ApiPropertyOptional({ description: 'Video mevcut mu?' })
    @IsBoolean()
    @IsOptional()
    hasVideo?: boolean;
}