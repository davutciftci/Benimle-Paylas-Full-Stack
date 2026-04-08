import React from 'react';
import { Search, CreditCard, Video, ArrowRight, CheckCircle2, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GradientText from '../components/common/GradientText';
import SpotlightCard from '../components/common/SpotlightCard';

export default function HowItWorksPage() {
    const navigate = useNavigate();
    
    const steps = [
        {
            icon: Search,
            number: "01",
            title: 'Uzmanını Keşfet',
            description: 'İhtiyaçlarınıza en uygun terapisti bulmak için uzman kadromuzu filtreleyin. Deneyim, uzmanlık alanları ve danışan yorumlarını inceleyerek doğru eşleşmeyi yakalayın.',
            details: ['Alanında Uzman Kadro', 'Gerçek Danışan Yorumları', 'Detaylı Uzman Profilleri'],
            color: 'text-blue-500',
            bgColor: 'bg-blue-50'
        },
        {
            icon: CreditCard,
            number: "02",
            title: 'Güvenle Randevu Al',
            description: 'Size uygun tarih ve saati seçin, 256-bit SSL sertifikalı güvenli ödeme altyapımız ile randevunuzu anında oluşturun. Kredi kartı veya havale seçenekleriyle kolayca ödeyin.',
            details: ['Güvenli Ödeme Altyapısı', 'Anında Onay', 'Esnek Randevu Saatleri'],
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-50'
        },
        {
            icon: Video,
            number: "03",
            title: 'Terapiye Bağlan',
            description: 'Seans saati geldiğinde panelinizden tek tıkla video görüşmeye katılın. Evinizin konforunda, tamamen gizli ve güvenli bir dijital terapi odasında iyileşme yolculuğuna başlayın.',
            details: ['Uçtan Uca Şifreleme', 'Kesintisiz Görüntü Kalitesi', 'Kişisel Veri Gizliliği'],
            color: 'text-purple-500',
            bgColor: 'bg-purple-50'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10" />
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-black uppercase tracking-widest mb-8 border border-primary/10">
                             <Sparkles size={16} />
                             <span>Süreç Çok Kolay</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-heading leading-[1.1] mb-8 tracking-tighter">
                            İyileşme <br />
                            <GradientText className="inline-block mt-2">
                                Nasıl Başlar?
                            </GradientText>
                        </h1>
                        <p className="text-xl text-muted mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
                            Benimle Paylaş platformunda terapiye başlamak sandığınızdan çok daha kolay. Sizin için tüm süreci basit, güvenli ve dijital hale getirdik.
                        </p>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-32">
                        {steps.map((step, index) => (
                            <div key={index} className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className={`text-6xl font-black opacity-20 ${step.color}`}>{step.number}</span>
                                        <div className={`w-12 h-1 bg-slate-100 rounded-full`} />
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-heading mb-6 tracking-tight">
                                        {step.title}
                                    </h2>
                                    <p className="text-lg text-muted mb-8 font-medium leading-relaxed">
                                        {step.description}
                                    </p>
                                    <ul className="space-y-4 mb-10">
                                        {step.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-heading font-bold">
                                                <div className={`w-6 h-6 rounded-full ${step.bgColor} ${step.color} flex items-center justify-center`}>
                                                    <CheckCircle2 size={14} />
                                                </div>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* Visual Card */}
                                <div className="flex-1 w-full">
                                    <SpotlightCard className="p-0 overflow-hidden border-none shadow-2xl rounded-[3rem] group">
                                        <div className={`aspect-video lg:aspect-square flex items-center justify-center p-12 relative overflow-hidden ${step.bgColor}`}>
                                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 transition-opacity" />
                                            <step.icon size={120} className={`${step.color} relative z-10 transition-transform duration-700 group-hover:scale-110`} />
                                            
                                            {/* Abstract background shapes */}
                                            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/50 blur-3xl" />
                                            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/30 blur-2xl" />
                                        </div>
                                    </SpotlightCard>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Info Bar - Trust Factors */}
            <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent_50%)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck size={32} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-bold italic">Tamamen Güvenli</h3>
                            <p className="text-slate-400 font-medium">Uçtan uca şifreli görüntülü görüşme altyapısı ve KVKK uyumlu veri saklama.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <MessageSquare size={32} className="text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold italic">Kesintisiz Destek</h3>
                            <p className="text-slate-400 font-medium">7/24 teknik destek ve danışan temsilcisi ile her an yanınızdayız.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <CreditCard size={32} className="text-amber-500" />
                            </div>
                            <h3 className="text-xl font-bold italic">Esnek İptal / İade</h3>
                            <p className="text-slate-400 font-medium">24 saat öncesine kadar yapacağınız iptallerde anında tam iade garantisi.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-heading mb-12 tracking-tighter leading-tight">
                        Kendiniz İçin Bir <br /> 
                        <span className="text-primary italic">Yol Haritası</span> Çizin.
                    </h2>
                    <button
                        onClick={() => navigate('/find-therapist')}
                        className="btn-premium bg-primary text-white scale-125 hover:shadow-2xl hover:shadow-primary/40 mx-auto"
                    >
                        Psikologları Keşfet
                        <ArrowRight size={20} />
                    </button>
                    <p className="mt-12 text-muted font-bold text-sm uppercase tracking-widest">İlk seansınızı bugüne planlayın.</p>
                </div>
            </section>
        </div>
    );
}
