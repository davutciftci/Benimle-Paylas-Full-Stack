import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateFaqDto } from './faq.dto';

const prisma = new PrismaClient();

@Injectable()
export class FaqService {
    async getAll() {
        return prisma.fAQ.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] });
    }

    async create(dto: CreateFaqDto) {
        return prisma.fAQ.create({ data: { ...dto, order: dto.order ?? 0 } });
    }

    async delete(id: string) {
        return prisma.fAQ.delete({ where: { id } });
    }
}
