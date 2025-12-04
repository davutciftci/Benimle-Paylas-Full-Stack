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
      <div className="font-nunito min-h-screen bg-slate-50 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-4 text-center">
            <Link to="/" className="inline-flex items-center space-x-1.5">
              <span className="text-xl font-medium text-gray-800">Benimle Paylaş</span>
            </Link>
          </div>

          {/* Giriş Kartı */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Hesabınıza Giriş Yapın
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              veya yeni bir hesap oluşturun.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Demo Credentials Info */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-700">
                <strong>Demo:</strong> user@example.com (Kullanıcı) veya expert@example.com (Uzman)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className={`w-full px-3 py-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${emailError ? 'border-red-300' : 'border-gray-300'
                    }`}
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="mt-1 text-xs text-red-600">{emailError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-slate-500 to-slate-700 text-white rounded py-2 text-sm font-medium hover:from-slate-600 hover:to-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Devam Et'}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Devam ederek,{' '}
              <Link to="/terms-of-use" className="text-slate-600 underline">Hizmet Şartları</Link>
              {' '}ve{' '}
              <Link to="/privacy-policy" className="text-slate-600 underline">Gizlilik Politikamızı</Link>
              {' '}kabul etmiş olursunuz.
            </p>

            <div className="border-t border-gray-200 my-3"></div>
          </div>
        </div>
      </div>
    </>
  )
}

