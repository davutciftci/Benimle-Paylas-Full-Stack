import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './users.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
    async getMe(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
                expertProfile: true,
                admin: true,
            },
        });
        if (!user) return null;

        if (user.role === 'expert' && !user.expertProfile) {
            const newProfile = await prisma.expertProfile.upsert({
                where: { userId: user.id },
                create: { userId: user.id },
                update: {},
            });
            return { ...user, expertProfile: newProfile };
        }

        if (user.role === 'admin' && !user.admin) {
            const newAdmin = await prisma.admin.upsert({
                where: { userId: user.id },
                create: { userId: user.id },
                update: {},
            });
            return { ...user, admin: newAdmin };
        }

        return user;
    }

    async updateMe(userId: number, dto: UpdateUserDto) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                ...(dto.firstName && { firstName: dto.firstName }),
                ...(dto.lastName && { lastName: dto.lastName }),
                ...(dto.email && { email: dto.email }),
                ...(dto.phone && { phone: dto.phone }),
            },
        });
        return this.getMe(userId);
    }

    async getAll() {
        return prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
                expertProfile: { select: { id: true } },
                admin: { select: { id: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateRole(userId: number, roleName: string) {
        const validRoles = ['user', 'admin', 'expert'];
        if (!validRoles.includes(roleName)) {
            throw new NotFoundException(`Geçersiz rol: ${roleName}`);
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('Kullanıcı bulunamadı');

        const oldRole = user.role;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role: roleName as any },
            include: { expertProfile: true, admin: true },
        });

        if (oldRole === 'expert' && roleName !== 'expert') {
            await prisma.expertProfile.deleteMany({ where: { userId } });
        }
        if (oldRole === 'admin' && roleName !== 'admin') {
            await prisma.admin.deleteMany({ where: { userId } });
        }

        if (roleName === 'expert') {
            await prisma.expertProfile.upsert({
                where: { userId },
                create: { userId },
                update: {},
            });
        }

        if (roleName === 'admin') {
            await prisma.admin.upsert({
                where: { userId },
                create: { userId },
                update: {},
            });
        }

        return this.getMe(userId);
    }
}
