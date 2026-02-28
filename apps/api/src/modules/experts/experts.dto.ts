import {
    IsString,
    IsOptional,
    IsNumber,
    Min,
    Max,
    MaxLength,
    IsArray,
    IsInt,
    IsObject,
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

    @ApiPropertyOptional({ description: 'Seans Ücreti' })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiPropertyOptional({ description: 'Mezuniyet Derecesi (ID)' })
    @IsNumber()
    @IsOptional()
    degreeId?: number;

    @ApiPropertyOptional({ description: 'Uzman Unvanı (ID)' })
    @IsNumber()
    @IsOptional()
    titleId?: number;

    @ApiPropertyOptional({ description: 'Uzmanlık Alanlarının ID listesi' })
    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    specialtyIds?: number[];

    @ApiPropertyOptional({ description: 'Çalışma/Müsaitlik saatleri JSON' })
    @IsObject()
    @IsOptional()
    workingHours?: any;

    @ApiPropertyOptional({ description: 'Çalışma Ekolleri (Therapeutic Approaches) ID listesi' })
    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    therapeuticApproachIds?: number[];

    @ApiPropertyOptional({ description: 'Uzmanın katıldığı seminer ve konferanslar listesi' })
    @IsArray()
    @IsOptional()
    seminars?: { title: string; description?: string; date?: string }[];
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

    @ApiPropertyOptional({ description: 'Seans Ücreti' })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiPropertyOptional({ description: 'Mezuniyet Derecesi (ID)' })
    @IsNumber()
    @IsOptional()
    degreeId?: number;
}
