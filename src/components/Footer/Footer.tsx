import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="font-nunito w-full bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Left Side - Logo/Brand Text */}
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            <Link to="/" className="text-2xl font-bold" style={{ color: '#3C486B' }}>
              Benimle Paylaş
            </Link>
            <p className="text-sm" style={{ color: '#3C486B', opacity: 0.7 }}>
              Online Psikolojik Danışmanlık Platformu
            </p>
          </div>

          {/* Center - Navigation Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-3" style={{ color: '#3C486B' }}>Hızlı Linkler</h4>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                to="/about"
                className="transition-colors hover:opacity-70"
                style={{ color: '#3C486B' }}
              >
                Hakkımızda
              </Link>
              <Link
                to="/services"
                className="transition-colors hover:opacity-70"
                style={{ color: '#3C486B' }}
              >
                Hizmetler
              </Link>
              <Link
                to="/contact"
                className="transition-colors hover:opacity-70"
                style={{ color: '#3C486B' }}
              >
                İletişim
              </Link>
              <Link
                to="/privacy-policy"
                className="transition-colors hover:opacity-70"
                style={{ color: '#3C486B' }}
              >
                Gizlilik Politikası
              </Link>
              <Link
                to="/terms-of-use"
                className="transition-colors hover:opacity-70"
                style={{ color: '#3C486B' }}
              >
                Kullanım Koşulları
              </Link>
              <Link
                to="/faq"
                className="transition-colors hover:opacity-70"
                style={{ color: '#3C486B' }}
              >
                SSS
              </Link>
            </div>
          </div>

          {/* Right Side - Social Icons */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <h4 className="font-semibold" style={{ color: '#3C486B' }}>Bizi Takip Edin</h4>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: '#3C486B' }}
              >
                <Facebook size={18} color="white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: '#3C486B' }}
              >
                <Twitter size={18} color="white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: '#3C486B' }}
              >
                <Instagram size={18} color="white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: '#3C486B' }}
              >
                <Linkedin size={18} color="white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: '#3C486B' }}
              >
                <Youtube size={18} color="white" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div
        className="w-full py-4 border-t"
        style={{ borderColor: '#e5e7eb' }}
      >
        <p className="text-center text-sm" style={{ color: '#3C486B' }}>
          © 2025 Benimle Paylaş. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
