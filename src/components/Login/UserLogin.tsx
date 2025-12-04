import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoadingSpinner from '../common/LoadingSpinner';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!email) {
      setEmailError('Email adresi gereklidir');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Geçerli bir email adresi girin');
      return;
    }

    // Demo: Use 'demo123' as password for any email
    const success = await login(email, 'demo123');

    if (success) {
      navigate('/');
    }
  };

  return (
    <>
      <div className="font-nunito min-h-screen flex items-center justify-center py-8 px-4" style={{ backgroundColor: '#f4f4f4' }}>
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-4 text-center">
            <Link to="/" className="inline-flex items-center space-x-1.5">
              <span className="text-xl font-medium" style={{ color: '#00435a' }}>Benimle Paylaş</span>
            </Link>
          </div>

          {/* Giriş Kartı */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#00435a' }}>
              Hesabınıza Giriş Yapın
            </h1>
            <p className="text-sm mb-6" style={{ color: '#00435a', opacity: 0.8 }}>
              veya yeni bir hesap oluşturun.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Demo Credentials Info */}
            <div className="mb-4 p-3 rounded-md" style={{ backgroundColor: '#f4f4f4', border: `1px solid #00435a` }}>
              <p className="text-xs" style={{ color: '#00435a' }}>
                <strong>Demo:</strong> user@example.com (Kullanıcı) veya expert@example.com (Uzman)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#00435a' }}>
                  Email Adresi
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="ornek@mail.com"
                  className={`w-full px-3 py-2 text-sm border rounded outline-none ${emailError ? 'border-red-300' : 'border-gray-300'
                    }`}
                  style={{
                    focusRingColor: '#00435a',
                  }}
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="mt-1 text-xs text-red-600">{emailError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded py-2 text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                style={{ backgroundColor: '#00435a', color: '#f4f4f4' }}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Devam Et'}
              </button>
            </form>

            <p className="text-xs mt-4 text-center" style={{ color: '#00435a', opacity: 0.7 }}>
              Devam ederek,{' '}
              <Link to="/terms-of-use" className="underline" style={{ color: '#00435a' }}>Hizmet Şartları</Link>
              {' '}ve{' '}
              <Link to="/privacy-policy" className="underline" style={{ color: '#00435a' }}>Gizlilik Politikamızı</Link>
              {' '}kabul etmiş olursunuz.
            </p>

            <div className="border-t border-gray-200 my-3"></div>
          </div>
        </div>
      </div>
    </>
  )
}
