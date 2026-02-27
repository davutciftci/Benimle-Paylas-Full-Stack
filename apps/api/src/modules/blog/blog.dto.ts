import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBlogPostDto {
    @ApiProperty({ description: 'Yazı başlığı' })
    @IsString()
    @MaxLength(200)
    title: string;

    @ApiProperty({ description: 'URL dostu slug' })
    @IsString()
    @MaxLength(200)
    slug: string;

    @ApiProperty({ description: 'Yazı içeriği' })
    @IsString()
    content: string;

    @ApiPropertyOptional({ description: 'Özet' })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    excerpt?: string;

    @ApiPropertyOptional({ description: 'Kapak görseli URL' })
    @IsString()
    @IsOptional()
    imageUrl?: string;

    @ApiPropertyOptional({ description: 'Kategori' })
    @IsString()
    @IsOptional()
    category?: string;
}
