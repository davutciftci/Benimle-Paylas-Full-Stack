import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateContactDto } from './contact.dto';

const prisma = new PrismaClient();

@Injectable()
export class ContactService {
    async create(dto: CreateContactDto) {
        const message = await prisma.contactMessage.create({ data: { ...dto } });
        return { success: true, id: message.id, message: 'Mesajınız alındı, en kısa sürede dönüş yapacağız.' };
    }

    async getAll() {
        return prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    }
}
