import {
    IsString,
    IsOptional,
    IsNumber,
    Min,
    Max,
    MaxLength,
} from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ExpertFiltersDto {
    @ApiPropertyOptional({ description: 'Açıklama, üniversite aramak için' })
    @IsString()
    @IsOptional()
    search?: string;

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
    @ApiPropertyOptional({ description: 'Uzman bio / açıklama' })
    @IsString()
    @IsOptional()
    bio?: string;

    @ApiPropertyOptional({ description: 'Mezun olunan üniversite' })
    @IsString()
    @IsOptional()
    university?: string;

    @ApiPropertyOptional({ description: 'Bölüm' })
    @IsString()
    @IsOptional()
    fieldOfStudy?: string;

    @ApiPropertyOptional({ description: 'Mezuniyet Yılı' })
    @IsNumber()
    @IsOptional()
    graduationYear?: number;

    @ApiPropertyOptional({ description: 'Lisans Numarası' })
    @IsString()
    @IsOptional()
    licenseNumber?: string;

    @ApiPropertyOptional({ description: 'Kaç Yıllık Tecrübe' })
    @IsNumber()
    @IsOptional()
    yearsOfExperience?: number;

    @ApiPropertyOptional({ description: 'Profil Fotoğraf URL' })
    @IsString()
    @IsOptional()
    profilePhotoUrl?: string;

    @ApiPropertyOptional({ description: 'Mezuniyet Derecesi (ID)' })
    @IsNumber()
    @IsOptional()
    degreeId?: number;
}

export class CreateExpertDto {
    @ApiPropertyOptional({ description: 'Uzman bio / açıklama' })
    @IsString()
    @IsOptional()
    bio?: string;

    @ApiPropertyOptional({ description: 'Mezun olunan üniversite' })
    @IsString()
    @IsOptional()
    university?: string;

    @ApiPropertyOptional({ description: 'Bölüm' })
    @IsString()
    @IsOptional()
    fieldOfStudy?: string;

    @ApiPropertyOptional({ description: 'Mezuniyet Yılı' })
    @IsNumber()
    @IsOptional()
    graduationYear?: number;

    @ApiPropertyOptional({ description: 'Lisans Numarası' })
    @IsString()
    @IsOptional()
    licenseNumber?: string;

    @ApiPropertyOptional({ description: 'Kaç Yıllık Tecrübe' })
    @IsNumber()
    @IsOptional()
    yearsOfExperience?: number;

    @ApiPropertyOptional({ description: 'Profil Fotoğraf URL' })
    @IsString()
    @IsOptional()
    profilePhotoUrl?: string;

    @ApiPropertyOptional({ description: 'Mezuniyet Derecesi (ID)' })
    @IsNumber()
    @IsOptional()
    degreeId?: number;
}
