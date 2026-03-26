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

        if (user.role === 'expert' && !user.expertProfile) {
            const newProfile = await prisma.expertProfile.upsert({
                where: { userId: user.id },
                create: { userId: user.id },
                update: {},
            });
            return { ...user, expertProfile: newProfile };
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

    async getAdminStats() {
        const [totalUsers, activeUsers, totalAppointments, pendingApprovals] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { isActive: true } }),
            prisma.appointment.count(),
            prisma.appointment.count({ where: { status: { name: 'pending' } } }),
        ]);
        return { totalUsers, activeUsers, totalAppointments, pendingApprovals };
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
        });

        if (oldRole === 'expert' && roleName !== 'expert') {
            await prisma.expertProfile.deleteMany({ where: { userId } });
        }

        if (roleName === 'expert') {
            await prisma.expertProfile.upsert({
                where: { userId },
                create: { userId },
                update: {},
            });
        }

        return this.getMe(userId);
    }
}
