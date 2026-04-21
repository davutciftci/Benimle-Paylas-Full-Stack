import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, ChevronRight } from 'lucide-react';
import logoImg from '../../../img/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Nasıl Çalışır', path: '/how-it-works' },
      { name: 'Uzmanlar', path: '/experts' },
      { name: 'Hizmetler', path: '/services' },
      { name: 'Testler', path: '/psychological-tests' },
    ],
    support: [
      { name: 'Sıkça Sorulan Sorular', path: '/faq' },
      { name: 'İletişim', path: '/contact' },
      { name: 'Yardım Merkezi', path: '/help' },
      { name: 'Blog', path: '/blog' },
    ],
    legal: [
      { name: 'Gizlilik Politikası', path: '/privacy-policy' },
      { name: 'Kullanım Koşulları', path: '/terms' },
      { name: 'KVKK Aydınlatma Metni', path: '/kvkk' },
      { name: 'Çerez Politikası', path: '/cookies' },
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, color: 'hover:bg-primary' },
    { name: 'Twitter', icon: Twitter, color: 'hover:bg-sky-500' },
    { name: 'Instagram', icon: Instagram, color: 'hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
    { name: 'Linkedin', icon: Linkedin, color: 'hover:bg-primary' },
    { name: 'Youtube', icon: Youtube, color: 'hover:bg-red-600' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Blur Background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center group gap-3 mb-8" aria-label="Benimle Paylaş ana sayfa">
              <img
                src={logoImg}
                alt=""
                className="h-11 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
                width={132}
                height={44}
              />
              <span className="text-2xl font-black text-white tracking-tighter">
                benimle <span className="text-primary">paylaş</span>
              </span>
            </Link>
            <p className="text-lg leading-relaxed mb-10 font-medium">
              Zihinsel sağlığınız bizim önceliğimiz. Lisanslı uzmanlarımızla dilediğiniz yerden, dilediğiniz zaman yanınızdayız.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon size={20} className="text-white group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Platform</h4>
              <ul className="space-y-4">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-primary transition-colors flex items-center group">
                      <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Destek</h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-primary transition-colors flex items-center group">
                      <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">İletişim</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-tighter mb-1">E-posta</p>
                    <a href="mailto:destek@benimlepaylas.com" className="hover:text-primary transition-colors font-medium">destek@benimlepaylas.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-tighter mb-1">Telefon</p>
                    <a href="tel:+902120000000" className="hover:text-primary transition-colors font-medium">+90 (212) 000 00 00</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-sm font-medium">
            © {currentYear}{' '}
            <span className="text-white font-bold tracking-tighter">
              benimle <span className="text-primary">paylaş</span>
            </span>{' '}
            — Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {footerLinks.legal.map((link) => (
              <Link key={link.name} to={link.path} className="text-xs font-bold hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
