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
            },
        });
        if (!user) return null;
        
        // Safety mechanism: if user is expert but profile is somehow missing
        if (user.role === 'expert' && !user.expertProfile) {
            const newProfile = await prisma.expertProfile.upsert({
                where: { userId: user.id },
                create: { userId: user.id },
                update: {},
            });
            return {
                ...user,
                expertProfile: newProfile,
                role: 'expert'
            };
        }

        return {
            ...user,
            role: user.role || 'user'
        };
    }

    async updateMe(userId: number, dto: UpdateUserDto) {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(dto.firstName && { firstName: dto.firstName }),
                ...(dto.lastName && { lastName: dto.lastName }),
                ...(dto.email && { email: dto.email }),
                ...(dto.phone && { phone: dto.phone }),
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
                expertProfile: true,
            },
        });
        return {
            ...user,
            role: user.role || 'user'
        };
    }

    async getAll() {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return users.map(user => ({
            ...user,
            role: user.role || 'user',
        }));
    }

    async updateRole(userId: number, roleName: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('Kullanıcı bulunamadı');

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                role: roleName as any, // Will be UserRole enum type
            },
        });

        if (roleName === 'expert') {
            await prisma.expertProfile.upsert({
                where: { userId: userId },
                create: { userId: userId },
                update: {},
            });
        }

        return {
            ...updatedUser,
            role: updatedUser.role || 'user',
        };
    }
}
