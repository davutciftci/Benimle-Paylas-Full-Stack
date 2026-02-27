import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ExpertFiltersDto, UpdateExpertDto, CreateExpertDto } from './experts.dto';
import { paginate } from '../../utils';

const prisma = new PrismaClient();

@Injectable()
export class ExpertsService {
    async getAll(filters: ExpertFiltersDto) {
        const page = filters.page || 1;
        const pageSize = filters.pageSize || 10;
        const skip = (page - 1) * pageSize;

        const where: Record<string, unknown> = { isActive: true };

        if (filters.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { specialty: { hasSome: [filters.search] } },
            ];
        }
        if (filters.specialty) {
            where.specialty = { hasSome: filters.specialty.split(',') };
        }
        if (filters.insurance) {
            where.insurance = { hasSome: filters.insurance.split(',') };
        }
        if (filters.minPrice !== undefined) {
            where.priceMin = { gte: filters.minPrice };
        }
        if (filters.maxPrice !== undefined) {
            where.priceMax = { lte: filters.maxPrice };
        }
        if (filters.sessionType) {
            where.sessionTypes = { hasSome: [filters.sessionType] };
        }
        if (filters.rating !== undefined) {
            where.rating = { gte: filters.rating };
        }

        const [experts, total] = await Promise.all([
            prisma.expert.findMany({ where, skip, take: pageSize, orderBy: { rating: 'desc' } }),
            prisma.expert.count({ where }),
        ]);

        return paginate({ data: experts, total, page, pageSize });
    }

    async getById(id: string) {
        const expert = await prisma.expert.findUnique({
            where: { id },
            include: {
                reviews: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });
        if (!expert) throw new NotFoundException('Uzman bulunamadı');
        return expert;
    }

    async create(dto: CreateExpertDto, userId: string) {
        return prisma.expert.create({
            data: {
                ...dto,
                userId,
                rating: 0,
                reviewCount: 0,
                isActive: true,
            },
        });
    }

    async update(id: string, dto: UpdateExpertDto) {
        const expert = await prisma.expert.findUnique({ where: { id } });
        if (!expert) throw new NotFoundException('Uzman bulunamadı');
        return prisma.expert.update({ where: { id }, data: dto });
    }
}
