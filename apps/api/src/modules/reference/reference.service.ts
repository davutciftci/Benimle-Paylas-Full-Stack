import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import {
    CreateDegreeDto,
    CreateReferenceNameDto,
} from './reference.dto';

const prisma = new PrismaClient();

@Injectable()
export class ReferenceService {
    async getSpecialties() {
        return prisma.specialty.findMany({ orderBy: { name: 'asc' } });
    }

    async createSpecialty(dto: CreateReferenceNameDto) {
        try {
            return prisma.specialty.create({
                data: { name: dto.name },
            });
        } catch (err) {
            this.handlePrismaUniqueConstraint(err, 'Bu uzmanlık alanı zaten mevcut');
        }
    }

    async deleteSpecialty(id: number) {
        const existing = await prisma.specialty.findUnique({ where: { id } });
        if (!existing) throw new NotFoundException('Uzmanlık alanı bulunamadı');

        await prisma.specialty.delete({ where: { id } });
    }

    async getDegrees() {
        return prisma.degreeType.findMany({ orderBy: { name: 'asc' } });
    }

    async createDegree(dto: CreateDegreeDto) {
        try {
            return prisma.degreeType.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                },
            });
        } catch (err) {
            this.handlePrismaUniqueConstraint(err, 'Bu derece/bölüm zaten mevcut');
        }
    }

    async deleteDegree(id: number) {
        const existing = await prisma.degreeType.findUnique({ where: { id } });
        if (!existing) throw new NotFoundException('Derece/bölüm bulunamadı');

        await prisma.degreeType.delete({ where: { id } });
    }

    async getTitles() {
        return prisma.title.findMany({ orderBy: { name: 'asc' } });
    }

    async createTitle(dto: CreateReferenceNameDto) {
        try {
            return prisma.title.create({
                data: { name: dto.name },
            });
        } catch (err) {
            this.handlePrismaUniqueConstraint(err, 'Bu ünvan zaten mevcut');
        }
    }

    async deleteTitle(id: number) {
        const existing = await prisma.title.findUnique({ where: { id } });
        if (!existing) throw new NotFoundException('Ünvan bulunamadı');

        await prisma.title.delete({ where: { id } });
    }

    async getTherapeuticApproaches() {
        return prisma.therapeuticApproach.findMany({ orderBy: { name: 'asc' } });
    }

    async createTherapeuticApproach(dto: CreateReferenceNameDto) {
        try {
            return prisma.therapeuticApproach.create({
                data: { name: dto.name },
            });
        } catch (err) {
            this.handlePrismaUniqueConstraint(err, 'Bu çalışma ekolü zaten mevcut');
        }
    }

    async deleteTherapeuticApproach(id: number) {
        const existing = await prisma.therapeuticApproach.findUnique({ where: { id } });
        if (!existing) throw new NotFoundException('Çalışma ekolü bulunamadı');

        await prisma.therapeuticApproach.delete({ where: { id } });
    }

    private handlePrismaUniqueConstraint(err: unknown, fallbackMessage: string): never {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2002'
        ) {
            throw new BadRequestException(fallbackMessage);
        }

        // TODO: other Prisma errors can be mapped here if needed.
        throw err;
    }
}

