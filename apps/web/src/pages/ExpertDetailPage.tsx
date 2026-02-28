import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, BookOpen, Award, Mic } from 'lucide-react';
import { api } from '../services/api';
import type { Expert } from '../types';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ExpertDetailPage() {
  const { id } = useParams<{ id: string }>();
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Uzman bulunamadı</h1>
          <Link to="/experts" className="text-blue-600 hover:underline">
            Uzmanlar sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  const dayNames: Record<string, string> = {
    monday: 'Pazartesi', tuesday: 'Salı', wednesday: 'Çarşamba',
    thursday: 'Perşembe', friday: 'Cuma', saturday: 'Cumartesi', sunday: 'Pazar'
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#f8fafc] font-nunito">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Geri Dön Butonu */}
        <Link
          to="/experts"
          className="inline-flex items-center mb-6 px-4 py-2 text-sm rounded-xl bg-white border border-gray-200 font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
        >
          <ArrowLeft size={16} className="mr-2" />
          Geri Dön
        </Link>

        {/* ─── ÜSTTE: 2 KOLON ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* KART 1 – Sol Üst: Profil Bilgisi */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
            {/* Profil Fotoğrafı */}
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-100 shadow-md mb-5 bg-gray-100 flex items-center justify-center">
              {expert.profilePhotoUrl ? (
                <img
                  src={expert.profilePhotoUrl}
                  alt={`${expert.user?.firstName || ''} ${expert.user?.lastName || ''}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
                  }}
                />
              ) : (
                <span className="text-5xl font-bold text-gray-300">
                  {expert.user?.firstName?.charAt(0) || 'U'}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
              {expert.user?.firstName} {expert.user?.lastName}
            </h1>

            {expert.title?.name && (
              <p className="text-base text-blue-600 font-semibold mb-4">{expert.title.name}</p>
            )}

            <div className="flex items-center gap-2 text-blue-600 font-bold mb-6 text-sm">
              <Clock size={16} />
              <span>50 Dakika</span>
              <span className="mx-1 text-gray-300">|</span>
              <span>{expert.price ? `₺${expert.price} / Seans` : 'Ücret Belirtilmemi'}</span>
            </div>

            <Link
              to="/user/dashboard"
              className="inline-flex items-center justify-center w-full max-w-[220px] rounded-xl py-3.5 font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ backgroundColor: '#13a4ec' }}
            >
              <Calendar size={18} className="mr-2" />
              Randevu Al
            </Link>
          </div>

          {/* KART 2 – Sağ Üst: Müsaitlik */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
              <MapPin size={18} className="text-blue-500" />
              Müsaitlik ve Çalışma Saatleri
            </h2>
            {expert.workingHours && Object.values(expert.workingHours).some(
              (s: any) => Array.isArray(s) && s.length > 0
            ) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(expert.workingHours).map(([day, slots]) => {
                  if (!Array.isArray(slots) || slots.length === 0) return null;
                  return (
                    <div key={day} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {dayNames[day] || day}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(slots as any[]).map((slot: any, idx: number) => (
                          <span key={idx} className="bg-white text-gray-700 text-xs font-bold px-2 py-1 rounded-lg shadow-sm border border-gray-200">
                            {slot.start} – {slot.end}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium text-sm">Henüz belirlenmiş çalışma saati yok.</p>
              </div>
            )}
          </div>
        </div>

        {/* ─── ORTA: 2 KOLON ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* KART 3 – Sol Orta: Hakkında */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
              <BookOpen size={18} className="text-indigo-500" />
              Hakkında
            </h2>
            {expert.bio ? (
              <p className="text-gray-600 leading-relaxed text-sm">{expert.bio}</p>
            ) : (
              <p className="text-gray-400 italic text-sm">Uzman henüz biyografi eklememiş.</p>
            )}
          </div>

          {/* KART 4 – Sağ Orta: Çalışma Ekolleri */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Award size={18} className="text-purple-500" />
              Çalışma Ekolleri
            </h2>
            <div className="flex flex-wrap gap-2">
              {expert.therapeuticApproaches && expert.therapeuticApproaches.length > 0 ? (
                expert.therapeuticApproaches.map((tApp, index) => (
                  <span
                    key={index}
                    className="bg-indigo-50 text-indigo-700 rounded-lg px-3 py-1.5 text-sm font-bold border border-indigo-100"
                  >
                    {tApp.name}
                  </span>
                ))
              ) : (
                <span className="text-sm font-medium text-gray-400 italic">Ekol belirtilmemiş.</span>
              )}
            </div>
          </div>
        </div>

        {/* ─── ALT: 2 KOLON ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* KART 5 – Alt Sol: Uzmanlık Alanları */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Award size={18} className="text-blue-500" />
              Uzmanlık Alanları
            </h2>
            <div className="flex flex-wrap gap-2">
              {expert.specialties && expert.specialties.length > 0 ? (
                expert.specialties.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 rounded-lg px-3 py-1.5 text-sm font-bold border border-blue-100"
                  >
                    {spec.name}
                  </span>
                ))
              ) : (
                <span className="text-sm font-medium text-gray-400 italic">Uzmanlık alanı belirtilmemiş.</span>
              )}
            </div>
          </div>

          {/* KART 6 – Alt Sağ: Kariyer & Detaylar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
              <BookOpen size={18} className="text-green-500" />
              Kariyer & Detaylar
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Deneyim</span>
                <span className="text-sm font-bold text-gray-900">
                  {expert.yearsOfExperience ? `${expert.yearsOfExperience} Yıl` : '-'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Eğitim</span>
                <span className="text-sm font-bold text-gray-900 text-right max-w-[60%]">
                  {expert.university || '-'}
                </span>
              </div>
              {expert.fieldOfStudy && (
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Bölüm</span>
                  <span className="text-sm font-bold text-gray-900">{expert.fieldOfStudy}</span>
                </div>
              )}
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Seans Süresi</span>
                <span className="text-sm font-bold text-gray-900">50 Dakika</span>
              </div>
            </div>
          </div>
        </div>

        {/* KART 7 – En Alt: Seminerler */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Mic size={18} className="text-orange-500" />
            Seminer ve Konferanslar
          </h2>
          {expert.seminars && expert.seminars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {expert.seminars.map((seminar, index) => (
                <div key={index} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{seminar.title}</h3>
                  {seminar.description && (
                    <p className="text-gray-500 text-xs mb-2 leading-relaxed">{seminar.description}</p>
                  )}
                  {seminar.date && (
                    <p className="text-blue-500 font-bold text-xs">
                      {new Date(seminar.date).toLocaleDateString('tr-TR', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic text-center py-4">
              Seminer veya konferans kaydı bulunmamaktadır.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}