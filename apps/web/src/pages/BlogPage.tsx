import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Sparkles, User, Tag, ChevronRight, BookOpen } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { cn } from '../components/common/utils';
import GradientText from '../components/common/GradientText';
import SpotlightCard from '../components/common/SpotlightCard';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    publishedAt: string;
    imageUrl?: string;
    slug: string;
}

const categories = ['Tümü', 'Anksiyete', 'Depresyon', 'İlişkiler', 'Stres', 'Çocuk Psikolojisi', 'Mindfulness', 'Uyku'];

export default function BlogPage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = React.useState('Tümü');
    const [searchTerm, setSearchTerm] = React.useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Not: Mevcut API rotası /api/blog?pageSize=50. 
                // Proxy ayarlarınıza göre '/api' veya 'http://localhost:3001/api' değişebilir.
                const res = await fetch('/api/blog?pageSize=50');
                const data = await res.json();
                if (data.data) {
                    setPosts(data.data);
                }
            } catch (err) {
                console.error('Blog yazıları yüklenemedi:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-white pb-32 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10" />
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-black uppercase tracking-widest mb-8 border border-primary/10">
                         <Sparkles size={16} />
                         <span>Bilgi Kaynağınız</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-heading leading-[1.1] mb-8 tracking-tighter">
                        Paylaş ve <br />
                        <GradientText className="inline-block mt-2">
                            Öğren.
                        </GradientText>
                    </h1>
                    <p className="text-xl text-muted font-medium leading-relaxed max-w-2xl mx-auto">
                        Ruh sağlığı, kişisel gelişim ve modern psikoloji labirentinde yolunuzu bulmanıza yardımcı olacak güncel makaleler.
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="mb-16 space-y-8">
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative flex items-center bg-white rounded-3xl border-2 border-slate-100 p-2 shadow-xl focus-within:border-primary transition-all">
                            <div className="pl-4 text-muted">
                                <Search size={22} />
                            </div>
                            <input
                                type="text"
                                placeholder="Yazı başlığı veya içerik ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 bg-transparent outline-none text-heading font-bold text-lg placeholder:text-slate-300"
                            />
                            <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-colors">
                                Ara
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "px-6 py-2.5 rounded-2xl text-sm font-black transition-all border-2 uppercase tracking-widest",
                                    selectedCategory === category 
                                        ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20" 
                                        : "bg-white border-slate-50 text-muted hover:border-slate-200"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[3rem] border-none shadow-inner">
                        <LoadingSpinner size="lg" />
                        <p className="mt-4 text-muted font-black tracking-widest uppercase text-xs">Makaleler Getiriliyor</p>
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredPosts.map((post) => (
                            <SpotlightCard
                                key={post.id}
                                className="p-0 overflow-hidden border-none shadow-2xl rounded-[3rem] group bg-white hover:bg-slate-50 transition-colors"
                            >
                                {/* Image Container */}
                                <div className="h-64 relative overflow-hidden bg-slate-900 flex items-center justify-center">
                                    {post.imageUrl ? (
                                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/10 select-none">
                                            <BookOpen size={120} />
                                            <span className="text-sm font-black uppercase tracking-[1em] mt-4">Kapak Yok</span>
                                        </div>
                                    )}
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-2xl text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                                        {post.category || 'Psikoloji'}
                                    </div>
                                </div>

                                <div className="p-10 flex flex-col h-[calc(100%-16rem)]">
                                    <div className="flex items-center gap-3 text-xs font-black text-muted uppercase tracking-widest mb-4">
                                        <Calendar size={14} />
                                        <span>{formatDate(post.publishedAt)}</span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-black text-heading mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors tracking-tight">
                                        {post.title}
                                    </h3>
                                    
                                    <p className="text-muted font-medium mb-8 line-clamp-3 leading-relaxed flex-grow">
                                        {post.excerpt || 'Bu makale içeriği hakkında detaylı bilgi almak için okumaya devam edin.'}
                                    </p>

                                    <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary border border-slate-200">
                                                <User size={14} />
                                            </div>
                                            <span className="text-xs font-bold text-heading">{post.author || 'Editör'}</span>
                                        </div>
                                        <Link
                                            to={`/blog/${post.id}`}
                                            className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:gap-3 transition-all"
                                        >
                                            Okumaya Başla
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 glass-card rounded-[3rem] border-dashed">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <Search size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-heading mb-2 lowercase tracking-tighter">içerik Bulunamadı.</h3>
                        <p className="text-muted font-medium">Arama kriterlerinize uygun makale şu an mevcut değil.</p>
                        <button 
                            onClick={() => {setSearchTerm(''); setSelectedCategory('Tümü');}}
                            className="mt-8 text-primary font-black uppercase tracking-widest text-xs hover:underline"
                        >
                            Filtreleri Temizle
                        </button>
                    </div>
                )}

                {/* Bottom CTA Block */}
                <div className="mt-32 relative group p-1 w-full rounded-[3.5rem] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-emerald-400 opacity-20" />
                    <div className="relative bg-white p-12 md:p-20 rounded-[3.4rem] flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black text-heading mb-6 tracking-tighter leading-tight">
                                Okumak Yetmediyse <br />
                                <span className="text-primary italic">Birlikte Çözelim.</span>
                            </h2>
                            <p className="text-lg text-muted font-medium leading-relaxed">
                                Profesyonel bir bakış açısı her şeyi değiştirebilir. Uzman terapistlerimizle online görüşme yaparak hayatınızdaki düğümleri çözmeye başlayın.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/find-therapist')}
                            className="btn-premium bg-slate-900 text-white scale-125 hover:shadow-2xl hover:bg-primary transition-all flex-shrink-0"
                        >
                            Uzmanları Keşfet
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
