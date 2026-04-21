import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../common/utils';
import logoImg from '../../../img/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const getRoleString = () => typeof user?.role === 'string' ? user.role : (user?.role as any)?.name;

  const getDashboardLink = () => {
    const role = getRoleString()?.toLowerCase();
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'expert') return '/expert/dashboard';
    return '/user/dashboard';
  };

  const navLinks = [
    { name: 'Nasıl Çalışır', path: '/how-it-works' },
    { name: 'Uzmanlar', path: '/experts' },
    { name: 'Testler', path: '/psychological-tests' },
    { name: 'Blog', path: '/blog' },
  ];

  const isRoleSpecial = getRoleString()?.toLowerCase() === 'expert' || getRoleString()?.toLowerCase() === 'admin';

  return (
    <div className="fixed top-0 w-full z-50 px-4 pt-4 transition-all duration-500">
      <nav 
        className={cn(
          "max-w-7xl mx-auto rounded-3xl transition-all duration-500 overflow-hidden",
          scrolled || isOpen ? "glass-nav py-3 px-6 shadow-2xl" : "bg-transparent py-6 px-4"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          {!isRoleSpecial && (
            <Link to="/" className="flex items-center group gap-3" aria-label="Benimle Paylaş ana sayfa">
              <img
                src={logoImg}
                alt=""
                className="h-10 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
                width={120}
                height={40}
              />
              <span className="text-xl font-extrabold text-heading tracking-tighter">
                benimle{' '}
                <span className="font-black text-primary">paylaş</span>
              </span>
            </Link>
          )}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!isRoleSpecial && navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-bold text-muted hover:text-primary transition-colors relative group"
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all group-hover:w-full" />
              </Link>
            ))}

            {!isRoleSpecial && (
              <div className="h-6 w-px bg-slate-200 mx-2" />
            )}

            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-6 py-2.5 text-sm font-bold text-heading hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 text-sm font-bold bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                  Kayıt Ol
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to={getDashboardLink()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-xl hover:bg-black transition-all"
                >
                  <User size={16} />
                  Panelim
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-muted hover:text-red-500 rounded-xl hover:bg-red-50 transition-all"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-heading hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-500 ease-in-out overflow-hidden",
            isOpen ? "max-h-[500px] mt-6 pb-4 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col space-y-4">
            {!isRoleSpecial && navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-heading hover:text-primary py-2 border-b border-slate-100"
              >
                {link.name}
              </Link>
            ))}
            
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 text-center text-sm font-bold bg-slate-100 text-heading rounded-xl"
                >
                  Giriş
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 text-center text-sm font-bold bg-primary text-white rounded-xl shadow-lg"
                >
                  Kayıt
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full py-4 text-center text-red-500 font-bold border-t border-slate-100 mt-4"
              >
                Çıkış Yap
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
