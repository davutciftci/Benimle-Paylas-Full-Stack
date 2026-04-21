import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { registerSchema, type RegisterFormData } from '../../validations/authSchemas';
import LoadingSpinner from '../common/LoadingSpinner';
import { ZodError } from 'zod';
import { User, Mail, Lock, ArrowRight, Sparkles, ShieldCheck, ChevronLeft, CheckCircle2 } from 'lucide-react';
import GradientText from '../common/GradientText';
import { cn } from '../common/utils';

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function UserRegister() {
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const navigate = useNavigate();
    const { register, isLoading, error } = useAuthStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            const validatedData = registerSchema.parse(formData);
            const success = await register(
                validatedData.firstName,
                validatedData.lastName,
                validatedData.email,
                validatedData.password
            );

            if (success) {
                navigate('/');
            }
        } catch (err) {
            if (err instanceof ZodError) {
                const fieldErrors: FormErrors = {};
                err.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof FormErrors;
                    if (!fieldErrors[field]) {
                        fieldErrors[field] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute top-1/4 -left-24 w-80 h-80 bg-accent/5 blur-[100px] rounded-full" />
            
            <div className="w-full max-w-2xl relative z-10 py-12">
                {/* Back Button */}
                <button 
                  onClick={() => navigate('/')}
                  className="group flex items-center gap-2 text-xs font-black text-muted hover:text-primary transition-all mb-8 uppercase tracking-widest"
                >
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronLeft size={16} />
                  </div>
                  Anasayfaya Dön
                </button>

                <div className="spotlight-static premium-card p-10 md:p-16 rounded-[4rem] border-none shadow-2xl bg-white/80 backdrop-blur-xl">
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/10">
                            <Sparkles size={14} />
                            <span>Yolculuğa Başla</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-heading leading-tight mb-4 tracking-tighter">
                            Yeni Bir <GradientText className="inline-block">Hesap Oluştur.</GradientText>
                        </h1>
                        <p className="text-muted font-medium">
                            Zaten bir hesabınız var mı? {' '}
                            <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">
                                Oturum Aç
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600">
                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted uppercase tracking-widest ml-2">Adınız</label>
                                <div className="relative group">
                                    <User className={cn(
                                        "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                                        errors.firstName ? "text-rose-400" : "text-slate-300 group-focus-within:text-primary"
                                    )} size={20} />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Ad"
                                        disabled={isLoading}
                                        className={cn(
                                            "w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 transition-all outline-none font-bold text-heading text-sm",
                                            errors.firstName ? "border-rose-200 focus:border-rose-400" : "border-transparent focus:border-primary focus:bg-white"
                                        )}
                                    />
                                </div>
                                {errors.firstName && <p className="text-xs font-bold text-rose-500 ml-2">{errors.firstName}</p>}
                            </div>

                            {/* Last Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted uppercase tracking-widest ml-2">Soyadınız</label>
                                <div className="relative group">
                                    <User className={cn(
                                        "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                                        errors.lastName ? "text-rose-400" : "text-slate-300 group-focus-within:text-primary"
                                    )} size={20} />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Soyad"
                                        disabled={isLoading}
                                        className={cn(
                                            "w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 transition-all outline-none font-bold text-heading text-sm",
                                            errors.lastName ? "border-rose-200 focus:border-rose-400" : "border-transparent focus:border-primary focus:bg-white"
                                        )}
                                    />
                                </div>
                                {errors.lastName && <p className="text-xs font-bold text-rose-500 ml-2">{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-muted uppercase tracking-widest ml-2">Email Adresi</label>
                            <div className="relative group">
                                <Mail className={cn(
                                    "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                                    errors.email ? "text-rose-400" : "text-slate-300 group-focus-within:text-primary"
                                )} size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="ornek@mail.com"
                                    disabled={isLoading}
                                    className={cn(
                                        "w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 transition-all outline-none font-bold text-heading text-sm",
                                        errors.email ? "border-rose-200 focus:border-rose-400" : "border-transparent focus:border-primary focus:bg-white"
                                    )}
                                />
                            </div>
                            {errors.email && <p className="text-xs font-bold text-rose-500 ml-2">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted uppercase tracking-widest ml-2">Şifre</label>
                                <div className="relative group">
                                    <Lock className={cn(
                                        "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                                        errors.password ? "text-rose-400" : "text-slate-300 group-focus-within:text-primary"
                                    )} size={20} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        className={cn(
                                            "w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 transition-all outline-none font-bold text-heading text-sm",
                                            errors.password ? "border-rose-200 focus:border-rose-400" : "border-transparent focus:border-primary focus:bg-white"
                                        )}
                                    />
                                </div>
                                {errors.password && <p className="text-xs font-bold text-rose-500 ml-2">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted uppercase tracking-widest ml-2">Şifre Tekrar</label>
                                <div className="relative group">
                                    <Lock className={cn(
                                        "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                                        errors.confirmPassword ? "text-rose-400" : "text-slate-300 group-focus-within:text-primary"
                                    )} size={20} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        className={cn(
                                            "w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 transition-all outline-none font-bold text-heading text-sm",
                                            errors.confirmPassword ? "border-rose-200 focus:border-rose-400" : "border-transparent focus:border-primary focus:bg-white"
                                        )}
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-xs font-bold text-rose-500 ml-2">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-premium bg-slate-900 text-white py-5 shadow-2xl shadow-slate-900/10 hover:bg-primary transition-all mt-4"
                        >
                            {isLoading ? <LoadingSpinner size="sm" /> : (
                                <>
                                    Hesabımı Oluştur
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-6 text-center">
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
                                <CheckCircle2 size={14} />
                                Ücretsiz Kayıt
                            </div>
                            <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                                <ShieldCheck size={14} />
                                KVKK Uyumlu
                            </div>
                        </div>
                        <p className="text-[10px] text-muted font-bold leading-relaxed max-w-sm">
                            Kayıt olarak, <Link to="/terms" className="text-heading hover:underline">Hizmet Şartları</Link> ve <Link to="/privacy" className="text-heading hover:underline">Gizlilik Politikamızı</Link> kabul etmiş olursunuz.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
