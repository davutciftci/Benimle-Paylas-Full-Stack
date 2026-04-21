import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Expert } from '../../types';
import { Star, ShieldCheck, MapPin, Award, Users } from 'lucide-react';
import { cn } from '../common/utils';

export default function Carousel() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await api.experts.getAll();
        if (response.success && response.data) {
          const validExperts = response.data.data.filter((e: Expert) => e.user?.firstName);
          setExperts(validExperts.slice(0, 5)); // Asimetrik 5'li layout
        }
      } catch (error) {
        console.error("Uzmanlar yüklenemedi", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperts();
  }, []);

  if (isLoading) {
    return (
      <div className="py-32 bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6"></div>
        <p className="text-muted font-bold tracking-widest uppercase text-xs">Uzmanlar Hazırlanıyor</p>
      </div>
    );
  }

  return (
    <section className="py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">
              <Award size={16} />
              <span>Seçkin Uzman Kadromuz</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-heading leading-tight tracking-tighter">
              Size En Uygun <span className="text-primary italic">Yol Arkadaşını</span> Seçin.
            </h2>
          </div>
          <button className="btn-premium bg-white border-2 border-slate-200 text-heading hover:border-primary hover:text-primary transition-all self-start">
            Tüm Uzmanları Keşfet
          </button>
        </div>

        {experts.length === 0 ? (
          <div className="py-20 text-center glass-card rounded-[3rem] border-dashed">
            Henüz uzman kaydı bulunmamaktadır.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {/* Featured Large Card - Asimetrik Grid */}
            <div className="md:col-span-3 lg:col-span-4">
              {experts[0] && (
                <div className="relative premium-card h-full min-h-[500px] flex flex-col lg:flex-row p-0 overflow-hidden group border-none shadow-2xl">
                  <div className="lg:w-[45%] bg-slate-100/50 flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full" />
                    
                    <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.03]">
                      <img
                        src={experts[0].profilePhotoUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                        alt={experts[0].user?.firstName}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      {/* Status Badge - Now more subtle and integrated */}
                      <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-black text-heading uppercase tracking-widest">Müsait</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-10 md:p-14 flex flex-col justify-center bg-white relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -z-10" />
                    
                    <div className="flex items-center gap-1 mb-6 text-amber-500">
                      <Star size={18} fill="currentColor" />
                      <span className="font-black text-heading text-lg ml-1">5.0</span>
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest ml-3 pt-1">İncelemeler (120+)</span>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-black text-heading mb-3 tracking-tighter">
                        {experts[0].user?.firstName} {experts[0].user?.lastName}
                    </h3>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-2xl text-sm font-black uppercase tracking-widest mb-8 border border-primary/10 w-fit">
                        <Award size={18} />
                        {experts[0].title?.name || 'Kıdemli Psikolog'}
                    </div>

                    <p className="text-muted leading-relaxed mb-10 line-clamp-3 font-medium text-lg">
                        {experts[0].bio || 'Alanında uzman terapistimiz ile hayatınızdaki zorlukları birlikte aşabiliriz.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-8 mb-10 text-xs font-black text-muted uppercase tracking-[0.15em]">
                        <div className="flex items-center gap-2"><MapPin size={18} className="text-slate-300" /> İstanbul / Online</div>
                        <div className="flex items-center gap-2"><Users size={18} className="text-slate-300" /> +150 Danışan</div>
                    </div>

                    <button className="btn-premium bg-slate-900 text-white w-full py-5 shadow-2xl shadow-slate-900/10 hover:bg-primary transition-all">
                        Randevu Takvimini Gör
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sub Cards Grid */}
            <div className="md:col-span-3 lg:col-span-2 grid grid-cols-1 gap-8">
              {experts.slice(1, 4).map((expert, idx) => (
                <div
                  key={expert.id}
                  className={cn(
                    "relative premium-card p-6 flex items-center gap-6 border-none shadow-xl",
                    idx % 2 === 0 ? "bg-white" : "bg-slate-900 text-white"
                  )}
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-slate-100 shadow-lg">
                    <img
                      src={expert.profilePhotoUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                      alt={expert.user?.firstName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={cn("text-lg font-black truncate", idx % 2 === 0 ? "text-heading" : "text-white")}>
                        {expert.user?.firstName} {expert.user?.lastName}
                    </h4>
                    <p className={cn("text-sm font-bold truncate mb-3", idx % 2 === 0 ? "text-primary" : "text-sky-300")}>
                        {expert.title?.name || 'Psikolog'}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted">
                        <Star size={12} fill="currentColor" className="text-amber-500" />
                        <span>5.0</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}