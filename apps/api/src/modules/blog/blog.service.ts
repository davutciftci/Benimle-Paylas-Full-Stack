import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaClient } from '@prisma/client';
import { CreateBlogPostDto } from './blog.dto';

const prisma = new PrismaClient();

@Injectable()
export class BlogService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getAll(page = 1, pageSize = 10) {
        const cacheKey = `blog_all_${page}_${pageSize}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const skip = (page - 1) * pageSize;
        const [posts, total] = await Promise.all([
            prisma.blogPost.findMany({
                skip,
                take: pageSize,
                orderBy: { publishedAt: 'desc' },
                select: {
                    id: true, title: true, slug: true, excerpt: true,
                    author: true, publishedAt: true, imageUrl: true, category: true,
                },
            }),
            prisma.blogPost.count(),
        ]);
        const result = { data: posts, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
        await this.cacheManager.set(cacheKey, result, 60000); // 1 minute
        return result;
    }

    async getBySlug(slug: string) {
        const cacheKey = `blog_slug_${slug}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const result = await prisma.blogPost.findUnique({ where: { slug } });
        if (result) await this.cacheManager.set(cacheKey, result, 60000);
        return result;
    }

    async getById(id: number) {
        const cacheKey = `blog_id_${id}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const result = await prisma.blogPost.findUnique({ where: { id } });
        if (result) await this.cacheManager.set(cacheKey, result, 60000);
        return result;
    }

    async create(dto: CreateBlogPostDto, author: string) {
        const result = await prisma.blogPost.create({
            data: { ...dto, author, publishedAt: new Date() },
        });
        // Cache invalidation could be handled by deleting specific keys or waiting for 1min TTL
        // Note: reset() is not available on Cache interface natively in v5
        return result;
    }
}
