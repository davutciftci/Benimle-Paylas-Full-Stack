import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mic, Video, Clock, Eye } from 'lucide-react';

export default function ExpertProfile() {
  const experts = [
    {
      id: 'ayse-demir',
      name: "Zeliha Taşkan",
      title: "Uzman Klinik Psikolog, Psikoterapist",
      description: "Travma, anksiyete bozuklukları ve depresyon konularında uzmanlaşmıştır. Bilişsel Davranışçı Terapi (BDT) ve EMDR tekniklerini kullanmaktadır.",
      image: "/src/assets/img/davut ciftci.jpg",
      sessionDuration: "50 Dakika",
      price: "2000 TL",
      specialties: ["Aile Danışmanlığı", "Bireysel Danışmanlık", "Duygu Durum Bozuklukları", "Gelişim Değerlendirme", "İlişki Danışmanlığı", "Kaygı Bozuklukları", "Oyun Terapisi", "Öğrenme Güçlüğü", "Pedagojik Ebeveyn Danışmanlığı", "Psikodestek", "Sınav Kaygısı", "Yas Süreci", "Zeka ve Dikkat Testleri"],
      sessionTypes: ["Mesaj", "Sesli", "Görüntülü"],
      isOnline: true
    },
    {
      id: 'mehmet-yilmaz',
      name: "Uzm. Psk. Mehmet Yılmaz",
      title: "Aile ve Çift Terapisti",
      description: "İlişki sorunları, iletişim problemleri ve aile içi çatışmalar üzerine çalışmaktadır. Duygu Odaklı Çift Terapisi yöntemini benimsemektedir.",
      image: "/src/assets/img/freud.png",
      sessionDuration: "45 Dakika",
      price: "1500 TL",
      specialties: ["Çift Terapisi", "Aile Terapisi", "İlişki Sorunları", "İletişim Problemleri", "Evlilik Danışmanlığı"],
      sessionTypes: ["Mesaj", "Sesli", "Görüntülü"],
      isOnline: true
    },
    {
      id: 'elif-kaya',
      name: "Psk. Dan. Elif Kaya",
      title: "Bireysel Terapist",
      description: "Özgüven sorunları, stres yönetimi ve kişisel gelişim konularında bireysel danışmanlık hizmeti vermektedir. Varoluşçu terapi ekolünden yararlanır.",
      image: "/src/assets/img/Alfred Binet.png",
      sessionDuration: "50 Dakika",
      price: "1200 TL",
      specialties: ["Bireysel Terapi", "Özgüven Sorunları", "Stres Yönetimi", "Kişisel Gelişim", "Varoluşsal Terapi"],
      sessionTypes: ["Mesaj", "Görüntülü"],
      isOnline: false
    },
    {
      id: 'can-arslan',
      name: "Psk. Dan. Can Arslan",
      title: "Grup Terapisti",
      description: "Sosyal anksiyete ve bağımlılık konularında grup terapileri düzenlemektedir. Psikodrama ve grup dinamikleri üzerine odaklanmaktadır.",
      image: "/src/assets/img/Carl Gustavt Jung.png",
      sessionDuration: "60 Dakika",
      price: "1800 TL",
      specialties: ["Grup Terapisi", "Sosyal Anksiyete", "Bağımlılık", "Psikodrama", "Grup Dinamikleri"],
      sessionTypes: ["Sesli", "Görüntülü"],
      isOnline: true
    }
  ];

  return (
    <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f4f4f4' }}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pt-24">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#00435a' }}>
            Ekibimizle Tanışın
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#00435a', opacity: 0.8 }}>
            ZihinSağlığı Kliniği'nde, her biri kendi alanında uzmanlaşmış, deneyimli ve özverili bir psikolog ekibiyle hizmet vermekteyiz.
          </p>
        </div>

        {/* Expert Cards - Full Width Single Column */}
        <div className="space-y-6 mb-10">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{ borderColor: '#e5e7eb' }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Profile Photo */}
                <div className="md:w-48 lg:w-56 flex-shrink-0 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r" style={{ borderColor: '#e5e7eb' }}>
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-md" style={{ borderColor: '#8aa6b1' }}>
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Online Status Indicator */}
                    {expert.isOnline && (
                      <div
                        className="absolute bottom-2 left-2 w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: '#22c55e' }}
                      ></div>
                    )}
                  </div>
                  <Link
                    to={`/expert/${expert.id}`}
                    className="mt-4 text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
                    style={{ color: '#f28f3b' }}
                  >
                    <Eye size={16} />
                    PROFİLİ GÖR
                  </Link>
                </div>

                {/* Right Side - Details */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Info Section */}
                    <div className="flex-1">
                      {/* Name & Title */}
                      <h3 className="text-2xl font-bold mb-1" style={{ color: '#00435a' }}>
                        {expert.name}
                      </h3>
                      <p className="text-base mb-3" style={{ color: '#f28f3b' }}>
                        {expert.title}
                      </p>

                      {/* Session Types & Duration */}
                      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm" style={{ color: '#00435a' }}>
                        {expert.sessionTypes.includes("Mesaj") && (
                          <span className="flex items-center gap-1">
                            <MessageCircle size={16} style={{ color: '#8aa6b1' }} />
                            Mesaj
                          </span>
                        )}
                        {expert.sessionTypes.includes("Sesli") && (
                          <span className="flex items-center gap-1">
                            <Mic size={16} style={{ color: '#8aa6b1' }} />
                            Sesli
                          </span>
                        )}
                        {expert.sessionTypes.includes("Görüntülü") && (
                          <span className="flex items-center gap-1">
                            <Video size={16} style={{ color: '#8aa6b1' }} />
                            Görüntülü
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock size={16} style={{ color: '#8aa6b1' }} />
                          {expert.sessionDuration}
                        </span>
                        <span className="font-bold" style={{ color: '#f28f3b' }}>
                          {expert.price}
                        </span>
                      </div>

                      {/* Specialties Tags */}
                      <div className="flex flex-wrap gap-2">
                        {expert.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-sm rounded-full"
                            style={{
                              backgroundColor: '#f4f4f4',
                              color: '#00435a',
                              border: '1px solid #8aa6b1'
                            }}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 lg:min-w-[160px]">
                      <Link
                        to={`/expert/${expert.id}`}
                        className="px-6 py-3 text-center rounded-lg font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
                        style={{ backgroundColor: '#00435a' }}
                      >
                        HEMEN GÖRÜŞ
                      </Link>
                      <Link
                        to={`/expert/${expert.id}`}
                        className="px-6 py-3 text-center rounded-lg font-semibold transition-all hover:opacity-90 hover:shadow-md"
                        style={{
                          backgroundColor: '#f28f3b',
                          color: 'white'
                        }}
                      >
                        Randevu Al
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
