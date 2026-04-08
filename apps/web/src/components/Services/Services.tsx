import React from 'react';
import { Heart, Users, Home, Baby, MessageCircle, Brain, Shield, Clock, ChevronRight, Zap } from 'lucide-react';
import SpotlightCard from '../common/SpotlightCard';
import { useNavigate } from 'react-router-dom';
import GradientText from '../common/GradientText';
import { cn } from '../common/utils';

export default function Services() {
  const navigate = useNavigate();
  const services = [
    {
      title: "Bireysel Danışmanlık",
      description: "Kendi iç dünyanıza yapacağınız yolculukta size rehberlik ediyoruz. Kaygı, depresyon ve stresle başa çıkmanıza yardımcı oluyoruz.",
      icon: Heart,
      features: ["Anksiyete Yönetimi", "Depresyon Desteği", "Özgüven Gelişimi"],
      color: "text-rose-500",
      bgColor: "bg-rose-50"
    },
    {
      title: "Çift & İlişki Terapisi",
      description: "İlişkilerinizdeki düğümleri birlikte çözelim. Daha güçlü iletişim ve güven dolu bağlar kurmanız için buradayız.",
      icon: Users,
      features: ["İletişim Geliştirme", "Güven İnşası", "Çözüm Odaklı Yaklaşım"],
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Aile Danışmanlığı",
      description: "Aile içindeki huzuru ve uyumu yeniden keşfedin. Ebeveyn-çocuk ilişkilerini güçlendiriyoruz.",
      icon: Home,
      features: ["Aile Dinamikleri", "Ebeveynlik Desteği", "Çatışma Çözümü"],
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    {
      title: "Çocuk & Ergen Desteği",
      description: "Geleceğimizin teminatı olan gençlerimiz için yaşlarına uygun ve güvenli bir gelişim alanı yaratıyoruz.",
      icon: Baby,
      features: ["Davranış Gelişimi", "Okul Uyumu", "Ergenlik Süreçleri"],
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="services">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-orange-600 text-xs font-black uppercase tracking-widest mb-6">
                <Zap size={14} />
                <span>Modern Terapi Yaklaşımları</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-heading mb-8 leading-tight tracking-tighter">
              İhtiyaçlarınıza Özel <br />
              <GradientText className="inline-block">Çözümler.</GradientText>
            </h2>
          </div>
          <p className="text-xl text-muted max-w-md lg:pt-10 font-medium leading-relaxed">
            Uzman psikologlarımız ile her yaştan ve her ihtiyaçtan bireylere özel, bilimsel temelli ve modern terapi yöntemleri sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {services.map((service, index) => (
            <SpotlightCard key={index} className="p-12 group hover:bg-slate-50 transition-colors duration-500 border-2 border-slate-50 hover:border-primary/20">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-500", service.bgColor, service.color)}>
                  <service.icon size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-heading mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted leading-relaxed mb-8 text-lg font-medium">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => navigate('/find-therapist')}
                    className="flex items-center gap-2 font-black text-primary group/btn"
                  >
                    Detaylı Bilgi 
                    <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Global CTA transformation */}
        <div className="relative group p-1 w-full rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-500 to-accent animate-gradient-move bg-[length:200%_auto]" />
            <div className="relative bg-slate-950 p-12 md:p-20 rounded-[2.8rem] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2),transparent_50%)]" />
                <div className="relative z-10 max-w-2xl">
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                        Yeni Bir Sayfa Açmaya <br />
                        <span className="text-primary italic">Hazır mısınız?</span>
                    </h3>
                    <p className="text-slate-400 text-lg font-medium">
                        Zihinsel sağlığınız en değerli yatırımınızdır. Şimdi başlayın, kendiniz için en iyisini yapın.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/register')}
                    className="relative z-10 btn-premium bg-white text-slate-950 hover:bg-primary hover:text-white shadow-2xl transition-all scale-110 md:scale-125 px-10"
                >
                    Hemen Kayıt Ol
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
}

// Helper for ArrowRight that was missing in previous imports
function ArrowRight({ size }: { size: number }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
