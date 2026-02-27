import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './users.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
    async getMe(userId: string) {
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
        return user;
    }

    async updateMe(userId: string, dto: UpdateUserDto) {
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
            },
        });
        return user;
    }
}
