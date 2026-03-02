import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaClient } from '@prisma/client';
import { CreateFaqDto } from './faq.dto';

const prisma = new PrismaClient();

@Injectable()
export class FaqService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getAll() {
        const cached = await this.cacheManager.get('faq_all');
        if (cached) return cached;

        const data = await prisma.fAQ.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] });
        await this.cacheManager.set('faq_all', data, 60000); // 1 minute
        return data;
    }

    async create(dto: CreateFaqDto) {
        const result = await prisma.fAQ.create({ data: { ...dto, order: dto.order ?? 0 } });
        await this.cacheManager.del('faq_all');
        return result;
    }

    async delete(id: number) {
        const result = await prisma.fAQ.delete({ where: { id } });
        await this.cacheManager.del('faq_all');
        return result;
    }
}
