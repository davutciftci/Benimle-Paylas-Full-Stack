import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReviewDto } from './reviews.dto';

const prisma = new PrismaClient();

@Injectable()
export class ReviewsService {
    async getForExpert(expertId: number) {
        const expert = await prisma.expertProfile.findUnique({ where: { id: expertId } });
        if (!expert) throw new NotFoundException('Uzman bulunamadı');

        return prisma.review.findMany({
            where: { expertId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async create(dto: CreateReviewDto, userId: number) {
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

        // Uzman istatistiklerinin güncellendiği farzı (tabloda reviewCount yok, DTO'da olabilir)
        // Eğer tabloda rating yoksa bu kısmı atlıyoruz, ERD'de tabloda bulunmadığı için kaldırıldı.
        // rating: Math.round((stats._avg.rating || 0) * 10) / 10,

        return review;
    }
}
