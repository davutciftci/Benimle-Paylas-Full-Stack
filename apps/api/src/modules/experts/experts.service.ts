import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ExpertFiltersDto, UpdateExpertDto, CreateExpertDto } from './experts.dto';
import { paginate } from '../../utils';
import { isExpertAvailableNow } from './expert-availability.util';

const prisma = new PrismaClient();

const expertListInclude = {
    user: { select: { firstName: true, lastName: true } },
    specialties: true,
    degree: true,
    title: true,
    therapeuticApproaches: true,
    seminars: true,
} as const;

@Injectable()
export class ExpertsService {
    async getAll(filters: ExpertFiltersDto) {
        const page = filters.page || 1;
        const pageSize = filters.pageSize || 10;
        const skip = (page - 1) * pageSize;

        const where: Record<string, unknown> = {};

        if (filters.search) {
            where.OR = [
                { bio: { contains: filters.search, mode: 'insensitive' } },
                { university: { contains: filters.search, mode: 'insensitive' } },
                { user: { firstName: { contains: filters.search, mode: 'insensitive' } } },
                { user: { lastName: { contains: filters.search, mode: 'insensitive' } } },
            ];
        }

        if (filters.price !== undefined && filters.price !== null && !Number.isNaN(filters.price)) {
            where.price = { lte: filters.price };
        }

        if (filters.specialty) {
            const terms = filters.specialty
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
            if (terms.length > 0) {
                where.specialties = {
                    some: {
                        OR: terms.map((t) => ({
                            name: { contains: t, mode: 'insensitive' as const },
                        })),
                    },
                };
            }
        }

        if (filters.availableNow) {
            const all = await prisma.expertProfile.findMany({
                where,
                include: expertListInclude,
                orderBy: { id: 'desc' },
            });
            const filtered = all.filter((e) => isExpertAvailableNow(e.workingHours));
            const total = filtered.length;
            const data = filtered.slice(skip, skip + pageSize);
            return paginate({ data, total, page, pageSize });
        }

        const [experts, total] = await Promise.all([
            prisma.expertProfile.findMany({
                where,
                skip,
                take: pageSize,
                include: expertListInclude,
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
                specialties: true,
                degree: true,
                title: true,
                therapeuticApproaches: true,
                seminars: true,
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

        const { specialtyIds, therapeuticApproachIds, seminars, ...restDto } = dto;
        
        return prisma.expertProfile.update({ 
            where: { id }, 
            data: {
                ...restDto,
                ...(specialtyIds !== undefined && {
                    specialties: {
                        set: specialtyIds.map(sid => ({ id: sid }))
                    }
                }),
                ...(therapeuticApproachIds !== undefined && {
                    therapeuticApproaches: {
                        set: therapeuticApproachIds.map(tid => ({ id: tid }))
                    }
                }),
                ...(seminars !== undefined && {
                    seminars: {
                        deleteMany: {},
                        create: seminars.map(sem => ({
                            title: sem.title,
                            description: sem.description,
                            date: sem.date ? new Date(sem.date) : null
                        }))
                    }
                })
            }
        });
    }
}
