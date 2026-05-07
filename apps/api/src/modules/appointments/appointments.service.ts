import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from './appointments.dto';
import { EmailService } from '../../email/email.service';

const prisma = new PrismaClient();

@Injectable()
export class AppointmentsService {
    constructor(private readonly emailService: EmailService) {}
    
    private async ensureInitialStatus(): Promise<string> {
        const confirmedStatus = await prisma.appointmentStatus.findUnique({
            where: { name: 'confirmed' },
            select: { name: true },
        });

        if (confirmedStatus?.name) {
            return confirmedStatus.name;
        }

        const createdStatus = await prisma.appointmentStatus.create({
            data: {
                name: 'confirmed',
                description: 'Odeme sonrasi otomatik onaylandi',
            },
            select: { name: true },
        });

        return createdStatus.name;
    }

    private getIstanbulDayKey(date: Date): string {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: 'Europe/Istanbul',
            weekday: 'long',
        })
            .format(date)
            .toLowerCase();
    }

    private getIstanbulTime(date: Date): string {
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Europe/Istanbul',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).formatToParts(date);

        let hour = '00';
        let minute = '00';
        for (const part of parts) {
            if (part.type === 'hour') hour = part.value;
            if (part.type === 'minute') minute = part.value;
        }
        return `${hour}:${minute}`;
    }

    private isSlotAvailableInWorkingHours(workingHours: unknown, scheduledAt: Date): boolean {
        if (!workingHours || typeof workingHours !== 'object') return false;
        const dayKey = this.getIstanbulDayKey(scheduledAt);
        const slotTime = this.getIstanbulTime(scheduledAt);
        const slots = (workingHours as Record<string, unknown>)[dayKey];
        if (!Array.isArray(slots) || slots.length === 0) return false;

        return slots.some((slot) => {
            if (!slot || typeof slot !== 'object') return false;
            const value = (slot as { time?: string; start?: string }).time ?? (slot as { start?: string }).start;
            return value === slotTime;
        });
    }

    private mapAppointment(appointment: any) {
        const start = new Date(appointment.scheduledAt);
        const end = new Date(start.getTime() + (appointment.durationMinutes ?? 50) * 60 * 1000);

        return {
            id: appointment.id,
            userId: appointment.clientId,
            expertId: appointment.expertId,
            date: start.toISOString(),
            timeSlot: {
                start: start.toISOString().slice(11, 16),
                end: end.toISOString().slice(11, 16),
            },
            status: appointment.status?.name ?? 'pending',
            notes: appointment.notes ?? null,
            sessionType: (appointment.sessionType as 'online' | 'in-person') ?? 'online',
            meetingLink: null,
            createdAt: appointment.createdAt,
            durationMinutes: appointment.durationMinutes ?? 50,
            client: appointment.client ?? null,
            expert: appointment.expert ?? null,
        };
    }

    async create(dto: CreateAppointmentDto, userId: number) {
        const initialStatus = await this.ensureInitialStatus();
        const scheduledAt = new Date(dto.date);
        if (Number.isNaN(scheduledAt.getTime())) {
            throw new BadRequestException('Gecersiz randevu tarihi');
        }
        if (scheduledAt <= new Date()) {
            throw new BadRequestException('Gecmis bir saat icin randevu olusturulamaz');
        }

        const expert = await prisma.expertProfile.findUnique({
            where: { id: dto.expertId },
            include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
        });
        if (!expert) throw new NotFoundException('Uzman bulunamadı');
        if (!this.isSlotAvailableInWorkingHours(expert.workingHours, scheduledAt)) {
            throw new BadRequestException('Secilen saat uzmanın musaitlik takviminde bulunmuyor');
        }

        const client = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, firstName: true, lastName: true, email: true, role: true },
        });
        if (!client) throw new NotFoundException('Kullanici bulunamadi');
        if (client.role !== 'user') {
            throw new BadRequestException('Randevu olusturma islemi sadece user rolunde mumkundur');
        }

        const existingAtSameTime = await prisma.appointment.findMany({
            where: { expertId: dto.expertId, scheduledAt },
            include: { status: true },
        });
        if (existingAtSameTime.some((appointment) => appointment.status?.name !== 'cancelled')) {
            throw new BadRequestException('Bu saat baska bir randevu icin ayrilmis');
        }

        const appointment = await prisma.appointment.create({
            data: {
                client: { connect: { id: userId } },
                expert: { connect: { id: dto.expertId } },
                scheduledAt,
                notes: dto.notes,
                durationMinutes: 50,
                status: {
                    connect: { name: initialStatus }
                },
            },
            include: {
                expert: true,
                client: { select: { id: true, firstName: true, lastName: true, email: true } },
                status: true,
            },
        });

        const dateLabel = scheduledAt.toLocaleDateString('tr-TR');
        const startLabel = this.getIstanbulTime(scheduledAt);
        const endDate = new Date(scheduledAt.getTime() + 50 * 60 * 1000);
        const endLabel = this.getIstanbulTime(endDate);
        const expertName = `${expert.user.firstName} ${expert.user.lastName}`.trim();
        const clientName = `${client.firstName} ${client.lastName}`.trim();

        void this.emailService.sendAppointmentCreatedEmail(client.email, {
            recipientName: clientName,
            counterpartName: expertName,
            counterpartRole: 'expert',
            date: dateLabel,
            startTime: startLabel,
            endTime: endLabel,
            sessionType: dto.sessionType ?? 'online',
            notes: dto.notes,
        });

        void this.emailService.sendAppointmentCreatedEmail(expert.user.email, {
            recipientName: expertName,
            counterpartName: clientName,
            counterpartRole: 'user',
            date: dateLabel,
            startTime: startLabel,
            endTime: endLabel,
            sessionType: dto.sessionType ?? 'online',
            notes: dto.notes,
        });

        return this.mapAppointment(appointment);
    }

    async getForUser(userId: number) {
        const appointments = await prisma.appointment.findMany({
            where: { clientId: userId },
            include: { expert: true, status: true },
            orderBy: { scheduledAt: 'desc' },
        });

        return appointments.map((appointment) => this.mapAppointment(appointment));
    }

    async getForExpert(expertId: number) {
        const appointments = await prisma.appointment.findMany({
            where: { expertId },
            include: {
                client: { select: { id: true, firstName: true, lastName: true, email: true } },
                status: true,
            },
            orderBy: { scheduledAt: 'desc' },
        });

        return appointments.map((appointment) => this.mapAppointment(appointment));
    }

    async updateStatus(id: number, dto: UpdateAppointmentStatusDto) {
        const appointment = await prisma.appointment.findUnique({ where: { id } });
        if (!appointment) throw new NotFoundException('Randevu bulunamadı');

        const updated = await prisma.appointment.update({
            where: { id },
            data: { 
                status: {
                    connect: { name: dto.status.toLowerCase() }
                }
            },
            include: {
                client: { select: { id: true, firstName: true, lastName: true, email: true } },
                expert: true,
                status: true,
            },
        });

        return this.mapAppointment(updated);
    }
}
