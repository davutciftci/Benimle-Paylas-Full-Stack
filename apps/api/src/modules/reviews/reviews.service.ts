import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReviewDto } from './reviews.dto';

const prisma = new PrismaClient();

@Injectable()
export class ReviewsService {
    async getForExpert(expertId: string) {
        const expert = await prisma.expert.findUnique({ where: { id: expertId } });
        if (!expert) throw new NotFoundException('Uzman bulunamadı');

        return prisma.review.findMany({
            where: { expertId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async create(dto: CreateReviewDto, userId: string) {
        const review = await prisma.review.create({
            data: {
                expertId: dto.expertId,
                userId,
                userName: dto.userName,
                rating: dto.rating,
                comment: dto.comment || '',
            },
        });

        // Uzmanın ortalama puanını güncelle
        const stats = await prisma.review.aggregate({
            where: { expertId: dto.expertId },
            _avg: { rating: true },
            _count: true,
        });

        await prisma.expert.update({
            where: { id: dto.expertId },
            data: {
                rating: Math.round((stats._avg.rating || 0) * 10) / 10,
                reviewCount: stats._count,
            },
        });

        return review;
    }
}
