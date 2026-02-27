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

        const where: Record<string, unknown> = { isVerified: true };

        // For now, simplify search to basic relations since fields like specialty were dropped.
        if (filters.search) {
            where.OR = [
                { bio: { contains: filters.search, mode: 'insensitive' } },
                { university: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        const [experts, total] = await Promise.all([
            prisma.expertProfile.findMany({ 
                where, 
                skip, 
                take: pageSize, 
                include: { user: { select: { firstName: true, lastName: true } } },
                orderBy: { id: 'desc' }, 
            }),
            prisma.expertProfile.count({ where }),
        ]);

        return paginate({ data: experts, total, page, pageSize });
    }

    async getById(id: number) {
        const expert = await prisma.expertProfile.findUnique({
            where: { id },
            include: {
                user: { select: { firstName: true, lastName: true, email: true } },
                reviews: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });
        if (!expert) throw new NotFoundException('Uzman bulunamadı');
        return expert;
    }

    async create(dto: CreateExpertDto, userId: number) {
        return prisma.expertProfile.create({
            data: {
                ...dto,
                userId,
                isVerified: false,
            },
        });
    }

    async update(id: number, dto: UpdateExpertDto) {
        const expert = await prisma.expertProfile.findUnique({ where: { id } });
        if (!expert) throw new NotFoundException('Uzman bulunamadı');
        return prisma.expertProfile.update({ where: { id }, data: dto });
    }
}
