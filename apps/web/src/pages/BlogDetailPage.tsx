import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, User } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    publishedAt: string;
    imageUrl?: string;
    slug: string;
}

export default function BlogDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            try {
                // ID numeric ise ID ile, değilse slug ile çek
                const isNumeric = /^\d+$/.test(id);
                const url = isNumeric ? `/api/blog/id/${id}` : `/api/blog/${id}`;
                const res = await fetch(url);
                if (!res.ok) { setNotFound(true); return; }
                const data = await res.json();
                if (!data || !data.id) { setNotFound(true); return; }
                setPost(data);
            } catch (err) {
                console.error('Blog yazısı yüklenemedi:', err);
                setNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

    // Basit markdown benzeri işleme
    const formatContent = (content: string) => {
        return content.split('\n').map((line, i) => {
            if (line.startsWith('## '))
                return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace('## ', '')}</h2>;
            if (line.startsWith('### '))
                return <h3 key={i} className="text-xl font-semibold text-gray-800 mt-6 mb-3">{line.replace('### ', '')}</h3>;
            if (line.startsWith('- '))
                return <li key={i} className="text-gray-700 ml-4 list-disc">{line.replace('- ', '')}</li>;
            if (line.trim())
                return <p key={i} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
            return null;
        }).filter(Boolean);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (notFound || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Yazı Bulunamadı</h1>
                    <p className="text-gray-600 mb-6">Aradığınız blog yazısı mevcut değil veya yayından kaldırılmış.</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:brightness-90 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Blog'a Dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-nunito">
            <div className="max-w-4xl mx-auto px-4 py-12 pt-28">
                {/* Geri Butonu */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Geri Dön
                </button>

                {/* Article */}
                <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Cover Image */}
                    {post.imageUrl && (
                        <div className="h-64 overflow-hidden">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Header */}
                    <div className="p-8 pb-6 border-b border-gray-100">
                        {post.category && (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white mb-4">
                                {post.category}
                            </span>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                            {post.title}
                        </h1>
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            {post.author && (
                                <span className="flex items-center gap-1.5">
                                    <User size={14} />
                                    {post.author}
                                </span>
                            )}
                            {post.publishedAt && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    {formatDate(post.publishedAt)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {post.excerpt && (
                            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-primary pl-4">
                                {post.excerpt}
                            </p>
                        )}
                        {post.content ? (
                            <div>{formatContent(post.content)}</div>
                        ) : (
                            <p className="text-gray-400 italic text-center py-8">İçerik henüz eklenmemiş.</p>
                        )}
                    </div>
                </article>

                {/* Back to Blog */}
                <div className="mt-10 text-center">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
                    >
                        <ArrowLeft size={16} />
                        Tüm Yazılara Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}
