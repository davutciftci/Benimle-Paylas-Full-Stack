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
              <span className="text-base font-medium text-gray-800">Benimle Paylaş</span>
            </Link>
          </div>

          {/* Başlık */}
          <div className="text-center mb-4">
            <h1 className="text-lg font-bold text-gray-900 mb-1.5">
              Uzman Giriş Paneli
            </h1>
            <p className="text-xs text-gray-600">
              Hesabınıza erişim sağlayın veya yeni bir hesap oluşturun.
            </p>
          </div>

          {/* Giriş Kartı */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <form className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-[10px] font-medium text-gray-700 mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="E-posta adresinizi girin"
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-[10px] font-medium text-gray-700 mb-1">
                  Parola
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Parolanızı girin"
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                  <span className="text-[10px] text-gray-700">Beni hatırla</span>
                </label>
                <a href="#" className="text-[10px] text-slate-600 hover:underline">
                  Parolanızı mı unuttunuz?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-slate-500 to-slate-700 text-white rounded py-1.5 text-xs font-medium hover:from-slate-600 hover:to-slate-800 transition-all"
              >
                Giriş Yap
              </button>
            </form>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-600">
                Hesabınız yok mu?{' '}
                <Link to="/expert-login" className="text-slate-600 font-medium hover:underline">
                  Kaydolun
                </Link>
              </p>
            </div>
          </div>

          {/* İşaret Dili Desteği */}
          <div className="mt-3">
            <button className="w-full bg-white border border-gray-300 text-gray-700 rounded py-1.5 text-xs flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors">
              <LiaSignLanguageSolid className="text-base" />
              <span className="font-medium">İşaret Dili Desteği</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-gray-500 text-xs">
            © 2024 Mindful Care. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </>
  )
}

