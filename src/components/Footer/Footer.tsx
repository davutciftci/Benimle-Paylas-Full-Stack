import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="text-primary font-nunito footer w-full bg-white relative bottom-0 py-4 px-4 border-t border-gray-200">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap justify-between items-center gap-3">
          <div className="flex flex-wrap gap-2 text-md">
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              Hakkımızda
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              İletişim
            </Link>
            <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link to="/terms-of-use" className="text-gray-600 hover:text-gray-900 transition-colors">
              Kullanım Koşulları
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
              SSS
            </Link>
          </div>
          <div className="text-md text-gray-600">
            © 2025 Benimle Paylaş. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </>
  )
}