import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Expert } from '../../types';
import TiltedCard from '../common/TiltedCard';
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
                <TiltedCard 
                  className="h-full min-h-[500px] flex flex-col lg:flex-row p-0 overflow-hidden group border-none shadow-2xl"
                  containerClassName="h-full"
                >
                  <div className="lg:w-1/2 relative overflow-hidden h-full min-h-[300px]">
                    <img
                      src={experts[0].profilePhotoUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                      alt={experts[0].user?.firstName}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-bold flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Şu an Müsait
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-10 flex flex-col justify-center bg-white">
                    <div className="flex items-center gap-1 mb-4 text-amber-500">
                      <Star size={20} fill="currentColor" />
                      <span className="font-black text-heading text-lg ml-1">5.0</span>
                    </div>
                    <h3 className="text-3xl font-black text-heading mb-2 leading-tight">
                        {experts[0].user?.firstName} {experts[0].user?.lastName}
                    </h3>
                    <p className="text-primary font-bold mb-6 flex items-center gap-2">
                        <Award size={18} />
                        {experts[0].title?.name || 'Kıdemli Psikolog'}
                    </p>
                    <p className="text-muted leading-relaxed mb-8 line-clamp-4 font-medium">
                        {experts[0].bio || 'Alanında uzman terapistimiz ile hayatınızdaki zorlukları birlikte aşabiliriz.'}
                    </p>
                    <div className="flex items-center gap-6 mb-8 text-sm font-bold text-muted">
                        <div className="flex items-center gap-2"><MapPin size={16} /> İstanbul / Online</div>
                        <div className="flex items-center gap-2"><Users size={16} /> +150 Danışan</div>
                    </div>
                    <button className="btn-premium bg-primary text-white w-full hover:shadow-xl hover:shadow-primary/30">
                        Randevu Takvimini Gör
                    </button>
                  </div>
                </TiltedCard>
              )}
            </div>

            {/* Sub Cards Grid */}
            <div className="md:col-span-3 lg:col-span-2 grid grid-cols-1 gap-8">
              {experts.slice(1, 4).map((expert, idx) => (
                <TiltedCard 
                  key={expert.id} 
                  className={cn(
                    "p-6 flex items-center gap-6 border-none shadow-xl",
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
                    <p className={cn("text-sm font-bold truncate mb-3", idx % 2 === 0 ? "text-primary" : "text-blue-400")}>
                        {expert.title?.name || 'Psikolog'}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted">
                        <Star size={12} fill="currentColor" className="text-amber-500" />
                        <span>5.0</span>
                    </div>
                  </div>
                </TiltedCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}