import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Clock, Star, MapPin, Filter, X, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
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
  const availableNowFilter = filters.availableNow === true;

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

  const handleAvailableNowChange = (checked: boolean) => {
    setFilters({ availableNow: checked ? true : undefined });
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

                    {/* Available now */}
                    <div>
                        <label className="text-xs font-black text-muted uppercase tracking-[0.2em] mb-4 block">Müsaitlik</label>
                        <label className="flex items-center gap-3 cursor-pointer group rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3.5 hover:border-primary/30 transition-colors has-[:focus-visible]:border-primary">
                            <input
                                type="checkbox"
                                checked={availableNowFilter}
                                onChange={(e) => handleAvailableNowChange(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary focus:ring-offset-0"
                            />
                            <span className="text-sm font-bold text-heading group-hover:text-primary transition-colors">
                                Şu an müsait
                            </span>
                        </label>
                        <p className="mt-2 text-[11px] font-medium text-muted leading-snug">
                            Bugünkü çalışma saatlerinize göre, şu an randevu penceresinde olan uzmanlar.
                        </p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
                {experts.map((therapist) => (
                    <div
                        key={therapist.id}
                        className="premium-card p-4 sm:p-5 flex flex-col border border-slate-100 shadow-premium hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-2xl group"
                    >
                        <div className="flex gap-4">
                            <div className="relative shrink-0">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 ring-2 ring-slate-100">
                                    <img
                                        src={therapist.profilePhotoUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                                        alt={therapist.user?.firstName}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 px-2 py-0.5 bg-slate-900/90 backdrop-blur-sm rounded-full text-white text-[8px] font-black uppercase tracking-wide border border-white/20">
                                    Çevrimiçi
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <div className="min-w-0">
                                        <h3 className="text-lg sm:text-xl font-black text-heading tracking-tight truncate group-hover:text-primary transition-colors">
                                            {therapist.user?.firstName} {therapist.user?.lastName}
                                        </h3>
                                        <p className="text-sm font-bold text-primary italic line-clamp-2">
                                            {therapist.title?.name || "Uzman Psikolog"}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end shrink-0">
                                        <div className="flex items-center gap-0.5 text-amber-500 font-bold text-sm">
                                            <Star size={14} fill="currentColor" />
                                            <span>5.0</span>
                                        </div>
                                        <span className="text-[9px] font-black text-muted uppercase tracking-widest">+120 Danışan</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 py-3 mt-2 border-y border-slate-100">
                                    <div className="min-w-0">
                                        <span className="text-[8px] font-black text-muted uppercase tracking-widest block mb-0.5">Süre</span>
                                        <span className="text-[11px] font-bold text-heading flex items-center gap-1">
                                            <Clock size={12} className="text-primary shrink-0" />
                                            50 dk
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[8px] font-black text-muted uppercase tracking-widest block mb-0.5">Ücret</span>
                                        <span className="text-[11px] font-bold text-heading truncate">₺{therapist.price ?? "—"}</span>
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[8px] font-black text-muted uppercase tracking-widest block mb-0.5">Konum</span>
                                        <span className="text-[11px] font-bold text-heading flex items-center gap-1">
                                            <MapPin size={12} className="text-primary shrink-0" />
                                            Online
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                            {therapist.specialties && therapist.specialties.slice(0, 3).map((spec) => (
                                <span
                                    key={spec.id}
                                    className="px-2 py-0.5 bg-primary/10 text-[9px] font-black text-primary uppercase tracking-wider rounded-md border border-primary/15"
                                >
                                    {spec.name}
                                </span>
                            ))}
                            {therapist.specialties && therapist.specialties.length > 3 && (
                                <span className="px-2 py-0.5 text-[9px] font-black text-muted">+{therapist.specialties.length - 3}</span>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                            <button
                                type="button"
                                onClick={() => navigate(`/expert/${therapist.id}`)}
                                className="flex-1 btn-premium bg-slate-900 text-white py-3 text-sm rounded-xl"
                            >
                                Profili İncele
                                <ArrowRight size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(`/user/dashboard`)}
                                className="flex-1 btn-premium bg-primary text-white py-3 text-sm rounded-xl shadow-lg shadow-primary/20"
                            >
                                Randevu Al
                            </button>
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
