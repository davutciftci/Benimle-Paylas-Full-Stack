import { IsEmail, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'Ahmet', description: 'Adınız' })
    @IsString()
    @MaxLength(50)
    firstName: string;

    @ApiProperty({ example: 'Yılmaz', description: 'Soyadınız' })
    @IsString()
    @MaxLength(50)
    lastName: string;

    @ApiProperty({ example: 'ahmet@example.com', description: 'E-posta adresi' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'Şifre (min 8 karakter)', minLength: 8 })
    @IsString()
    @MinLength(8)
    password: string;

    @ApiPropertyOptional({ example: '+90 555 123 4567', description: 'Telefon numarası' })
    @IsString()
    @IsOptional()
    phone?: string;
}

export class LoginDto {
    @ApiProperty({ example: 'ahmet@example.com', description: 'E-posta adresi' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'Şifre' })
    @IsString()
    password: string;
}

export class ForgotPasswordDto {
    @ApiProperty({ example: 'ahmet@example.com', description: 'E-posta adresi' })
    @IsEmail()
    email: string;
}

export class ResetPasswordDto {
    @ApiProperty({ description: 'Şifre sıfırlama token\'ı' })
    @IsString()
    token: string;

    @ApiProperty({ example: 'newpassword123', description: 'Yeni şifre (min 8 karakter)', minLength: 8 })
    @IsString()
    @MinLength(8)
    password: string;
}
