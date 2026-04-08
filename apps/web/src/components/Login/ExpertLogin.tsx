import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hand, Mail, Lock, ArrowRight, Sparkles, ShieldCheck, ChevronLeft, Briefcase } from 'lucide-react';
import GradientText from '../common/GradientText';
import SpotlightCard from '../common/SpotlightCard';
import { cn } from '../common/utils';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ExpertLogin() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulate login or handle real login here if needed
      setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-50/50 -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-accent/5 blur-[100px] rounded-full" />
      
      <div className="w-full max-w-xl relative z-10">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-xs font-black text-muted hover:text-primary transition-all mb-8 uppercase tracking-widest"
        >
          <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <ChevronLeft size={16} />
          </div>
          Anasayfaya Dön
        </button>

        <SpotlightCard className="p-12 md:p-16 rounded-[3.5rem] border-none shadow-2xl bg-white/80 backdrop-blur-xl">
          <div className="mb-12 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-xl">
                <Briefcase size={14} />
                <span>Uzman Paneli</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-heading leading-tight mb-4 tracking-tighter">
              Uzman Giriş <br />
              <GradientText className="inline-block">Portalı.</GradientText>
            </h1>
            <p className="text-muted font-medium">
              Henüz bir uzman hesabınız yok mu? {' '}
              <Link to="/psychologist-application" className="text-primary font-black hover:underline underline-offset-4">
                Başvuru Yap
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-muted uppercase tracking-widest ml-2">Kurumsal Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="uzman@benimlepaylas.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-heading"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-xs font-black text-muted uppercase tracking-widest">Şifre</label>
                <Link to="#" className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Şifremi Unuttum</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-heading"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-[10px] font-black text-muted uppercase tracking-widest group-hover:text-heading transition-colors">Beni hatırla</span>
                </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-premium bg-slate-900 text-white py-5 shadow-2xl shadow-slate-900/10 hover:bg-primary transition-all mt-4"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : (
                  <>
                    Paneli Aç
                    <ArrowRight size={20} />
                  </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
                <button className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:border-primary hover:text-primary transition-all">
                    <Hand size={18} className="text-primary" />
                    İşaret Dili Desteği
                </button>
                <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                   <ShieldCheck size={14} />
                   Güvenli Uzman Erişimi
                </div>
          </div>
        </SpotlightCard>
        
        <p className="mt-12 text-center text-[10px] font-black text-muted uppercase tracking-[0.3em]">
            © 2024 Benimle Paylaş • Profesyonel Uzman Portalı
        </p>
      </div>
    </div>
  );
}
