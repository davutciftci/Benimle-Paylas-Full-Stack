import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
}

// Statik blog içerikleri (ileride API'den gelecek)
const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Anksiyete ile Başa Çıkma Yöntemleri',
        excerpt: 'Günlük hayatta yaşadığımız anksiyeteyi azaltmak için kullanabileceğiniz pratik yöntemler ve teknikleri bu yazımızda bulabilirsiniz.',
        content: `
Anksiyete, günümüzde pek çok kişinin yaşadığı yaygın bir duygusal durumdur. Kaygı, endişe ve gerginlik hissinin yoğun biçimde yaşanması olarak tanımlanabilir.

## Anksiyetenin Belirtileri

- Sürekli endişe ve kaygı hissi
- Kalp çarpıntısı ve nefes darlığı
- Uyku bozuklukları
- Konsantrasyon güçlüğü
- Kas gerginliği

## Başa Çıkma Yöntemleri

### 1. Nefes Egzersizleri

Derin nefes alma, anksiyete anında hızla uygulanabilecek en etkili tekniklerden biridir. 4-7-8 tekniği: 4 saniye nefes al, 7 saniye tut, 8 saniyede bırak.

### 2. Farkındalık (Mindfulness)

Şu anki anı fark etmek ve geçmiş/gelecek kaygılarından uzaklaşmak anksiyeteyi önemli ölçüde azaltabilir.

### 3. Fiziksel Aktivite

Düzenli egzersiz, endorfin salgılanmasını artırarak stres ve anksiyeteyi azaltır.

### 4. Profesyonel Destek

Anksiyete belirtileriniz günlük yaşamınızı olumsuz etkiliyorsa, bir psikolog veya psikiyatristtan destek almanız önemlidir.
        `,
        category: 'Anksiyete',
        author: 'Dr. Ayşe Demir',
        date: '10 Aralık 2024',
        readTime: '8 dk',
    },
    {
        id: '2',
        title: 'Sağlıklı İlişkilerin Temelleri',
        excerpt: 'İster romantik olsun ister arkadaşlık, sağlıklı ilişkiler kurmak için nelere dikkat etmemiz gerektiğini keşfedin.',
        content: `
Sağlıklı ilişkiler, duygusal refahımızın temel taşlarından birini oluşturur. İster romantik, ister arkadaşlık olsun, ilişkilerimizin kalitesi yaşam kalitemizi doğrudan etkiler.

## Sağlıklı İlişkilerin Temel Unsurları

### Güven
Her sağlıklı ilişkinin temelinde güven yatar. Güven, zamanla tutarlı davranışlar ve dürüstlük ile inşa edilir.

### İletişim
Açık ve dürüst iletişim, sorunların çözümünde kritik rol oynar. Aktif dinleme becerisi de iletişimin ayrılmaz bir parçasıdır.

### Saygı
Karşılıklı saygı; sınırlara saygı göstermek, farklılıkları kabul etmek ve kişiyi olduğu gibi değer vermek anlamına gelir.

### Destek
Zorlu dönemlerde yanında olmak ve başarılarda sevinmek ilişkiyi güçlendirir.
        `,
        category: 'İlişkiler',
        author: 'Uzm. Psk. Mehmet Yılmaz',
        date: '8 Aralık 2024',
        readTime: '6 dk',
    },
    {
        id: '3',
        title: 'Çocuklarda Duygusal Zeka Gelişimi',
        excerpt: 'Çocuklarınızın duygusal zekasını desteklemek için neler yapabileceğinizi öğrenin.',
        content: `
Duygusal zeka (EQ), çocukların hem akademik hem de sosyal başarıları için kritik öneme sahiptir. Kendi duygularını tanıyan ve yöneten çocuklar, daha sağlıklı ilişkiler kurar.

## Duygusal Zekayı Destekleme Yolları

### Duyguları İsimlendirin
Çocuğunuzun hissettiği duyguları isimlendirmesine yardımcı olun. "Şu an üzgün müsün, yoksa sinirli mi?" gibi sorular sormak farkındalığı artırır.

### Empati Geliştirin
Başkalarının duygularını anlamalarına yardımcı olmak için kitap okuyun, filmler izleyin ve bu deneyimler hakkında konuşun.

### Problem Çözme Becerisi
Çocuğunuzla birlikte sorunlara çözüm yolları bulmak hem bağımsızlık hem de duygusal düzenleme becerisini güçlendirir.
        `,
        category: 'Çocuk Psikolojisi',
        author: 'Psk. Dan. Elif Kaya',
        date: '5 Aralık 2024',
        readTime: '10 dk',
    },
    {
        id: '4',
        title: 'İş Yerinde Stres Yönetimi',
        excerpt: 'Modern iş hayatının getirdiği stresle başa çıkmak için etkili stratejiler ve öneriler.',
        content: `
İş yeri stresi, çalışanların en sık karşılaştığı sorunların başında gelmektedir. Kronik stres hem sağlığı hem de iş performansını olumsuz etkiler.

## İş Stresinin Kaynakları

- Aşırı iş yükü ve zaman baskısı
- Rol belirsizliği veya çatışması
- Zorlu iş arkadaşları veya yöneticiler
- İş güvensizliği

## Stres Yönetimi Stratejileri

### Önceliklendirme
Görevleri önem ve aciliyetine göre sıralayın. Eisenhower matrisi bu konuda faydalı bir araçtır.

### Sınır Koyma
Mesai bitiminde işi aklınızdan çıkarabilmek için net sınırlar belirleyin. Bildirimleri kapatın.

### Mikro Molalar
Her 90 dakikada bir kısa mola vermek konsantrasyonu ve verimliliği artırır.

### Sosyal Destek
İş arkadaşlarınızla güçlü ilişkiler kurmak stresle baş etmeyi kolaylaştırır.
        `,
        category: 'Stres',
        author: 'Dr. Can Arslan',
        date: '3 Aralık 2024',
        readTime: '7 dk',
    },
    {
        id: '5',
        title: 'Mindfulness ve Günlük Yaşam',
        excerpt: 'Farkındalık meditasyonunu günlük rutininize nasıl entegre edebileceğinizi adım adım anlattık.',
        content: `
Mindfulness (farkındalık), zihnin şu anda olduğu yere dikkatini odaklaması pratiğidir. Yargılamadan, merakla şu anı deneyimlemek demektir.

## Neden Mindfulness?

Araştırmalar, düzenli farkındalık pratiğinin stres, anksiyete ve depresyonu azalttığını, odaklanmayı ve uyku kalitesini iyileştirdiğini göstermektedir.

## Günlük Hayata Entegrasyon

### Sabah Ritüeli
Güne 5-10 dakikalık nefes meditasyonuyla başlayın.

### Bilinçli Yemek Yeme
Yemek yerken telefonu bırakın; yemeğinizin tadını, dokusunu ve kokusunu fark edin.

### Yürüyüş Meditasyonu
Adımlarınızı, vücudunuzun hareketini ve çevrenizi fark ederek yürüyün.

### Gece Özeti
Uyumadan önce günü yargılamadan gözden geçirin.
        `,
        category: 'Mindfulness',
        author: 'Dr. Ayşe Demir',
        date: '1 Aralık 2024',
        readTime: '5 dk',
    },
    {
        id: '6',
        title: 'Uyku Hijyeni: Kaliteli Uyku İçin İpuçları',
        excerpt: 'Daha iyi uyumak ve uyku kalitenizi artırmak için uygulamanız gereken basit ama etkili yöntemler.',
        content: `
Kaliteli uyku, fiziksel ve ruhsal sağlığın temel taşlarından biridir. Yetersiz veya kalitesiz uyku; hafıza sorunları, ruh hali bozuklukları ve bağışıklık sisteminin zayıflamasına yol açabilir.

## Uyku Hijyeni Nedir?

Uyku hijyeni, kaliteli uyku için geliştirilen alışkanlıklar ve ortam düzenlemelerinin bütünüdür.

## Temel Öneriler

### Düzenli Uyku Saati
Her gün aynı saatte yatıp kalkmak biyolojik saatinizi düzenler. Hafta sonları bile tutarlı olun.

### Yatak Odası Ortamı
- Karanlık, serin (18-20°C) ve sessiz bir ortam sağlayın
- Yatak odanızı yalnızca uyku için kullanın

### Ekran Süresi
Uyumadan 1 saat önce telefon, tablet ve bilgisayarı bırakın. Mavi ışık melatonin üretimini baskılar.

### Kafein ve Alkol
Öğleden sonra kafein tüketimini sınırlayın. Alkol uyku kalitesini düşürür.

### Rahatlatıcı Rutin
Sıcak duş, hafif esneme hareketleri veya kitap okuma gibi aktiviteler uykuya geçişi kolaylaştırır.
        `,
        category: 'Uyku',
        author: 'Uzm. Psk. Mehmet Yılmaz',
        date: '28 Kasım 2024',
        readTime: '6 dk',
    },
];

export default function BlogDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const post = blogPosts.find((p) => p.id === id);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Yazı Bulunamadı</h1>
                    <p className="text-gray-600 mb-6">Aradığınız blog yazısı mevcut değil.</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Blog'a Dön
                    </Link>
                </div>
            </div>
        );
    }

    // Basit markdown benzeri işleme (## başlık, ### alt başlık)
    const formatContent = (content: string) => {
        return content
            .split('\n')
            .map((line, i) => {
                if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={i} className="text-xl font-semibold text-gray-800 mt-6 mb-3">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={i} className="text-gray-700 ml-4 list-disc">{line.replace('- ', '')}</li>;
                }
                if (line.trim()) {
                    return <p key={i} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
                }
                return null;
            })
            .filter(Boolean);
    };

    const relatedPosts = blogPosts.filter((p) => p.id !== id && p.category === post.category).slice(0, 2);

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
                    {/* Header */}
                    <div className="p-8 pb-6 border-b border-gray-100">
                        {/* Category */}
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white mb-4">
                            {post.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <User size={14} />
                                {post.author}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {post.readTime} okuma
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-blue-500 pl-4">
                            {post.excerpt}
                        </p>
                        <div>{formatContent(post.content)}</div>
                    </div>
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili Yazılar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedPosts.map((related) => (
                                <Link
                                    key={related.id}
                                    to={`/blog/${related.id}`}
                                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
                                >
                                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-3">
                                        {related.category}
                                    </span>
                                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                                        {related.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">{related.readTime} okuma</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back to Blog */}
                <div className="mt-10 text-center">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all"
                    >
                        <ArrowLeft size={16} />
                        Tüm Yazılara Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}
