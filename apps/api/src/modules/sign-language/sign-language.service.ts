import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaClient } from '@prisma/client';
import { CreateSignLanguageWordDto } from './sign-language.dto';

const prisma = new PrismaClient();

@Injectable()
export class SignLanguageService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async findByWord(word: string) {
        const cacheKey = `sign_word_${word.toLowerCase()}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const result = await prisma.signLanguageWord.findFirst({
            where: {
                word: { equals: word.toLowerCase() },
                isActive: true,
            },
        });

        if (!result) {
            // Kelime DB'de yok → harfleme modunu tetikle
            return { word, hasVideo: false, fingerspell: true };
        }

        await this.cacheManager.set(cacheKey, result, 300000); // 5 dakika
        return result;
    }

    async getAll() {
        const cached = await this.cacheManager.get('sign_all');
        if (cached) return cached;

        const data = await prisma.signLanguageWord.findMany({
            where: { isActive: true },
            orderBy: { word: 'asc' },
        });

        await this.cacheManager.set('sign_all', data, 300000);
        return data;
    }

    async create(dto: CreateSignLanguageWordDto) {
        const result = await prisma.signLanguageWord.create({
            data: {
                ...dto,
                word: dto.word.toLowerCase(),
                hasVideo: dto.hasVideo ?? false,
            },
        });
        await this.cacheManager.del('sign_all');
        return result;
    }

    async delete(id: number) {
        const existing = await prisma.signLanguageWord.findUnique({ where: { id } });
        if (!existing) throw new NotFoundException('Kelime bulunamadı');

        const result = await prisma.signLanguageWord.delete({ where: { id } });
        await this.cacheManager.del('sign_all');
        await this.cacheManager.del(`sign_word_${existing.word}`);
        return result;
    }
}