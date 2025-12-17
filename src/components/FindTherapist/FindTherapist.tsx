import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

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

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
    if (value) {
      setFilters({ minPrice: parseInt(value) });
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
    if (value) {
      setFilters({ maxPrice: parseInt(value) });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSpecialty('');
    setMinPrice('');
    setMaxPrice('');
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
      <div className="font-nunito min-h-screen" style={{ backgroundColor: '#F0F0F0' }}>
        <div className="max-w-7xl mx-auto px-4 py-6 pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left Sidebar - Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                {/* Psikolog Adı */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold mb-3" style={{ color: '#3C486B' }}>
                    Psikolog Adı
                  </h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: '#3C486B', opacity: 0.6 }} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="İsim ile ara..."
                      className="w-full pl-10 pr-4 py-2 text-base border rounded outline-none focus:ring-2 focus:border-transparent"
                      style={{
                        color: '#3C486B',
                        borderColor: '#3C486B'
                      }}
                    />
                  </div>
                </div>

                {/* Uzmanlık Alanı */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold mb-3" style={{ color: '#3C486B' }}>
                    Uzmanlık Alanı
                  </h4>
                  <select
                    value={specialty}
                    onChange={handleSpecialtyChange}
                    className="w-full px-4 py-2 text-base border rounded outline-none focus:ring-2 cursor-pointer"
                    style={{
                      color: '#3C486B',
                      borderColor: '#3C486B',
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

                {/* Fiyat Aralığı */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold mb-3" style={{ color: '#3C486B' }}>
                    Fiyat Aralığı (₺)
                  </h4>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-sm mb-1 block" style={{ color: '#3C486B' }}>Min</label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        placeholder="500"
                        min="0"
                        className="w-full px-3 py-2 text-base border rounded outline-none focus:ring-2"
                        style={{
                          color: '#3C486B',
                          borderColor: '#3C486B'
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm mb-1 block" style={{ color: '#3C486B' }}>Max</label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        placeholder="2000"
                        min="0"
                        className="w-full px-3 py-2 text-base border rounded outline-none focus:ring-2"
                        style={{
                          color: '#3C486B',
                          borderColor: '#3C486B'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Online Durumu */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold mb-3" style={{ color: '#3C486B' }}>
                    Müsaitlik
                  </h4>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded mr-2"
                      style={{ accentColor: '#3C486B' }}
                    />
                    <span style={{ color: '#3C486B' }}>Sadece Online Olanlar</span>
                  </label>
                </div>

                <button
                  onClick={handleClearFilters}
                  className="w-full py-2 text-sm rounded transition-all border-2 hover:bg-[#3C486B] hover:text-white"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#3C486B',
                    borderColor: '#3C486B'
                  }}
                >
                  Filtreleri Temizle
                </button>
              </div>
            </aside>

            {/* Right Content - Therapist List */}
            <main className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold" style={{ color: '#3C486B' }}>Terapist Bul</h1>
                <p style={{ color: '#3C486B', opacity: 0.8 }}>
                  {pagination.total} sonuç bulundu
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : experts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p style={{ color: '#3C486B', opacity: 0.7 }}>Sonuç bulunamadı</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {experts.map((therapist) => (
                      <div
                        key={therapist.id}
                        className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                      >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0" style={{ backgroundColor: '#F0F0F0' }}>
                          <img
                            src={therapist.image}
                            alt={therapist.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1" style={{ color: '#3C486B' }}>
                            {therapist.name}
                          </h3>
                          <p className="text-base mb-2" style={{ color: '#3C486B', opacity: 0.8 }}>
                            {therapist.title} | {therapist.experience}
                          </p>
                          <p className="text-sm mb-2" style={{ color: '#3C486B', opacity: 0.7 }}>
                            ₺{therapist.priceRange.min} - ₺{therapist.priceRange.max}
                          </p>
                          <Link
                            to={`/expert/${therapist.id}`}
                            className="rounded px-4 py-1.5 text-sm font-medium transition-all border-2 inline-block"
                            style={{ backgroundColor: 'transparent', color: '#3C486B', borderColor: '#3C486B' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#3C486B';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#3C486B';
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
                        style={{ color: '#3C486B' }}
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
                              ? { backgroundColor: '#3C486B', color: '#F0F0F0' }
                              : { color: '#3C486B' }
                          }
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ color: '#3C486B' }}
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
