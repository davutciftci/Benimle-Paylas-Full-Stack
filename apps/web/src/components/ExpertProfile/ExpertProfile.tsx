import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import { api } from '../../services/api';
import type { Expert } from '../../types';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ExpertProfile() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await api.experts.getAll();
        if (res.success && res.data) {
          setExperts(res.data.data);
        }
      } catch (error) {
        console.error('Uzmanlar yüklenirken hata oluştu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperts();
  }, []);

  return (
    <div className="font-nunito min-h-screen">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-28 pb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-black uppercase tracking-widest mb-6 border border-primary/10">
            Ekibimiz
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-heading mb-3 tracking-tight">
            Ekibimizle Tanışın
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-muted font-medium">
            ZihinSağlığı Kliniği'nde, her biri kendi alanında uzmanlaşmış, deneyimli ve özverili bir psikolog ekibiyle hizmet vermekteyiz.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : experts.length === 0 ? (
          <div className="text-center py-20 text-muted font-medium">
            Şu an sistemde kayıtlı aktif uzman bulunmuyor.
          </div>
        ) : (
          <div className="space-y-5 mb-10">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="premium-card p-5 md:p-6 border border-slate-100 shadow-premium hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-44 lg:w-48 shrink-0 flex flex-col items-center justify-center pb-5 md:pb-0 border-b md:border-b-0 md:border-r border-slate-100">
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 flex items-center justify-center ring-2 ring-slate-100">
                        {expert.profilePhotoUrl ? (
                          <img
                            src={expert.profilePhotoUrl}
                            alt={`${expert.user?.firstName}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl font-black text-primary/40">
                            {expert.user?.firstName?.charAt(0) || 'U'}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link
                      to={`/expert/${expert.id}`}
                      className="mt-4 text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5 hover:underline underline-offset-4"
                    >
                      <Eye size={16} strokeWidth={2.5} />
                      Profili Gör
                    </Link>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl font-black text-heading mb-1 tracking-tight">
                          {expert.user?.firstName} {expert.user?.lastName}
                        </h3>
                        {expert.title?.name && (
                          <p className="text-base font-bold text-primary italic mb-4">
                            {expert.title.name}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4 text-sm font-bold text-muted">
                          <span className="flex items-center gap-1.5">
                            <Clock size={16} className="text-primary shrink-0" />
                            50 Dakika
                          </span>
                          <span className="text-heading">
                            Seans Ücreti:{' '}
                            <span className="text-primary">
                              {expert.price ? `₺${expert.price}` : 'Belirtilmedi'}
                            </span>
                          </span>
                        </div>

                        {expert.specialties && expert.specialties.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {expert.specialties.map((spec) => (
                              <span
                                key={spec.id}
                                className="px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-black border border-primary/15"
                              >
                                {spec.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:min-w-[160px] shrink-0">
                        <Link
                          to={`/expert/${expert.id}`}
                          className="btn-premium border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white py-3.5 text-sm shadow-sm transition-all text-center"
                        >
                          Hemen Görüş
                        </Link>
                        <Link
                          to={`/expert/${expert.id}`}
                          className="btn-premium bg-primary text-white py-3.5 text-sm shadow-lg shadow-primary/20 hover:brightness-95 text-center"
                        >
                          Randevu Al
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
