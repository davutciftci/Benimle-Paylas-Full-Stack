import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
}

const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Anksiyete ile Başa Çıkma Yöntemleri',
        excerpt: 'Günlük hayatta yaşadığımız anksiyeteyi azaltmak için kullanabileceğiniz pratik yöntemler ve teknikleri bu yazımızda bulabilirsiniz.',
        category: 'Anksiyete',
        author: 'Dr. Ayşe Demir',
        date: '10 Aralık 2024',
        readTime: '8 dk',
        image: '/src/assets/img/blog/anxiety.jpg'
    },
    {
        id: '2',
        title: 'Sağlıklı İlişkilerin Temelleri',
        excerpt: 'İster romantik olsun ister arkadaşlık, sağlıklı ilişkiler kurmak için nelere dikkat etmemiz gerektiğini keşfedin.',
        category: 'İlişkiler',
        author: 'Uzm. Psk. Mehmet Yılmaz',
        date: '8 Aralık 2024',
        readTime: '6 dk',
        image: '/src/assets/img/blog/relationships.jpg'
    },
    {
        id: '3',
        title: 'Çocuklarda Duygusal Zeka Gelişimi',
        excerpt: 'Çocuklarınızın duygusal zekasını desteklemek için neler yapabileceğinizi öğrenin.',
        category: 'Çocuk Psikolojisi',
        author: 'Psk. Dan. Elif Kaya',
        date: '5 Aralık 2024',
        readTime: '10 dk',
        image: '/src/assets/img/blog/children.jpg'
    },
    {
        id: '4',
        title: 'İş Yerinde Stres Yönetimi',
        excerpt: 'Modern iş hayatının getirdiği stresle başa çıkmak için etkili stratejiler ve öneriler.',
        category: 'Stres',
        author: 'Dr. Can Arslan',
        date: '3 Aralık 2024',
        readTime: '7 dk',
        image: '/src/assets/img/blog/stress.jpg'
    },
    {
        id: '5',
        title: 'Mindfulness ve Günlük Yaşam',
        excerpt: 'Farkındalık meditasyonunu günlük rutininize nasıl entegre edebileceğinizi adım adım anlattık.',
        category: 'Mindfulness',
        author: 'Dr. Ayşe Demir',
        date: '1 Aralık 2024',
        readTime: '5 dk',
        image: '/src/assets/img/blog/mindfulness.jpg'
    },
    {
        id: '6',
        title: 'Uyku Hijyeni: Kaliteli Uyku İçin İpuçları',
        excerpt: 'Daha iyi uyumak ve uyku kalitenizi artırmak için uygulamanız gereken basit ama etkili yöntemler.',
        category: 'Uyku',
        author: 'Uzm. Psk. Mehmet Yılmaz',
        date: '28 Kasım 2024',
        readTime: '6 dk',
        image: '/src/assets/img/blog/sleep.jpg'
    }
];

const categories = ['Tümü', 'Anksiyete', 'Depresyon', 'İlişkiler', 'Stres', 'Çocuk Psikolojisi', 'Mindfulness', 'Uyku'];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = React.useState('Tümü');
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="font-nunito min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12 pt-28">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                        Blog
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto text-muted">
                        Ruh sağlığı, kişisel gelişim ve psikoloji hakkında güncel yazılar
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8">
                    {/* Search */}
                    <div className="max-w-xl mx-auto mb-6">
                        <input
                            type="text"
                            placeholder="Yazı ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border bg-white outline-none focus:ring-2 border-heading text-gray-900"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'text-white'
                                    : 'bg-white hover:opacity-80'
                                    }`}
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
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
                            >
                                {/* Image Placeholder */}
                                <div
                                    className="h-48 flex items-center justify-center"
                                    style={{ backgroundColor: '#1f2937', opacity: 0.2 }}
                                >
                                    <span style={{ color: '#1f2937', opacity: 0.5 }}>📷 Görsel</span>
                                </div>

                                <div className="p-6">
                                    {/* Category Badge */}
                                    <span
                                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-primary text-white"
                                    >
                                        {post.category}
                                    </span>

                                    {/* Title */}
                                    <h3
                                        className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity line-clamp-2 text-gray-900"
                                    >
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p
                                        className="mb-4 line-clamp-3 text-muted"
                                    >
                                        {post.excerpt}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center justify-between text-sm text-gray-900">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {post.readTime}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Author */}
                                    <div className="mt-4 pt-4 border-t border-secondary">
                                        <p className="text-sm text-gray-900">
                                            <span className="opacity-60">Yazar:</span> {post.author}
                                        </p>
                                    </div>

                                    {/* Read More Button */}
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
                    <div className="text-center py-12">
                        <p className="text-gray-900 opacity-60">
                            Aradığınız kriterlere uygun yazı bulunamadı.
                        </p>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                        Profesyonel Destek mi Arıyorsunuz?
                    </h2>
                    <p className="mb-6 text-muted">
                        Uzman psikologlarımızla online görüşme yaparak profesyonel destek alabilirsiniz.
                    </p>
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
