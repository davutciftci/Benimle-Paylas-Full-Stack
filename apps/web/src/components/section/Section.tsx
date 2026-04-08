import React from 'react';
import SignText from '../SignLanguage/SignText';
import { useNavigate } from 'react-router-dom';
import GradientText from '../common/GradientText';
import { ArrowRight, Play, Sparkles, Heart } from 'lucide-react';

export default function Section() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 bg-white">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 hidden lg:block" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column: Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-bold mb-8 border border-primary/10">
              <Sparkles size={16} />
              <span>Zihinsel Sağlığınız İçin Modern Çözümler</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-heading leading-[1.1] mb-8 tracking-tighter">
              Birlikte Daha <br />
              <GradientText className="inline-block mt-2">
                Güçlüyüz.
              </GradientText>
            </h1>

            <p className="text-xl text-muted mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              <SignText>
                Lisanslı terapistlerimizle güvenli ve destekleyici bir ortamda zihinsel sağlık yolculuğunuza bugünden başlayın. Özgürce paylaşın, iyileşin.
              </SignText>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
              <button
                onClick={() => navigate('/find-therapist')}
                className="btn-premium bg-primary text-white w-full sm:w-auto shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95"
              >
                <SignText blockNavigation={true} onNavigate={() => navigate('/find-therapist')}>
                  Hemen Başla
                </SignText>
                <ArrowRight size={20} />
              </button>
              
              <button 
                onClick={() => navigate('/how-it-works')}
                className="group flex items-center gap-3 text-heading font-bold hover:text-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                  <Play size={18} className="fill-current ml-1" />
                </div>
                Nasıl Çalışır?
              </button>
            </div>

            {/* Stats/Trust Bar */}
            <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-slate-100 pt-10">
                <div>
                    <p className="text-2xl font-black text-heading">10k+</p>
                    <p className="text-xs font-bold text-muted uppercase tracking-widest">Mutlu Danışan</p>
                </div>
                <div className="w-px h-10 bg-slate-100 hidden sm:block" />
                <div>
                    <p className="text-2xl font-black text-heading">500+</p>
                    <p className="text-xs font-bold text-muted uppercase tracking-widest">Uzman Terapist</p>
                </div>
                <div className="w-px h-10 bg-slate-100 hidden sm:block" />
                <div>
                    <p className="text-2xl font-black text-heading">4.9/5</p>
                    <p className="text-xs font-bold text-muted uppercase tracking-widest">Kullanıcı Puanı</p>
                </div>
            </div>
          </div>

          {/* Right Column: Visual Element */}
          <div className="flex-1 relative hidden lg:block">
            <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 bg-slate-100 border-8 border-white">
                <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
                    alt="Therapy Session" 
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Floating floating elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent rounded-3xl -rotate-12 -z-10 shadow-xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 backdrop-blur-xl rounded-full border border-white/40 shadow-xl flex items-center justify-center">
                <Heart className="text-primary w-12 h-12" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}