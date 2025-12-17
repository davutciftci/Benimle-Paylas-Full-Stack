import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  bgColor: string;
  specialties: string[];
  experience: string;
  education: string;
  languages: string[];
}

export default function ExpertDetailPage() {
  const { id } = useParams<{ id: string }>();

  const experts: Expert[] = [
    {
      id: 'davut-ciftci',
      name: "Davut Çiftçi",
      title: "Uzman Klinik Psikolog, Psikoterapist",
      description: "Travma, anksiyete bozuklukları ve depresyon konularında uzmanlaşmıştır.",
      fullDescription: "Davut Çiftçi, travma, anksiyete bozuklukları ve depresyon konularında uzmanlaşmış bir klinik psikologdur. Bilişsel Davranışçı Terapi (BDT) ve EMDR tekniklerini kullanarak danışanlarına destek sağlamaktadır. Sağır terapist olarak işitme engelli danışanlara da hizmet vermektedir.",
      image: "/src/assets/img/davut ciftci.jpg",
      bgColor: "bg-slate-50",
      specialties: ["Sağır Terapist", "Travma Terapisi", "Anksiyete Bozuklukları", "Depresyon", "BDT", "EMDR"],
      experience: "10+ Yıl",
      education: "İstanbul Üniversitesi - Psikoloji Lisans, Klinik Psikoloji Yüksek Lisans",
      languages: ["Türkçe", "İşaret Dili"]
    },
    {
      id: 'sigmund-freud',
      name: "Sigmund Freud",
      title: "Psikanaliz",
      description: "İlişki sorunları, iletişim problemleri ve aile içi çatışmalar üzerine çalışmaktadır.",
      fullDescription: "Sigmund Freud, psikanalizin kurucusu olarak bilinmektedir. İlişki sorunları, iletişim problemleri ve aile içi çatışmalar üzerine çalışmaktadır. Duygu Odaklı Çift Terapisi yöntemini benimsemektedir.",
      image: "/src/assets/img/freud.png",
      bgColor: "bg-orange-50",
      specialties: ["Çift Terapisi", "Aile Terapisi", "İletişim Problemleri", "Psikanaliz"],
      experience: "8 Yıl",
      education: "Viyana Üniversitesi - Tıp Lisans, Psikanaliz Uzmanlık",
      languages: ["Türkçe", "Almanca"]
    },
    {
      id: 'alfred-binet',
      name: "Alfred Binet",
      title: "Bireysel Danışmanlık",
      description: "Özgüven sorunları, stres yönetimi ve kişisel gelişim konularında bireysel danışmanlık hizmeti vermektedir.",
      fullDescription: "Alfred Binet, bireysel terapi alanında uzmanlaşmıştır. Özgüven sorunları, stres yönetimi ve kişisel gelişim konularında bireysel danışmanlık hizmeti vermektedir. Varoluşçu terapi ekolünden yararlanır ve danışanlarının yaşam anlamını bulmalarına yardımcı olmaktadır.",
      image: "/src/assets/img/alfred binet.png",
      bgColor: "bg-orange-50",
      specialties: ["Bireysel Terapi", "Özgüven Sorunları", "Stres Yönetimi", "Varoluşçu Terapi"],
      experience: "6 Yıl",
      education: "Sorbonne Üniversitesi - Psikoloji Lisans",
      languages: ["Türkçe", "Fransızca"]
    },
    {
      id: 'carl-jung',
      name: "Carl Gustavt Jung",
      title: "Grup Terapisi",
      description: "Sosyal anksiyete ve bağımlılık konularında grup terapileri düzenlemektedir.",
      fullDescription: "Carl Gustav Jung, grup terapisi alanında uzmanlaşmıştır. Sosyal anksiyete ve bağımlılık konularında grup terapileri düzenlemektedir. Psikodrama ve grup dinamikleri üzerine odaklanmaktadır. Analitik psikolojinin kurucusudur.",
      image: "/src/assets/img/Carl Gustavt Jung.png",
      bgColor: "bg-slate-50",
      specialties: ["Grup Terapisi", "Sosyal Anksiyete", "Bağımlılık", "Psikodrama", "Analitik Psikoloji"],
      experience: "7 Yıl",
      education: "Basel Üniversitesi - Tıp Lisans, Psikiyatri Uzmanlık",
      languages: ["Türkçe", "Almanca", "İngilizce"]
    }
  ];

  const expert = experts.find(e => e.id === id);

  if (!expert) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Uzman bulunamadı</h1>
          <Link to="/experts" className="text-slate-600 hover:underline">
            Uzmanlar sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: '#F0F0F0' }}>
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Back Button - Smaller and Outline */}
        <Link
          to="/experts"
          className="inline-flex items-center mb-4 px-3 py-1.5 text-sm rounded-lg font-medium transition-all border-2"
          style={{ backgroundColor: 'transparent', color: '#3C486B', borderColor: '#3C486B' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3C486B';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#3C486B';
          }}
        >
          <ArrowLeft size={14} className="mr-1.5" />
          Uzmanlar Sayfasına Dön
        </Link>

        {/* Expert Header */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-6">
          <div className="flex flex-col gap-5">
            {/* Image Centered */}
            <div className={`w-32 h-32 ${expert.bgColor} rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden mx-auto`}>
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold mb-1" style={{ color: '#3C486B' }}>{expert.name}</h1>
              <p className="text-base mb-3" style={{ color: '#3C486B', opacity: 0.8 }}>{expert.title}</p>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#3C486B' }}>{expert.fullDescription}</p>

              <Link
                to="/login"
                className="inline-flex items-center rounded px-4 py-2 transition-all font-medium border-2"
                style={{
                  backgroundColor: 'transparent',
                  color: '#F45050',
                  borderColor: '#F45050'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F45050';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#F45050';
                }}
              >
                <Calendar size={14} className="mr-1.5" />
                Randevu Al
              </Link>
            </div>
          </div>
        </div>

        {/* Expert Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Specialties */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-base font-bold text-gray-900 mb-3">Uzmanlık Alanları</h2>
            <div className="flex flex-wrap gap-1.5">
              {expert.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-slate-100 text-slate-700 rounded-full px-2 py-0.5 text-xs"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Experience & Education */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-base font-bold text-gray-900 mb-3">Deneyim & Eğitim</h2>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Deneyim</p>
                <p className="text-sm text-gray-900 font-medium">{expert.experience}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Eğitim</p>
                <p className="text-xs text-gray-900">{expert.education}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Diller</p>
                <p className="text-sm text-gray-900">{expert.languages.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

