import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { Expert } from '../../types';
import { Star, ShieldCheck, MapPin, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../common/utils';

const PAGE_SIZE = 6;

export default function Carousel() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchExperts = async () => {
      setIsLoading(true);
      try {
        const response = await api.experts.getAll({}, page, PAGE_SIZE);
        if (!cancelled && response.success && response.data) {
          const validExperts = response.data.data.filter((e: Expert) => e.user?.firstName);
          setExperts(validExperts);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error('Uzmanlar yüklenemedi', error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchExperts();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const handlePageChange = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isLoading && experts.length === 0) {
    return (
      <div className="py-24 bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-muted font-bold tracking-widest uppercase text-xs">Uzmanlar Hazırlanıyor</p>
      </div>
    );
  }

  return (
    <section ref={sectionRef} id="home-experts" className="py-20 md:py-24 bg-slate-50 overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-3">
              <Award size={16} />
              <span>Seçkin Uzman Kadromuz</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-heading leading-tight tracking-tighter">
              Size En Uygun <span className="text-primary italic">Yol Arkadaşını</span> Seçin.
            </h2>
          </div>
          <Link
            to="/find-therapist"
            className="btn-premium bg-white border-2 border-slate-200 text-heading hover:border-primary hover:text-primary transition-all self-start text-sm py-3 px-6"
          >
            Tüm Uzmanları Keşfet
          </Link>
        </div>

        {experts.length === 0 ? (
          <div className="py-16 text-center glass-card rounded-2xl border border-dashed border-slate-200">
            Henüz uzman kaydı bulunmamaktadır.
          </div>
        ) : (
          <>
            <div
              className={cn(
                'grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-10',
                isLoading && 'opacity-60 pointer-events-none transition-opacity'
              )}
            >
              {experts.map((expert) => (
                <article
                  key={expert.id}
                  className="premium-card p-4 sm:p-5 flex flex-col sm:flex-row gap-4 rounded-2xl border border-slate-100 shadow-premium hover:shadow-lg hover:border-primary/15 transition-all group"
                >
                  <div className="relative shrink-0 flex justify-center sm:block">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 ring-2 ring-slate-100">
                        <img
                          src={
                            expert.profilePhotoUrl ||
                            'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                          }
                          alt={expert.user?.firstName}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-bottom-1 sm:right-0 px-2 py-0.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm border border-slate-100 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-[9px] font-black text-heading uppercase tracking-wider">Müsait</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
                        <Star size={16} fill="currentColor" className="shrink-0" />
                        <span className="font-black text-heading text-sm">5.0</span>
                        <span className="text-[10px] font-black text-muted uppercase tracking-widest pt-0.5">
                          İncelemeler (120+)
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-heading tracking-tight mb-2 group-hover:text-primary transition-colors">
                      {expert.user?.firstName} {expert.user?.lastName}
                    </h3>

                    <div className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-[11px] font-black uppercase tracking-widest mb-3 border border-primary/15 w-fit mx-auto sm:mx-0">
                      <Award size={14} className="shrink-0" />
                      {expert.title?.name || 'Kıdemli Psikolog'}
                    </div>

                    <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2 font-medium">
                      {expert.bio ||
                        'Alanında uzman terapistimiz ile hayatınızdaki zorlukları birlikte aşabiliriz.'}
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-[10px] font-black text-muted uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400 shrink-0" />
                        İstanbul / Online
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-slate-400 shrink-0" />
                        +150 Danışan
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/expert/${expert.id}`)}
                      className="btn-premium bg-primary text-white w-full py-3.5 text-sm rounded-xl shadow-lg shadow-primary/20 hover:brightness-95 mt-auto"
                    >
                      Randevu Takvimini Gör
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1 || isLoading}
                  className="w-11 h-11 rounded-xl bg-white border-2 border-slate-100 flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-all disabled:opacity-30 shadow-sm"
                  aria-label="Önceki sayfa"
                >
                  <ChevronLeft size={22} />
                </button>
                <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePageChange(p)}
                      disabled={isLoading}
                      className={cn(
                        'min-w-9 h-9 rounded-lg text-sm font-black transition-all',
                        p === page
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'text-muted hover:bg-slate-50'
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages || isLoading}
                  className="w-11 h-11 rounded-xl bg-white border-2 border-slate-100 flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-all disabled:opacity-30 shadow-sm"
                  aria-label="Sonraki sayfa"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            )}

            <p className="mt-8 text-center text-[11px] font-bold text-muted flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
              Tüm uzmanlarımız lisanslı ve platform onaylıdır.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
