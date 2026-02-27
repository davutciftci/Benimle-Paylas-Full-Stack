import { IsEmail, IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { RegisterDto } from '../auth/auth.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {
    @ApiPropertyOptional({ example: 'Ahmet', description: 'Adınız' })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    firstName?: string;

    @ApiPropertyOptional({ example: 'Yılmaz', description: 'Soyadınız' })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    lastName?: string;

    @ApiPropertyOptional({ example: 'ahmet@example.com' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: '+90 555 123 4567' })
    @IsString()
    @IsOptional()
    phone?: string;
}
