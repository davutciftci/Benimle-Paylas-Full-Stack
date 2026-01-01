import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="font-nunito w-full bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* Left Side - Logo/Brand Text */}
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <Link to="/" className="text-xl font-semibold text-gray-900">
              Benimle Paylaş
            </Link>
            <p className="text-xs text-gray-500">
              Online Psikolojik Danışmanlık Platformu
            </p>
          </div>

          {/* Center - Navigation Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-2 text-sm text-gray-900">Hızlı Linkler</h4>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
              <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors">
                Hakkımızda
              </Link>
              <Link to="/services" className="text-gray-600 hover:text-blue-500 transition-colors">
                Hizmetler
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-colors">
                İletişim
              </Link>
              <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-500 transition-colors">
                Gizlilik Politikası
              </Link>
              <Link to="/terms-of-use" className="text-gray-600 hover:text-blue-500 transition-colors">
                Kullanım Koşulları
              </Link>
              <Link to="/faq" className="text-gray-600 hover:text-blue-500 transition-colors">
                SSS
              </Link>
            </div>
          </div>

          {/* Right Side - Social Icons */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <h4 className="font-semibold text-sm text-gray-900">Bizi Takip Edin</h4>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-blue-500 hover:bg-blue-600"
              >
                <Facebook size={16} color="white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-blue-500 hover:bg-blue-600"
              >
                <Twitter size={16} color="white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-blue-500 hover:bg-blue-600"
              >
                <Instagram size={16} color="white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-blue-500 hover:bg-blue-600"
              >
                <Linkedin size={16} color="white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-blue-500 hover:bg-blue-600"
              >
                <Youtube size={16} color="white" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="w-full py-3 border-t border-gray-100">
        <p className="text-center text-xs text-gray-500">
          © 2025 Benimle Paylaş. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
