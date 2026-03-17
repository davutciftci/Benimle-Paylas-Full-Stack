import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSpecialtyDto {
    @ApiProperty({ description: 'Uzmanlık alanı adı' })
    @IsString()
    @MaxLength(100)
    name: string;
}

export class CreateDegreeDto {
    @ApiProperty({ description: 'Mezuniyet derecesi / bölüm adı' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiPropertyOptional({ description: 'Açıklama' })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;
}

export class CreateTitleDto {
    @ApiProperty({ description: 'Uzman ünvanı adı' })
    @IsString()
    @MaxLength(100)
    name: string;
}

export class CreateTherapeuticApproachDto {
    @ApiProperty({ description: 'Çalışma ekolü adı' })
    @IsString()
    @MaxLength(100)
    name: string;
}
