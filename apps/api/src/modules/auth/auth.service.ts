import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './auth.dto';
import { EmailService } from '../../email/email.service';
import { generateToken } from '../../utils';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private emailService: EmailService,
    ) {}

    async register(dto: RegisterDto) {
        const existing = await prisma.user.findUnique({ where: { email: dto.email } });
        if (existing) {
            throw new ConflictException('Bu e-posta adresi zaten kullanımda');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 12);

        const user = await prisma.user.create({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                passwordHash: hashedPassword,
                phone: dto.phone,
                role: {
                    connect: { name: 'user' }
                },
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

        await this.emailService.sendWelcomeEmail(user.email, `${user.firstName} ${user.lastName}`);

        const access_token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role.name });

        return { 
            user: {
                ...user,
                role: user.role.name
            }, 
            access_token 
        };
    }

    async login(dto: LoginDto) {
        const user = await prisma.user.findUnique({ 
            where: { email: dto.email },
            include: { role: true } 
        });
        if (!user) {
            throw new UnauthorizedException('Geçersiz e-posta veya şifre');
        }

        const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException('Geçersiz e-posta veya şifre');
        }

        const access_token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role.name });

        const { passwordHash: _password, roleId: _, ...safeUser } = user;
        return { 
            user: {
                ...safeUser,
                role: user.role.name
            }, 
            access_token 
        };
    }

    async forgotPassword(dto: ForgotPasswordDto) {
        const user = await prisma.user.findUnique({ where: { email: dto.email } });
        if (!user) {
            // Güvenlik için kullanıcı bulunamasa da başarılı döndür
            return { message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi' };
        }

        const token = generateToken();
        const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 saat

        await prisma.passwordResetToken.upsert({
            where: { userId: user.id },
            create: { userId: user.id, token, expiresAt },
            update: { token, expiresAt },
        });

        const resetUrl = `${process.env.CORS_ORIGIN || 'http://localhost:5173'}/reset-password?token=${token}`;
        await this.emailService.sendPasswordResetEmail(user.email, `${user.firstName} ${user.lastName}`, resetUrl);

        return { message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi' };
    }

    async resetPassword(dto: ResetPasswordDto) {
        const record = await prisma.passwordResetToken.findUnique({
            where: { token: dto.token },
            include: { user: true },
        });

        if (!record || record.expiresAt < new Date()) {
            throw new NotFoundException('Geçersiz veya süresi dolmuş token');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 12);

        await prisma.user.update({
            where: { id: record.userId },
            data: { passwordHash: hashedPassword },
        });

        await prisma.passwordResetToken.delete({ where: { token: dto.token } });

        return { message: 'Şifreniz başarıyla güncellendi' };
    }
}
