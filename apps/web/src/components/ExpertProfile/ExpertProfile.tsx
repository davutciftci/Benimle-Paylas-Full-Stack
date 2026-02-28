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
    <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f6f7f8' }}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pt-28">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#1f2937' }}>
            Ekibimizle Tanışın
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#1f2937', opacity: 0.8 }}>
            ZihinSağlığı Kliniği'nde, her biri kendi alanında uzmanlaşmış, deneyimli ve özverili bir psikolog ekibiyle hizmet vermekteyiz.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : experts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Şu an sistemde kayıtlı aktif uzman bulunmuyor.
          </div>
        ) : (
          <div className="space-y-6 mb-10">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300"
                style={{ borderColor: '#e5e7eb' }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left Side - Profile Photo */}
                  <div className="md:w-48 lg:w-56 flex-shrink-0 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r" style={{ borderColor: '#e5e7eb' }}>
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-md bg-gray-100 flex items-center justify-center" style={{ borderColor: '#1f2937' }}>
                        {expert.profilePhotoUrl ? (
                          <img
                            src={expert.profilePhotoUrl}
                            alt={`${expert.user?.firstName}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl font-bold text-gray-400">
                            {expert.user?.firstName?.charAt(0) || 'U'}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link
                      to={`/expert/${expert.id}`}
                      className="mt-4 text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
                      style={{ color: '#13a4ec' }}
                    >
                      <Eye size={16} />
                      PROFİLİ GÖR
                    </Link>
                  </div>

                  {/* Right Side - Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Info Section */}
                      <div className="flex-1">
                        {/* Name */}
                        <h3 className="text-2xl font-bold mb-1" style={{ color: '#1f2937' }}>
                          {expert.user?.firstName} {expert.user?.lastName}
                        </h3>
                        {/* Title */}
                        {expert.title?.name && (
                          <p className="text-base mb-4" style={{ color: '#13a4ec' }}>
                            {expert.title.name}
                          </p>
                        )}

                        {/* Session Details */}
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm font-medium" style={{ color: '#1f2937' }}>
                          <span className="flex items-center gap-1.5">
                            <Clock size={16} style={{ color: '#1f2937' }} />
                            50 Dakika
                          </span>
                          <span className="flex items-center gap-1.5 text-blue-600">
                            Seans Ücreti: {expert.price ? `₺${expert.price}` : 'Belirtilmedi'}
                          </span>
                        </div>

                        {/* Specialties Tags */}
                        {expert.specialties && expert.specialties.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                             {expert.specialties.map(spec => (
                                <span
                                  key={spec.id}
                                  className="px-3 py-1 text-xs rounded-full"
                                  style={{
                                    backgroundColor: '#f6f7f8',
                                    color: '#1f2937',
                                    border: '1px solid #1f2937'
                                  }}
                                >
                                  {spec.name}
                                </span>
                             ))}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 lg:min-w-[140px]">
                        <Link
                          to={`/expert/${expert.id}`}
                          className="px-4 py-2 text-sm text-center rounded-lg font-medium transition-all border"
                          style={{
                            backgroundColor: 'transparent',
                            color: '#13a4ec',
                            borderColor: '#13a4ec'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#13a4ec';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#13a4ec';
                          }}
                        >
                          HEMEN GÖRÜŞ
                        </Link>
                        <Link
                          to={`/expert/${expert.id}`}
                          className="px-4 py-2 text-sm text-center rounded-lg font-medium transition-all border"
                          style={{
                            backgroundColor: '#13a4ec',
                            color: 'white',
                            borderColor: '#13a4ec'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#13a4ec';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#13a4ec';
                            e.currentTarget.style.color = 'white';
                          }}
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
