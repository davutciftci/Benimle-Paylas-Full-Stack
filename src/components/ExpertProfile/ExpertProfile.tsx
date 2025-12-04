import React from 'react';
import { Link } from 'react-router-dom';
import { LiaSignLanguageSolid } from "react-icons/lia";
import { ArrowRight } from 'lucide-react';

export default function ExpertProfile() {
  const experts = [
    {
      id: 'ayse-demir',
      name: "Dr. Ayşe Demir",
      title: "Klinik Psikolog",
      description: "Travma, anksiyete bozuklukları ve depresyon konularında uzmanlaşmıştır. Bilişsel Davranışçı Terapi (BDT) ve EMDR tekniklerini kullanmaktadır.",
      image: "/src/assets/img/davut ciftci.jpg",
      bgColor: "#f4f4f4"
    },
    {
      id: 'mehmet-yilmaz',
      name: "Uzm. Psk. Mehmet Yılmaz",
      title: "Aile ve Çift Terapisti",
      description: "İlişki sorunları, iletişim problemleri ve aile içi çatışmalar üzerine çalışmaktadır. Duygu Odaklı Çift Terapisi yöntemini benimsemektedir.",
      image: "/src/assets/img/freud.png",
      bgColor: "#f4f4f4"
    },
    {
      id: 'elif-kaya',
      name: "Psk. Dan. Elif Kaya",
      title: "Bireysel Terapist",
      description: "Özgüven sorunları, stres yönetimi ve kişisel gelişim konularında bireysel danışmanlık hizmeti vermektedir. Varoluşçu terapi ekolünden yararlanır.",
      image: "/src/assets/img/Alfred Binet.png",
      bgColor: "#f4f4f4"
    },
    {
      id: 'can-arslan',
      name: "Psk. Dan. Can Arslan",
      title: "Grup Terapisti",
      description: "Sosyal anksiyete ve bağımlılık konularında grup terapileri düzenlemektedir. Psikodrama ve grup dinamikleri üzerine odaklanmaktadır.",
      image: "/src/assets/img/Carl Gustavt Jung.png",
      bgColor: "#f4f4f4"
    }
  ];

  return (
    <>
      <div className="font-nunito min-h-screen bg-white">

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6 pt-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#00435a' }}>
              Ekibimizle Tanışın
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#00435a', opacity: 0.8 }}>
              ZihinSağlığı Kliniği'nde, her biri kendi alanında uzmanlaşmış, deneyimli ve özverili bir psikolog ekibiyle hizmet vermekteyiz. Ekibimiz, bireysel terapi, aile danışmanlığı, çift terapisi ve grup terapisi gibi geniş bir yelpazede hizmet sunmaktadır. Her bir psikoloğumuz, danışanlarımızın ihtiyaçlarına uygun, kişiye özel yaklaşımlarla destek sağlamaktadır.
            </p>
          </div>

          {/* Expert Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {experts.map((expert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-32 h-32 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border-4 border-white shadow-md" style={{ backgroundColor: expert.bgColor }}>
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: '#00435a' }}>
                    {expert.name}
                  </h3>
                  <p className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: '#00435a', opacity: 0.8 }}>
                    {expert.title}
                  </p>
                  <p className="text-base mb-5 leading-relaxed line-clamp-3" style={{ color: '#00435a', opacity: 0.7 }}>
                    {expert.description}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/uzman/${expert.id}`}
                      className="rounded-md px-6 py-3 text-base font-semibold flex items-center gap-2 hover:opacity-90 hover:shadow-md transition-all inline-flex group"
                      style={{ backgroundColor: '#00435a', color: '#f4f4f4' }}
                    >
                      Profilini Gör
                      <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* İşaret Dili Desteği */}
          <div className="flex justify-center">
            <button className="bg-white border rounded px-5 py-2.5 text-base flex items-center gap-2 hover:bg-gray-50 transition-colors" style={{ borderColor: '#00435a', color: '#00435a' }}>
              <LiaSignLanguageSolid className="text-xl" />
              <span className="font-medium">İşaret Dili Desteği</span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
