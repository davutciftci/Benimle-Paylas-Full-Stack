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

/** DB sütun limitleri: university 255, fieldOfStudy 255, licenseNumber 100; profilePhotoUrl TEXT (sınırsız) */
const MAX_UNIVERSITY = 255;
const MAX_FIELD_OF_STUDY = 255;
const MAX_LICENSE_NUMBER = 100;

export class UpdateExpertDto {
    @ApiPropertyOptional({ description: 'Uzman bio / açıklama' })
    @IsString()
    @IsOptional()
    bio?: string;

    @ApiPropertyOptional({ description: 'Mezun olunan üniversite', maxLength: MAX_UNIVERSITY })
    @IsString()
    @IsOptional()
    @MaxLength(MAX_UNIVERSITY)
    university?: string;

    @ApiPropertyOptional({ description: 'Bölüm', maxLength: MAX_FIELD_OF_STUDY })
    @IsString()
    @IsOptional()
    @MaxLength(MAX_FIELD_OF_STUDY)
    fieldOfStudy?: string;

    @ApiPropertyOptional({ description: 'Mezuniyet Yılı' })
    @IsNumber()
    @IsOptional()
    graduationYear?: number;

    @ApiPropertyOptional({ description: 'Lisans Numarası', maxLength: MAX_LICENSE_NUMBER })
    @IsString()
    @IsOptional()
    @MaxLength(MAX_LICENSE_NUMBER)
    licenseNumber?: string;

    @ApiPropertyOptional({ description: 'Kaç Yıllık Tecrübe' })
    @IsNumber()
    @IsOptional()
    yearsOfExperience?: number;

    @ApiPropertyOptional({ description: 'Profil fotoğraf URL veya base64 data URL' })
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

    @ApiPropertyOptional({ description: 'Mezun olunan üniversite', maxLength: MAX_UNIVERSITY })
    @IsString()
    @IsOptional()
    @MaxLength(MAX_UNIVERSITY)
    university?: string;

    @ApiPropertyOptional({ description: 'Bölüm', maxLength: MAX_FIELD_OF_STUDY })
    @IsString()
    @IsOptional()
    @MaxLength(MAX_FIELD_OF_STUDY)
    fieldOfStudy?: string;

    @ApiPropertyOptional({ description: 'Mezuniyet Yılı' })
    @IsNumber()
    @IsOptional()
    graduationYear?: number;

    @ApiPropertyOptional({ description: 'Lisans Numarası', maxLength: MAX_LICENSE_NUMBER })
    @IsString()
    @IsOptional()
    @MaxLength(MAX_LICENSE_NUMBER)
    licenseNumber?: string;

    @ApiPropertyOptional({ description: 'Kaç Yıllık Tecrübe' })
    @IsNumber()
    @IsOptional()
    yearsOfExperience?: number;

    @ApiPropertyOptional({ description: 'Profil fotoğraf URL veya base64 data URL' })
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
