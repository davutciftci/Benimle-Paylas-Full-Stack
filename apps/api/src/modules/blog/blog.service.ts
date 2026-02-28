import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBlogPostDto } from './blog.dto';

const prisma = new PrismaClient();

@Injectable()
export class BlogService {
    async getAll(page = 1, pageSize = 10) {
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
        return { data: posts, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
    }

    async getBySlug(slug: string) {
        return prisma.blogPost.findUnique({ where: { slug } });
    }

    async getById(id: number) {
        return prisma.blogPost.findUnique({ where: { id } });
    }

    async create(dto: CreateBlogPostDto, author: string) {
        return prisma.blogPost.create({
            data: { ...dto, author, publishedAt: new Date() },
        });
    }
}
