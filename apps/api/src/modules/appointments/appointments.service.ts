import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from './appointments.dto';

const prisma = new PrismaClient();

@Injectable()
export class AppointmentsService {
    async create(dto: CreateAppointmentDto, userId: number) {
        const expert = await prisma.expertProfile.findUnique({ where: { id: dto.expertId } });
        if (!expert) throw new NotFoundException('Uzman bulunamadı');

        return prisma.appointment.create({
            data: {
                client: { connect: { id: userId } },
                expert: { connect: { id: dto.expertId } },
                scheduledAt: new Date(dto.date),
                notes: dto.notes,
                status: {
                    connect: { name: 'pending' }
                },
            },
            include: { expert: true },
        });
    }

    async getForUser(userId: number) {
        return prisma.appointment.findMany({
            where: { clientId: userId },
            include: { expert: true },
            orderBy: { scheduledAt: 'desc' },
        });
    }

    async getForExpert(expertId: number) {
        return prisma.appointment.findMany({
            where: { expertId },
            include: { client: { select: { id: true, firstName: true, lastName: true, email: true } } },
            orderBy: { scheduledAt: 'desc' },
        });
    }

    async updateStatus(id: number, dto: UpdateAppointmentStatusDto) {
        const appointment = await prisma.appointment.findUnique({ where: { id } });
        if (!appointment) throw new NotFoundException('Randevu bulunamadı');

        return prisma.appointment.update({
            where: { id },
            data: { 
                status: {
                    connect: { name: dto.status.toLowerCase() }
                }
            },
        });
    }
}
