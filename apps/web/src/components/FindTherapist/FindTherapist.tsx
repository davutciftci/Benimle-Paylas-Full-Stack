import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Clock, Star, MapPin, Award, Filter, X, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useExpertStore } from '../../store/expertStore';
import LoadingSpinner from '../common/LoadingSpinner';
import { cn } from '../common/utils';
import GradientText from '../common/GradientText';

export default function FindTherapist() {
  const navigate = useNavigate();
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-slate-50/50 -z-10" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-black uppercase tracking-widest mb-6 border border-primary/10">
                    <Sparkles size={16} />
                    <span>Hayatınıza Değer Katın</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-heading leading-[1.1] tracking-tighter">
                   Doğru <GradientText className="inline-block">Uzmanla</GradientText> <br />
                   Eşleşin.
                </h1>
            </div>
            <div className="flex items-center gap-6 bg-slate-50 px-8 py-5 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20">
                <div className="text-center">
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Toplam Uzman</p>
                    <p className="text-2xl font-black text-heading">{pagination.total}</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="text-center">
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Ortalama Puan</p>
                    <div className="flex items-center gap-1 text-amber-500 font-black text-lg">
                        <Star size={16} fill="currentColor" /> 5.0
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* FILTER SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 glass-card p-10 rounded-[3rem] border-slate-100 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
                    <Filter size={24} className="text-primary" />
                    <h2 className="text-xl font-black text-heading tracking-tight">Filtrele</h2>
                </div>

                <div className="space-y-10 relative z-10">
                    {/* Search by Name */}
                    <div>
                        <label className="text-xs font-black text-muted uppercase tracking-[0.2em] mb-4 block">Uzman Adı</label>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Örn: Dr. Ali..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-heading"
                            />
                        </div>
                    </div>

                    {/* Specialty */}
                    <div>
                        <label className="text-xs font-black text-muted uppercase tracking-[0.2em] mb-4 block">Uzmanlık Alanı</label>
                        <div className="relative">
                            <select
                                value={specialty}
                                onChange={handleSpecialtyChange}
                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-heading appearance-none cursor-pointer"
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
                            <ChevronRight size={20} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Max Price */}
                    <div>
                        <label className="text-xs font-black text-muted uppercase tracking-[0.2em] mb-4 block">Maksimum Ücret</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={price}
                                onChange={handlePriceChange}
                                placeholder="Örn: 2000"
                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-heading"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold">₺</span>
                        </div>
                    </div>

                    <button
                        onClick={handleClearFilters}
                        className="w-full py-5 rounded-2xl border-2 border-slate-200 text-xs font-black uppercase tracking-widest text-muted hover:border-slate-900 hover:text-heading transition-all flex items-center justify-center gap-2"
                    >
                        <X size={16} />
                        Filtreleri Temizle
                    </button>
                    
                    <div className="pt-8 border-t border-slate-100 italic text-[11px] font-bold text-slate-400 leading-relaxed">
                        <ShieldCheck size={14} className="inline mr-1 text-emerald-500" />
                        Tüm uzmanlarımız lisanslı ve platform onaylıdır.
                    </div>
                </div>
            </div>
          </aside>

          {/* THERAPIST LIST */}
          <main className="lg:col-span-3">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[3rem] border-none shadow-inner">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-muted font-black tracking-widest uppercase text-xs">Uzmanlar Listeleniyor</p>
                </div>
            ) : experts.length === 0 ? (
                <div className="text-center py-32 glass-card rounded-[3rem] border-dashed">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-heading mb-2 lowercase tracking-tighter">Uzman Bulunamadı.</h3>
                    <p className="text-muted font-medium">Filtrelerinizi değiştirerek daha geniş bir arama yapabilirsiniz.</p>
                </div>
            ) : (
              <div className="space-y-12 mb-16">
                {experts.map((therapist) => (
                    <div
                        key={therapist.id}
                        className="relative premium-card p-0 overflow-hidden border-none shadow-2xl rounded-[3rem] group"
                    >
                        <div className="flex flex-col md:flex-row bg-white">
                            {/* Image Left */}
                            <div className="md:w-64 relative h-64 md:h-auto overflow-hidden bg-slate-100 flex-shrink-0">
                                <img
                                    src={therapist.profilePhotoUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                                    alt={therapist.user?.firstName}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-white text-[9px] font-black uppercase tracking-widest border border-white/10">
                                    Çevrimiçi
                                </div>
                            </div>
                            
                            {/* Content Right */}
                            <div className="flex-1 p-10 flex flex-col justify-center">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-black text-heading mb-1 tracking-tight group-hover:text-primary transition-colors">
                                            {therapist.user?.firstName} {therapist.user?.lastName}
                                        </h3>
                                        <p className="text-md font-bold text-primary italic mb-6">
                                            {therapist.title?.name || "Uzman Psikolog"}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-1 text-amber-500 font-bold mb-1">
                                            <Star size={16} fill="currentColor" />
                                            <span>5.0</span>
                                        </div>
                                        <span className="text-[10px] font-black text-muted uppercase tracking-widest">+120 Danışan</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 py-6 border-y border-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100">
                                            <Clock size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-muted uppercase tracking-widest">Süre</span>
                                            <span className="text-xs font-bold text-heading">50 Dakika</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-emerald-500 border border-slate-100">
                                            <Award size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-muted uppercase tracking-widest">Ücret</span>
                                            <span className="text-xs font-bold text-heading uppercase tracking-tighter">₺{therapist.price || "---"}</span>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100">
                                            <MapPin size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-muted uppercase tracking-widest">Konum</span>
                                            <span className="text-xs font-bold text-heading">Online</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Specialties */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {therapist.specialties && therapist.specialties.slice(0, 4).map(spec => (
                                        <span key={spec.id} className="px-3 py-1 bg-slate-50 text-[10px] font-black text-muted uppercase tracking-widest rounded-lg border border-slate-100 hover:border-primary/30 transition-colors">
                                            {spec.name}
                                        </span>
                                    ))}
                                    {therapist.specialties && therapist.specialties.length > 4 && (
                                        <span className="px-3 py-1 text-[10px] font-black text-primary uppercase tracking-widest">+{therapist.specialties.length - 4} Daha</span>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                    <button
                                        onClick={() => navigate(`/expert/${therapist.id}`)}
                                        className="flex-1 btn-premium bg-slate-900 text-white w-full sm:w-auto"
                                    >
                                        Profili İncele
                                        <ArrowRight size={18} />
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/user/dashboard`)}
                                        className="flex-1 btn-premium bg-primary text-white w-full sm:w-auto shadow-xl shadow-primary/20"
                                    >
                                        Randevu Al
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
            )}

            {/* Pagination Chic */}
            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-20">
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-all disabled:opacity-20 shadow-lg"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={cn(
                                    "w-10 h-10 rounded-xl text-sm font-black transition-all",
                                    page === pagination.page
                                        ? "bg-slate-900 text-white shadow-xl"
                                        : "hover:bg-white text-muted"
                                )}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-all disabled:opacity-20 shadow-lg"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
