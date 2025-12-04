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
  const [priceRange, setPriceRange] = useState(2000);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilters({ search: value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange(value);
    setFilters({ maxPrice: value });
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
      <div className="font-nunito min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left Sidebar - Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="Terapist ara"
                      className="w-full pl-10 pr-4 py-2 text-base text-gray-700 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">
                    Seans Ücreti: ₺{priceRange}
                  </h4>
                  <input
                    type="range"
                    min="500"
                    max="2000"
                    step="100"
                    value={priceRange}
                    onChange={handlePriceChange}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full text-sm text-gray-600 hover:text-gray-900"
                >
                  Filtreleri Temizle
                </button>
              </div>
            </aside>

            {/* Right Content - Therapist List */}
            <main className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Terapist Bul</h1>
                <p className="text-gray-600">
                  {pagination.total} sonuç bulundu
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : experts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-500">Sonuç bulunamadı</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {experts.map((therapist) => (
                      <div
                        key={therapist.id}
                        className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                      >
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={therapist.image}
                            alt={therapist.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {therapist.name}
                          </h3>
                          <p className="text-base text-gray-600 mb-2">
                            {therapist.title} | {therapist.experience}
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            ₺{therapist.priceRange.min} - ₺{therapist.priceRange.max}
                          </p>
                          <Link
                            to={`/expert/${therapist.id}`}
                            className="bg-gradient-to-r from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800 text-white rounded px-4 py-1.5 text-sm font-medium transition-colors inline-block"
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
                      >
                        <ChevronLeft size={20} />
                      </button>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 rounded text-base font-medium transition-colors ${page === pagination.page
                            ? 'bg-gradient-to-r from-slate-500 to-slate-700 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
