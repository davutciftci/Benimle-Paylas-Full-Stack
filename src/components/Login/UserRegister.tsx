import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { registerSchema, type RegisterFormData } from '../../validations/authSchemas';
import LoadingSpinner from '../common/LoadingSpinner';
import { ZodError } from 'zod';

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function UserRegister() {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
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
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            // Validate form data with Zod
            const validatedData = registerSchema.parse(formData);

            // Register user
            const success = await register(
                validatedData.name,
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
        <div className="font-nunito min-h-screen flex items-center justify-center py-8 px-4" style={{ backgroundColor: '#f6f7f8' }}>
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-6 text-center">
                    <Link to="/" className="inline-flex items-center space-x-1.5">
                        <span className="text-3xl font-semibold" style={{ color: '#1f2937' }}>Benimle Paylaş</span>
                    </Link>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>
                        Hesap Oluşturun
                    </h1>
                    <p className="text-sm mb-6" style={{ color: '#1f2937', opacity: 0.8 }}>
                        Zaten hesabınız var mı?{' '}
                        <Link to="/login" className="underline" style={{ color: '#13a4ec' }}>
                            Giriş yapın
                        </Link>
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: '#1f2937' }}>
                                Ad Soyad
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Adınız Soyadınız"
                                className={`w-full px-3 py-2 text-sm border rounded outline-none ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                                style={{ color: '#1f2937' }}
                                disabled={isLoading}
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#1f2937' }}>
                                Email Adresi
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ornek@mail.com"
                                className={`w-full px-3 py-2 text-sm border rounded outline-none ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                                style={{ color: '#1f2937' }}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: '#1f2937' }}>
                                Şifre
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="En az 6 karakter"
                                className={`w-full px-3 py-2 text-sm border rounded outline-none ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                                style={{ color: '#1f2937' }}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1" style={{ color: '#1f2937' }}>
                                Şifre Tekrar
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Şifrenizi tekrar girin"
                                className={`w-full px-3 py-2 text-sm border rounded outline-none ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                                style={{ color: '#1f2937' }}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded py-2 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-2"
                            style={{ backgroundColor: 'transparent', color: '#1f2937', borderColor: '#1f2937' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#1f2937';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#1f2937';
                            }}
                        >
                            {isLoading ? <LoadingSpinner size="sm" /> : 'Kayıt Ol'}
                        </button>
                    </form>

                    <p className="text-xs mt-4 text-center" style={{ color: '#1f2937', opacity: 0.7 }}>
                        Kayıt olarak,{' '}
                        <Link to="/terms-of-use" className="underline" style={{ color: '#1f2937' }}>Hizmet Şartları</Link>
                        {' '}ve{' '}
                        <Link to="/privacy-policy" className="underline" style={{ color: '#1f2937' }}>Gizlilik Politikamızı</Link>
                        {' '}kabul etmiş olursunuz.
                    </p>

                    <div className="border-t border-gray-200 my-3"></div>
                </div>
            </div>
        </div>
    );
}
