import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

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
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = React.useState('Tümü');
    const [searchTerm, setSearchTerm] = React.useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
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
        <div className="font-nunito min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12 pt-28">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Blog</h1>
                    <p className="text-lg max-w-2xl mx-auto text-muted">
                        Ruh sağlığı, kişisel gelişim ve psikoloji hakkında güncel yazılar
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8">
                    <div className="max-w-xl mx-auto mb-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Yazı ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white outline-none focus:ring-2 border-heading text-gray-900"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category ? 'text-white' : 'bg-white hover:opacity-80'}`}
                                style={{
                                    backgroundColor: selectedCategory === category ? '#1f2937' : undefined,
                                    color: selectedCategory === category ? 'white' : '#1f2937',
                                    border: selectedCategory === category ? 'none' : '1px solid #1f2937'
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <LoadingSpinner size="lg" />
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
                            >
                                {/* Image */}
                                <div className="h-48 flex items-center justify-center overflow-hidden bg-gray-100">
                                    {post.imageUrl ? (
                                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#1f2937', opacity: 0.15 }}>
                                            <span className="text-4xl">📰</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    {post.category && (
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-primary text-white">
                                            {post.category}
                                        </span>
                                    )}
                                    <h3 className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity line-clamp-2 text-gray-900">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="mb-4 line-clamp-3 text-muted text-sm">{post.excerpt}</p>
                                    )}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {formatDate(post.publishedAt)}
                                        </span>
                                    </div>
                                    {post.author && (
                                        <div className="pt-3 border-t border-secondary">
                                            <p className="text-sm text-gray-900">
                                                <span className="opacity-60">Yazar:</span> {post.author}
                                            </p>
                                        </div>
                                    )}
                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all text-primary"
                                    >
                                        Devamını Oku
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400 font-medium">
                            {posts.length === 0 ? 'Henüz blog yazısı eklenmemiş.' : 'Aradığınız kriterlere uygun yazı bulunamadı.'}
                        </p>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Profesyonel Destek mi Arıyorsunuz?</h2>
                    <p className="mb-6 text-muted">Uzman psikologlarımızla online görüşme yaparak profesyonel destek alabilirsiniz.</p>
                    <Link
                        to="/find-therapist"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all border-2"
                        style={{ backgroundColor: 'transparent', color: '#13a4ec', borderColor: '#13a4ec' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#13a4ec';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#13a4ec';
                        }}
                    >
                        Psikolog Bul
                    </Link>
                </div>
            </div>
        </div>
    );
}
