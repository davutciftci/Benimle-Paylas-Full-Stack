import React from 'react';
import { Heart, Users, Home, Baby, MessageCircle, Brain, Shield, Clock } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Bireysel Terapi",
      description: "Bireysel ihtiyaçlarınıza özel psikolojik destek ve danışmanlık hizmeti.",
      icon: Heart,
      features: ["Anksiyete ve depresyon", "Stres yönetimi", "Özgüven geliştirme"]
    },
    {
      title: "Çift Terapisi",
      description: "İlişkilerinizi güçlendirmek ve iletişim sorunlarını çözmek için uzman rehberlik.",
      icon: Users,
      features: ["İletişim problemleri", "Güven sorunları", "Çatışma çözümü"]
    },
    {
      title: "Aile Terapisi",
      description: "Aile dinamiklerini iyileştirmek ve sağlıklı ilişkiler kurmak için aile danışmanlığı.",
      icon: Home,
      features: ["Aile içi iletişim", "Ebeveyn-çocuk ilişkileri", "Boşanma süreci desteği"]
    },
    {
      title: "Çocuk ve Ergen Terapisi",
      description: "Çocuklar ve gençler için gelişim dönemlerine uygun psikolojik destek.",
      icon: Baby,
      features: ["Davranış sorunları", "Okul başarısızlığı", "Sosyal uyum problemleri"]
    },
    {
      title: "Online Terapi",
      description: "Evinizin konforunda, güvenli video görüşme ile profesyonel psikolojik destek.",
      icon: MessageCircle,
      features: ["Esnek randevu saatleri", "Gizlilik garantisi", "7/24 erişilebilirlik"]
    },
    {
      title: "Travma ve EMDR",
      description: "Travmatik deneyimlerin etkilerini azaltmak için EMDR terapisi.",
      icon: Brain,
      features: ["Travma işleme", "EMDR teknikleri", "Güçlenme odaklı yaklaşım"]
    },
    {
      title: "Stres ve Tükenmişlik",
      description: "İş ve yaşam stresiyle başa çıkma, tükenmişlik sendromu tedavisi.",
      icon: Shield,
      features: ["Stres yönetimi", "İş-yaşam dengesi", "Mindfulness teknikleri"]
    },
    {
      title: "Kriz Müdahalesi",
      description: "Acil durumlarda hızlı ve etkili psikolojik destek.",
      icon: Clock,
      features: ["Acil psikolojik destek", "24 saat içinde randevu", "Kriz yönetimi"]
    }
  ];

  return (
    <>
      <div className="text-primary font-nunito bg-gray-50 py-18 px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Hizmetlerimiz
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Uzman psikologlarımız ile her yaştan ve her ihtiyaçtan bireylere özel,
              kanıta dayalı terapi hizmetleri sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-500 flex items-center">
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
              Neden Bizi Seçmelisiniz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Gizlilik Garantisi</h3>
                <p className="text-gray-600 text-sm">
                  Tüm görüşmeleriniz tamamen gizli ve güvenlidir. Kişisel bilgileriniz korunur.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Uzman Kadro</h3>
                <p className="text-gray-600 text-sm">
                  Lisanslı ve deneyimli psikologlarımız sizin için en iyi desteği sağlar.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Esnek Randevu</h3>
                <p className="text-gray-600 text-sm">
                  Size uygun gün ve saatte, online veya yüz yüze terapi seçeneği.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Hemen Başlayın
            </h2>
            <p className="text-gray-600 mb-6">
              Zihinsel sağlığınız için ilk adımı atın. Uzman terapistlerimizle tanışın.
            </p>
            <a
              href="/find-therapist"
              className="inline-block bg-gradient-to-r from-slate-500 to-slate-700 text-white px-8 py-3 rounded-lg font-medium hover:from-slate-600 hover:to-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Terapist Bul
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
