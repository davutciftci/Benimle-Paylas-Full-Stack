import { IsString, IsEmail, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContactDto {
    @ApiProperty({ example: 'Ahmet Yılmaz', description: 'Ad soyad' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'ahmet@example.com', description: 'E-posta' })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ example: 'Randevu hakkında', description: 'Konu' })
    @IsString()
    @IsOptional()
    @MaxLength(200)
    subject?: string;

    @ApiProperty({ description: 'Mesaj içeriği' })
    @IsString()
    @MaxLength(2000)
    message: string;
}
