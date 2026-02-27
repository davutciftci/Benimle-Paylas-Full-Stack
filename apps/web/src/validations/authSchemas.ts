import { z } from 'zod';

// Login form validation schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email adresi gereklidir')
        .email('Geçerli bir email adresi girin'),
    password: z
        .string()
        .min(1, 'Şifre gereklidir')
        .min(6, 'Şifre en az 6 karakter olmalıdır'),
});

// Register form validation schema
export const registerSchema = z.object({
    firstName: z
        .string()
        .min(1, 'Adınız gereklidir')
        .min(2, 'Adınız en az 2 karakter olmalıdır'),
    lastName: z
        .string()
        .min(1, 'Soyadınız gereklidir')
        .min(2, 'Soyadınız en az 2 karakter olmalıdır'),
    email: z
        .string()
        .min(1, 'Email adresi gereklidir')
        .email('Geçerli bir email adresi girin'),
    password: z
        .string()
        .min(1, 'Şifre gereklidir')
        .min(6, 'Şifre en az 6 karakter olmalıdır')
        .regex(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
        .regex(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
        .regex(/[0-9]/, 'Şifre en az bir rakam içermelidir'),
    confirmPassword: z
        .string()
        .min(1, 'Şifre tekrarı gereklidir'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
});

// Types inferred from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
