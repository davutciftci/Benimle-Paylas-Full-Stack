import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { loginSchema, type LoginFormData } from '../../validations/authSchemas';
import LoadingSpinner from '../common/LoadingSpinner';
import { ZodError } from 'zod';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function UserLogin() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

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
      const validatedData = loginSchema.parse(formData);

      const success = await login(validatedData.email, validatedData.password);

      if (success) {
        // Role-based navigation
        const user = useAuthStore.getState().user;
        if (user?.role === 'expert') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
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
    <>
      <div className="font-nunito min-h-screen flex items-center justify-center py-8 px-4" style={{ backgroundColor: '#F0F0F0' }}>
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-6 text-center">
            <Link to="/" className="inline-flex items-center space-x-1.5">
              <span className="text-3xl font-semibold" style={{ color: '#3C486B' }}>Benimle Paylaş</span>
            </Link>
          </div>

          {/* Giriş Kartı */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#3C486B' }}>
              Hesabınıza Giriş Yapın
            </h1>
            <p className="text-sm mb-6" style={{ color: '#3C486B', opacity: 0.8 }}>
              Hesabınız yok mu?{' '}
              <Link to="/register" className="underline" style={{ color: '#F45050' }}>
                Kayıt olun
              </Link>
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Demo Credentials Info */}
            <div className="mb-4 p-3 rounded-md" style={{ backgroundColor: '#F0F0F0', border: `1px solid #3C486B` }}>
              <p className="text-xs" style={{ color: '#3C486B' }}>
                <strong>Demo:</strong> user@example.com / demo123 (Kullanıcı) veya expert@example.com / demo123 (Uzman)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#3C486B' }}>
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
                  style={{ color: '#3C486B' }}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: '#3C486B' }}>
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Şifrenizi girin"
                  className={`w-full px-3 py-2 text-sm border rounded outline-none ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                  style={{ color: '#3C486B' }}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded py-2 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-2"
                style={{ backgroundColor: 'transparent', color: '#3C486B', borderColor: '#3C486B' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3C486B';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#3C486B';
                }}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Giriş Yap'}
              </button>
            </form>

            <p className="text-xs mt-4 text-center" style={{ color: '#3C486B', opacity: 0.7 }}>
              Devam ederek,{' '}
              <Link to="/terms-of-use" className="underline" style={{ color: '#3C486B' }}>Hizmet Şartları</Link>
              {' '}ve{' '}
              <Link to="/privacy-policy" className="underline" style={{ color: '#3C486B' }}>Gizlilik Politikamızı</Link>
              {' '}kabul etmiş olursunuz.
            </p>

            <div className="border-t border-gray-200 my-3"></div>
          </div>
        </div>
      </div>
    </>
  )
}

