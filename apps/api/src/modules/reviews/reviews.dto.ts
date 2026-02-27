import { IsString, IsNumber, IsOptional, Min, Max, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({ description: 'Uzman ID' })
    @IsNumber()
    expertId: number;

    @ApiProperty({ example: 'Ali Y.', description: 'Gösterilecek kullanıcı adı' })
    @IsString()
    @MaxLength(50)
    userName: string;

    @ApiProperty({ example: 5, description: 'Puan (1-5)', minimum: 1, maximum: 5 })
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiPropertyOptional({ description: 'Yorum', maxLength: 500 })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    comment?: string;
}
