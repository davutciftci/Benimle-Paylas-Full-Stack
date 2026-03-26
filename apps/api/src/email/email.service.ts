import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as React from 'react';
import { render } from '@react-email/render';
import { PasswordResetEmail } from './templates/password-reset.template';
import { WelcomeEmail } from './templates/welcome.template';
import { AppointmentConfirmationEmail } from './templates/appointment-confirmation.template';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private transporter: nodemailer.Transporter;

    constructor() {
        const user = process.env.SMTP_USER?.trim();
        const pass = process.env.SMTP_PASS?.trim();
        const hasValidConfig = !!user && !!pass;

        // Nodemailer types oldukça sıkı; CI/Docker build'de TS2769 almamak için if/else ayırıyoruz.
        if (hasValidConfig) {
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: Number(process.env.SMTP_PORT) || 587,
                secure: false,
                auth: { user: user as string, pass: pass as string },
            });
        } else {
            this.transporter = nodemailer.createTransport({ jsonTransport: true });
        }

        if (!hasValidConfig) {
            this.logger.warn(
                'SMTP_USER veya SMTP_PASS tanımlı değil; e-postalar konsola yazılacak (dev modu)'
            );
        }
    }

    private async send(to: string, subject: string, html: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: `"Benimle Paylaş" <${process.env.SMTP_USER || 'noreply@benimlepaylas.com'}>`,
                to,
                subject,
                html,
            });
            this.logger.log(`E-posta gönderildi: ${to} - ${subject}`);
        } catch (error) {
            this.logger.error(`E-posta gönderilemedi: ${to}`, error);
            // Mail hatası uygulamayı çökertmemeli
        }
    }

    async sendPasswordResetEmail(email: string, name: string, resetUrl: string): Promise<void> {
        const html = await render(
            React.createElement(PasswordResetEmail, { userName: name, resetUrl })
        );
        await this.send(email, 'Şifre Sıfırlama - Benimle Paylaş', html);
    }

    async sendWelcomeEmail(email: string, name: string): Promise<void> {
        const loginUrl = `${process.env.CORS_ORIGIN || 'http://localhost:5173'}/login`;
        const html = await render(
            React.createElement(WelcomeEmail, { userName: name, loginUrl })
        );
        await this.send(email, 'Benimle Paylaş\'a Hoş Geldiniz!', html);
    }

    async sendAppointmentConfirmation(
        email: string,
        props: {
            userName: string;
            expertName: string;
            date: string;
            startTime: string;
            endTime: string;
            sessionType: 'online' | 'in-person';
            meetingLink?: string;
        }
    ): Promise<void> {
        const html = await render(React.createElement(AppointmentConfirmationEmail, props));
        await this.send(email, 'Randevunuz Onaylandı - Benimle Paylaş', html);
    }
}
