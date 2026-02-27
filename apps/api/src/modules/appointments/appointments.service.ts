import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from './appointments.dto';

const prisma = new PrismaClient();

@Injectable()
export class AppointmentsService {
    async create(dto: CreateAppointmentDto, userId: string) {
        const expert = await prisma.expert.findUnique({ where: { id: dto.expertId } });
        if (!expert) throw new NotFoundException('Uzman bulunamadı');

        return prisma.appointment.create({
            data: {
                userId,
                expertId: dto.expertId,
                date: new Date(dto.date),
                startTime: dto.startTime,
                endTime: dto.endTime,
                sessionType: dto.sessionType,
                notes: dto.notes,
                status: 'PENDING',
            },
            include: { expert: true },
        });
    }

    async getForUser(userId: string) {
        return prisma.appointment.findMany({
            where: { userId },
            include: { expert: true },
            orderBy: { date: 'desc' },
        });
    }

    async getForExpert(expertId: string) {
        return prisma.appointment.findMany({
            where: { expertId },
            include: { user: { select: { id: true, name: true, email: true } } },
            orderBy: { date: 'desc' },
        });
    }

    async updateStatus(id: string, dto: UpdateAppointmentStatusDto) {
        const appointment = await prisma.appointment.findUnique({ where: { id } });
        if (!appointment) throw new NotFoundException('Randevu bulunamadı');

        return prisma.appointment.update({
            where: { id },
            data: { status: dto.status.toUpperCase() as 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' },
        });
    }
}
