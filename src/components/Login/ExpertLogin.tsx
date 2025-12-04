import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LiaSignLanguageSolid } from "react-icons/lia";

export default function ExpertLogin() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <div className="font-nunito min-h-screen bg-white flex items-center justify-center py-6 px-4">
        <div className="w-full max-w-xs">
          {/* Logo */}
          <div className="mb-4 text-center">
            <Link to="/" className="inline-flex items-center space-x-1.5">
              <span className="text-base font-medium" style={{ color: '#00435a' }}>Benimle Paylaş</span>
            </Link>
          </div>

          {/* Başlık */}
          <div className="text-center mb-4">
            <h1 className="text-lg font-bold mb-1.5" style={{ color: '#00435a' }}>
              Uzman Giriş Paneli
            </h1>
            <p className="text-xs" style={{ color: '#00435a', opacity: 0.8 }}>
              Hesabınıza erişim sağlayın veya yeni bir hesap oluşturun.
            </p>
          </div>

          {/* Giriş Kartı */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <form className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-[10px] font-medium mb-1" style={{ color: '#00435a' }}>
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="E-posta adresinizi girin"
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded outline-none"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-[10px] font-medium mb-1" style={{ color: '#00435a' }}>
                  Parola
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Parolanızı girin"
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-1"
                  />
                  <span className="text-[10px]" style={{ color: '#00435a' }}>Beni hatırla</span>
                </label>
                <a href="#" className="text-[10px] hover:underline" style={{ color: '#00435a' }}>
                  Parolanızı mı unuttunuz?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded py-1.5 text-xs font-medium hover:opacity-90 transition-all"
                style={{ backgroundColor: '#00435a', color: '#f4f4f4' }}
              >
                Giriş Yap
              </button>
            </form>

            <div className="mt-3 text-center">
              <p className="text-xs" style={{ color: '#00435a', opacity: 0.8 }}>
                Hesabınız yok mu?{' '}
                <Link to="/expert-login" className="font-medium hover:underline" style={{ color: '#00435a' }}>
                  Kaydolun
                </Link>
              </p>
            </div>
          </div>

          {/* İşaret Dili Desteği */}
          <div className="mt-3">
            <button className="w-full bg-white border rounded py-1.5 text-xs flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors" style={{ borderColor: '#00435a', color: '#00435a' }}>
              <LiaSignLanguageSolid className="text-base" />
              <span className="font-medium">İşaret Dili Desteği</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs" style={{ color: '#00435a', opacity: 0.7 }}>
            © 2024 Mindful Care. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </>
  )
}
