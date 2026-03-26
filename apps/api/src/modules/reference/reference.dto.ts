import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateReferenceNameDto {
    @ApiProperty({ description: 'İsim' })
    @IsString()
    @MaxLength(100)
    name: string;
}

export class CreateDegreeDto {
    @ApiProperty({ description: 'Derece/Bölüm adı' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiPropertyOptional({ description: 'Açıklama', maxLength: 500 })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;
}

