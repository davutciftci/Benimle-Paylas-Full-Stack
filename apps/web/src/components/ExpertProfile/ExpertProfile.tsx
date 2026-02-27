import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mic, Video, Clock, Eye } from 'lucide-react';

export default function ExpertProfile() {
  const experts = [
    {
      id: 'davut-ciftci',
      name: "Davut Çiftçi",
      title: "Uzman Klinik Psikolog, Psikoterapist",
      description: "Travma, anksiyete bozuklukları ve depresyon konularında uzmanlaşmıştır. Bilişsel Davranışçı Terapi (BDT) ve EMDR tekniklerini kullanmaktadır.",
      image: "/src/assets/img/davut ciftci.jpg",
      sessionDuration: "50 Dakika",
      price: "2000 TL",
      specialties: ["Sağır Terapist", "Aile Danışmanlığı", "Bireysel Danışmanlık", "Duygu Durum Bozuklukları", "Gelişim Değerlendirme", "İlişki Danışmanlığı", "Kaygı Bozuklukları", "Oyun Terapisi", "Öğrenme Güçlüğü", "Pedagojik Ebeveyn Danışmanlığı", "Psikodestek", "Sınav Kaygısı", "Yas Süreci", "Zeka ve Dikkat Testleri"],
      sessionTypes: ["Mesaj", "Sesli", "Görüntülü"],
      isOnline: true
    },
    {
      id: 'sigmund-freud',
      name: "Sigmund Freud",
      title: "Psikanaliz",
      description: "İlişki sorunları, iletişim problemleri ve aile içi çatışmalar üzerine çalışmaktadır. Duygu Odaklı Çift Terapisi yöntemini benimsemektedir.",
      image: "/src/assets/img/freud.png",
      sessionDuration: "45 Dakika",
      price: "1500 TL",
      specialties: ["Çift Terapisi", "Aile Terapisi", "İlişki Sorunları", "İletişim Problemleri", "Evlilik Danışmanlığı"],
      sessionTypes: ["Mesaj", "Sesli", "Görüntülü"],
      isOnline: true
    },
    {
      id: 'alfred-binet',
      name: "Alfred Binet",
      title: "Bireysel Danışmanlık",
      description: "Özgüven sorunları, stres yönetimi ve kişisel gelişim konularında bireysel danışmanlık hizmeti vermektedir. Varoluşçu terapi ekolünden yararlanır.",
      image: "/src/assets/img/alfred binet.png",
      sessionDuration: "50 Dakika",
      price: "1200 TL",
      specialties: ["Bireysel Terapi", "Özgüven Sorunları", "Stres Yönetimi", "Kişisel Gelişim", "Varoluşsal Terapi"],
      sessionTypes: ["Mesaj", "Görüntülü"],
      isOnline: false
    },
    {
      id: 'carl-jung',
      name: "Carl Gustavt Jung",
      title: "Grup Terapisi",
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
    <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f6f7f8' }}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pt-28">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#1f2937' }}>
            Ekibimizle Tanışın
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#1f2937', opacity: 0.8 }}>
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
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-md" style={{ borderColor: '#1f2937' }}>
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
                    style={{ color: '#13a4ec' }}
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
                      <h3 className="text-2xl font-bold mb-1" style={{ color: '#1f2937' }}>
                        {expert.name}
                      </h3>
                      <p className="text-base mb-3" style={{ color: '#13a4ec' }}>
                        {expert.title}
                      </p>

                      {/* Session Types & Duration */}
                      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm" style={{ color: '#1f2937' }}>
                        {expert.sessionTypes.includes("Mesaj") && (
                          <span className="flex items-center gap-1">
                            <MessageCircle size={16} style={{ color: '#1f2937' }} />
                            Mesaj
                          </span>
                        )}
                        {expert.sessionTypes.includes("Sesli") && (
                          <span className="flex items-center gap-1">
                            <Mic size={16} style={{ color: '#1f2937' }} />
                            Sesli
                          </span>
                        )}
                        {expert.sessionTypes.includes("Görüntülü") && (
                          <span className="flex items-center gap-1">
                            <Video size={16} style={{ color: '#1f2937' }} />
                            Görüntülü
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock size={16} style={{ color: '#1f2937' }} />
                          {expert.sessionDuration}
                        </span>
                        <span className="font-bold" style={{ color: '#13a4ec' }}>
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
                              backgroundColor: '#f6f7f8',
                              color: '#1f2937',
                              border: '1px solid #1f2937'
                            }}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:min-w-[140px]">
                      <Link
                        to={`/expert/${expert.id}`}
                        className="px-4 py-2 text-sm text-center rounded-lg font-medium transition-all border"
                        style={{
                          backgroundColor: 'transparent',
                          color: '#13a4ec',
                          borderColor: '#13a4ec'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#13a4ec';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#13a4ec';
                        }}
                      >
                        HEMEN GÖRÜŞ
                      </Link>
                      <Link
                        to={`/expert/${expert.id}`}
                        className="px-4 py-2 text-sm text-center rounded-lg font-medium transition-all border"
                        style={{
                          backgroundColor: '#13a4ec',
                          color: 'white',
                          borderColor: '#13a4ec'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#13a4ec';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#13a4ec';
                          e.currentTarget.style.color = 'white';
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
