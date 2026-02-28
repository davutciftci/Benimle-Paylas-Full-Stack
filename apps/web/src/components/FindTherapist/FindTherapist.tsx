import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useExpertStore } from '../../store/expertStore';
import LoadingSpinner from '../common/LoadingSpinner';

export default function FindTherapist() {
  const {
    experts,
    filters,
    pagination,
    isLoading,
    fetchExperts,
    setFilters,
    clearFilters,
  } = useExpertStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilters({ search: value });
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSpecialty(value);
    setFilters({ specialty: value ? [value] : [] });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);
    if (value) {
      setFilters({ price: parseInt(value) });
    } else {
      setFilters({ price: undefined });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSpecialty('');
    setPrice('');
    clearFilters();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchExperts(newPage);
    }
  };

  if (isLoading && experts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f6f7f8' }}>
        <div className="max-w-7xl mx-auto px-4 py-6 pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left Sidebar - Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                {/* Psikolog Adı */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold mb-3" style={{ color: '#1f2937' }}>
                    Psikolog Adı
                  </h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: '#1f2937', opacity: 0.6 }} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="İsim ile ara..."
                      className="w-full pl-10 pr-4 py-2 text-base border rounded outline-none focus:ring-2 focus:border-transparent"
                      style={{
                        color: '#1f2937',
                        borderColor: '#1f2937'
                      }}
                    />
                  </div>
                </div>

                {/* Uzmanlık Alanı */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold mb-3" style={{ color: '#1f2937' }}>
                    Uzmanlık Alanı
                  </h4>
                  <select
                    value={specialty}
                    onChange={handleSpecialtyChange}
                    className="w-full px-4 py-2 text-base border rounded outline-none focus:ring-2 cursor-pointer"
                    style={{
                      color: '#1f2937',
                      borderColor: '#1f2937',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">Tümü</option>
                    <option value="anksiyete">Anksiyete</option>
                    <option value="depresyon">Depresyon</option>
                    <option value="ilişki">İlişki Sorunları</option>
                    <option value="travma">Travma</option>
                    <option value="stres">Stres Yönetimi</option>
                    <option value="aile">Aile Terapisi</option>
                    <option value="çift">Çift Terapisi</option>
                    <option value="çocuk">Çocuk Psikolojisi</option>
                    <option value="ergen">Ergen Psikolojisi</option>
                  </select>
                </div>

                {/* Maksimum Fiyat */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold mb-3" style={{ color: '#1f2937' }}>
                    Maksimum Fiyat (₺)
                  </h4>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                        placeholder="Örn: 1500"
                        min="0"
                        className="w-full px-3 py-2 text-base border rounded outline-none focus:ring-2"
                        style={{
                          color: '#1f2937',
                          borderColor: '#1f2937'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Online Durumu */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold mb-3" style={{ color: '#1f2937' }}>
                    Müsaitlik
                  </h4>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded mr-2"
                      style={{ accentColor: '#1f2937' }}
                    />
                    <span style={{ color: '#1f2937' }}>Sadece Online Olanlar</span>
                  </label>
                </div>

                <button
                  onClick={handleClearFilters}
                  className="w-full py-2 text-sm rounded transition-all border-2 hover:bg-[#1f2937] hover:text-white"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#1f2937',
                    borderColor: '#1f2937'
                  }}
                >
                  Filtreleri Temizle
                </button>
              </div>
            </aside>

            {/* Right Content - Therapist List */}
            <main className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold" style={{ color: '#1f2937' }}>Terapist Bul</h1>
                <p style={{ color: '#1f2937', opacity: 0.8 }}>
                  {pagination.total} sonuç bulundu
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : experts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p style={{ color: '#1f2937', opacity: 0.7 }}>Sonuç bulunamadı</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {experts.map((therapist) => (
                      <div
                        key={therapist.id}
                        className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                      >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0" style={{ backgroundColor: '#f6f7f8' }}>
                          <img
                            src={therapist.profilePhotoUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                            alt={therapist.user?.firstName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          {/* Name */}
                          <h3 className="text-xl font-bold mb-1" style={{ color: '#1f2937' }}>
                            {therapist.user?.firstName} {therapist.user?.lastName}
                          </h3>
                          
                          {/* Title */}
                          {therapist.title?.name && (
                            <p className="text-sm font-medium mb-3" style={{ color: '#13a4ec' }}>
                              {therapist.title.name}
                            </p>
                          )}

                          {/* Session Details */}
                          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm font-medium" style={{ color: '#1f2937' }}>
                            <span className="flex items-center gap-1.5">
                              <Clock size={16} style={{ color: '#1f2937' }} />
                              50 Dakika
                            </span>
                            <span className="flex items-center gap-1.5 text-blue-600">
                              Seans Ücreti: {therapist.price ? `₺${therapist.price}` : 'Belirtilmedi'}
                            </span>
                          </div>

                          {/* Specialties Tags */}
                          {therapist.specialties && therapist.specialties.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                               {therapist.specialties.map(spec => (
                                  <span
                                    key={spec.id}
                                    className="px-2.5 py-1 text-xs rounded-full"
                                    style={{
                                      backgroundColor: '#f8fafc',
                                      color: '#1f2937',
                                      border: '1px solid #e5e7eb'
                                    }}
                                  >
                                    {spec.name}
                                  </span>
                               ))}
                            </div>
                          )}
                          <Link
                            to={`/expert/${therapist.id}`}
                            className="rounded px-4 py-1.5 text-sm font-medium transition-all border-2 inline-block"
                            style={{ backgroundColor: 'transparent', color: '#1f2937', borderColor: '#1f2937' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#1f2937';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#1f2937';
                            }}
                          >
                            Profili Gör
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ color: '#1f2937' }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 rounded text-base font-medium transition-all ${page === pagination.page
                            ? ''
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          style={
                            page === pagination.page
                              ? { backgroundColor: '#1f2937', color: '#f6f7f8' }
                              : { color: '#1f2937' }
                          }
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ color: '#1f2937' }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
