import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="font-nunito w-full bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          {/* Left Side - Logo and Social Icons */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-2xl font-medium" style={{ color: '#00435a' }}>
              Benimle Paylaş
            </Link>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: '#00435a' }}
              >
                <Facebook size={20} color="white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: '#00435a' }}
              >
                <Twitter size={20} color="white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: '#00435a' }}
              >
                <Instagram size={20} color="white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: '#00435a' }}
              >
                <Linkedin size={20} color="white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: '#00435a' }}
              >
                <Youtube size={20} color="white" />
              </a>
            </div>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-base">
            <Link
              to="/about"
              className="transition-colors hover:opacity-70"
              style={{ color: '#00435a' }}
            >
              Hakkımızda
            </Link>
            <Link
              to="/services"
              className="transition-colors hover:opacity-70"
              style={{ color: '#00435a' }}
            >
              Hizmetler
            </Link>
            <Link
              to="/contact"
              className="transition-colors hover:opacity-70"
              style={{ color: '#00435a' }}
            >
              İletişim
            </Link>
            <Link
              to="/privacy-policy"
              className="transition-colors hover:opacity-70"
              style={{ color: '#00435a' }}
            >
              Gizlilik Politikası
            </Link>
            <Link
              to="/terms-of-use"
              className="transition-colors hover:opacity-70"
              style={{ color: '#00435a' }}
            >
              Kullanım Koşulları
            </Link>
            <Link
              to="/faq"
              className="transition-colors hover:opacity-70"
              style={{ color: '#00435a' }}
            >
              SSS
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div
        className="w-full py-4 border-t"
        style={{ borderColor: '#e5e7eb' }}
      >
        <p className="text-center text-sm" style={{ color: '#00435a' }}>
          © 2025 Benimle Paylaş. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
