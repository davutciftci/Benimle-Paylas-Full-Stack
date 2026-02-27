import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './reviews.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Get('expert/:expertId')
    @ApiOperation({ summary: 'Uzmana ait değerlendirmeler' })
    @ApiResponse({ status: 200, description: 'Değerlendirme listesi' })
    getForExpert(@Param('expertId') expertId: string) {
        return this.reviewsService.getForExpert(expertId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Değerlendirme ekle' })
    @ApiResponse({ status: 201, description: 'Değerlendirme eklendi' })
    create(@Body() dto: CreateReviewDto, @Request() req: { user: { id: string } }) {
        return this.reviewsService.create(dto, req.user.id);
    }
}
