import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, BookOpen, Award, Mic, Star, CheckCircle2, Share2, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import type { Expert } from '../types';
import LoadingSpinner from '../components/common/LoadingSpinner';
import GradientText from '../components/common/GradientText';
export default function ExpertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        if (!id) return;
        const res = await api.experts.getById(id);
        if (res.success && res.data) {
          setExpert(res.data);
        }
      } catch (error) {
        console.error('Uzman detayı alınamadı:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpert();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-24">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted font-bold tracking-widest uppercase text-xs">Uzman Bilgileri Yükleniyor</p>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <div className="text-center">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Search size={40} />
             </div>
          <h1 className="text-3xl font-black text-heading mb-4">Uzman bulunamadı</h1>
          <button 
            onClick={() => navigate('/find-therapist')}
            className="btn-premium bg-primary text-white"
          >
            Aramaya Dön
          </button>
        </div>
      </div>
    );
  }

  const dayNames: Record<string, string> = {
    monday: 'Pazartesi', tuesday: 'Salı', wednesday: 'Çarşamba',
    thursday: 'Perşembe', friday: 'Cuma', saturday: 'Cumartesi', sunday: 'Pazar'
  };

  return (
    <div className="min-h-screen bg-white pb-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-slate-50/50 -z-10" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-sm font-black text-muted hover:text-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowLeft size={18} />
              </div>
              Geri Dön
            </button>
            <div className="flex gap-3">
                <button className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-muted hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
                    <Share2 size={18} />
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT COLUMN - Profile & Action */}
          <div className="lg:col-span-5">
            <div className="spotlight-static premium-card p-6 sm:p-7 sticky top-32 overflow-hidden border-none shadow-xl rounded-2xl lg:rounded-3xl">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6 group">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 bg-slate-100 flex items-center justify-center">
                            {expert.profilePhotoUrl ? (
                                <img
                                src={expert.profilePhotoUrl}
                                alt={`${expert.user?.firstName} ${expert.user?.lastName}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <span className="text-6xl font-black text-primary">
                                {expert.user?.firstName?.charAt(0)}
                                </span>
                            )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white shadow-md z-20">
                            <CheckCircle2 size={20} />
                        </div>
                    </div>

                    <div className="mb-6">
                        <GradientText className="text-2xl md:text-3xl font-black mb-2 tracking-tight">
                            {expert.user?.firstName} {expert.user?.lastName}
                        </GradientText>
                        <p className="text-lg font-bold text-primary italic">{expert.title?.name || 'Uzman Klinik Psikolog'}</p>
                    </div>

                    <div className="flex items-center justify-center gap-5 py-5 border-y border-slate-100 w-full mb-6">
                        <div className="text-center">
                            <p className="text-xs font-black text-muted uppercase tracking-widest mb-1">Puan</p>
                            <div className="flex items-center gap-1 text-amber-500 font-black text-lg justify-center">
                                <Star size={16} fill="currentColor" /> 5.0
                            </div>
                        </div>
                        <div className="w-px h-10 bg-slate-100" />
                        <div className="text-center">
                            <p className="text-xs font-black text-muted uppercase tracking-widest mb-1">Seans</p>
                            <p className="text-lg font-black text-heading">50 dk</p>
                        </div>
                        <div className="w-px h-10 bg-slate-100" />
                        <div className="text-center">
                            <p className="text-xs font-black text-muted uppercase tracking-widest mb-1">Ücret</p>
                            <p className="text-lg font-black text-emerald-600 tracking-tighter">₺{expert.price || '-'}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/user/dashboard')}
                        className="btn-premium bg-primary text-white w-full py-4 text-base hover:scale-[1.02] shadow-lg shadow-primary/25"
                    >
                        <Calendar size={20} />
                        Randevu Oluştur
                    </button>
                    <p className="mt-4 text-xs font-bold text-muted flex items-center justify-center gap-2">
                        <ShieldCheck size={14} />
                        Güvenli Ödeme & Gizlilik Garantisi
                    </p>
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* About Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-black text-heading tracking-tight">Hakkında</h2>
              </div>
              <p className="text-lg text-muted leading-relaxed font-medium">
                {expert.bio || "Uzman henüz biyografisini eklememiş. Detaylı bilgi için randevu oluşturabilirsiniz."}
              </p>
            </div>

            {/* Specialties & Approaches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="glass-card p-5 sm:p-6 rounded-2xl border-slate-100 shadow-lg">
                    <h3 className="text-base font-black text-heading mb-4 flex items-center gap-2">
                        <Award size={20} className="text-primary" />
                        Uzmanlık Alanları
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {expert.specialties && expert.specialties.length > 0 ? (
                            expert.specialties.map((spec, i) => (
                                <span key={i} className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black border border-primary/15">
                                    {spec.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm italic text-muted">Belirtilmemiş</span>
                        )}
                    </div>
                </div>
                <div className="glass-card p-5 sm:p-6 rounded-2xl border-slate-100 shadow-lg">
                    <h3 className="text-base font-black text-heading mb-4 flex items-center gap-2">
                        <Award size={20} className="text-primary" />
                        Terapi Ekolleri
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {expert.therapeuticApproaches && expert.therapeuticApproaches.length > 0 ? (
                            expert.therapeuticApproaches.map((app, i) => (
                                <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-black border border-primary/15">
                                    {app.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm italic text-muted">Belirtilmemiş</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Working Hours */}
            <div className="glass-card p-5 sm:p-6 rounded-2xl border-slate-100 shadow-lg">
              <h2 className="text-lg font-black text-heading mb-5 flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                Müsaitlik Durumu
              </h2>
              {expert.workingHours && typeof expert.workingHours === 'object' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(expert.workingHours).map(([day, slots]) => {
                    if (!Array.isArray(slots) || slots.length === 0) return null;
                    return (
                      <div key={day} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="block text-[10px] font-black text-muted uppercase tracking-widest mb-3">
                          {dayNames[day] || day}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(slots as any[]).map((slot, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-white text-heading text-xs font-bold rounded-lg shadow-sm border border-slate-200">
                              {slot.start || slot.time}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center py-8 text-muted font-medium italic">Sistem üzerinde henüz bir program bulunmamaktadır.</p>
              )}
            </div>

            {/* Education & Experience Details */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                <h3 className="text-xl font-black mb-8 flex items-center gap-2 relative z-10">
                    <Mic size={22} className="text-orange-500" />
                    Eğitim & Kariyer
                </h3>
                <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-start pb-4 border-b border-white/10">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Üniversite</span>
                        <span className="text-lg font-bold text-right max-w-[70%]">{expert.university || "-"}</span>
                    </div>
                    <div className="flex justify-between items-start pb-4 border-b border-white/10">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Bölüm</span>
                        <span className="text-lg font-bold">{expert.fieldOfStudy || "-"}</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Deneyim</span>
                        <span className="text-xl font-black text-emerald-400">{expert.yearsOfExperience || "0"} Yıl+</span>
                    </div>
                </div>
            </div>

            {/* Seminars */}
            {expert.seminars && expert.seminars.length > 0 && (
                <div>
                   <h2 className="text-2xl font-black text-heading mb-6 flex items-center gap-3">
                        <Mic size={24} className="text-orange-500" />
                        Konferans & Seminerler
                    </h2>
                    <div className="space-y-4">
                        {expert.seminars.map((seminar, idx) => (
                            <div key={idx} className="flex gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Star size={24} className="text-orange-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-heading mb-1">{seminar.title}</h4>
                                    <p className="text-sm text-muted font-medium mb-3">{seminar.description}</p>
                                    <span className="text-xs font-black text-primary uppercase tracking-widest">
                                        {seminar.date
                                            ? new Date(seminar.date).toLocaleDateString('tr-TR', {
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                              })
                                            : '—'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icons missing in lucide-react imports above
function Search({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
    );
}