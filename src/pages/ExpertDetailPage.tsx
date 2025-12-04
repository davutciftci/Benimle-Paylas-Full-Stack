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
  email: string;
  phone: string;
}

export default function ExpertDetailPage() {
  const { id } = useParams<{ id: string }>();

  const experts: Expert[] = [
    {
      id: 'ayse-demir',
      name: "Dr. Ayşe Demir",
      title: "Klinik Psikolog",
      description: "Travma, anksiyete bozuklukları ve depresyon konularında uzmanlaşmıştır.",
      fullDescription: "Dr. Ayşe Demir, 10 yılı aşkın deneyime sahip bir klinik psikologdur. Travma, anksiyete bozuklukları ve depresyon konularında uzmanlaşmıştır. Bilişsel Davranışçı Terapi (BDT) ve EMDR tekniklerini kullanarak danışanlarına destek sağlamaktadır. Empatik yaklaşımı ve kişiselleştirilmiş tedavi planları ile tanınmaktadır.",
      image: "/src/assets/img/davut ciftci.jpg",
      bgColor: "bg-slate-50",
      specialties: ["Travma Terapisi", "Anksiyete Bozuklukları", "Depresyon", "BDT", "EMDR"],
      experience: "10+ Yıl",
      education: "İstanbul Üniversitesi - Psikoloji Lisans, Klinik Psikoloji Yüksek Lisans",
      languages: ["Türkçe", "İngilizce"],
      email: "ayse.demir@mindfulcare.com",
      phone: "+90 212 123 45 67"
    },
    {
      id: 'mehmet-yilmaz',
      name: "Uzm. Psk. Mehmet Yılmaz",
      title: "Aile ve Çift Terapisti",
      description: "İlişki sorunları, iletişim problemleri ve aile içi çatışmalar üzerine çalışmaktadır.",
      fullDescription: "Uzm. Psk. Mehmet Yılmaz, aile ve çift terapisi alanında 8 yıllık deneyime sahiptir. İlişki sorunları, iletişim problemleri ve aile içi çatışmalar üzerine çalışmaktadır. Duygu Odaklı Çift Terapisi (EFT) yöntemini benimsemektedir. Çiftlerin ve ailelerin daha sağlıklı ilişkiler kurmasına yardımcı olmaktadır.",
      image: "/src/assets/img/freud.png",
      bgColor: "bg-orange-50",
      specialties: ["Çift Terapisi", "Aile Terapisi", "İletişim Problemleri", "EFT"],
      experience: "8 Yıl",
      education: "Ankara Üniversitesi - Psikoloji Lisans, Aile ve Çift Terapisi Yüksek Lisans",
      languages: ["Türkçe"],
      email: "mehmet.yilmaz@mindfulcare.com",
      phone: "+90 212 123 45 68"
    },
    {
      id: 'elif-kaya',
      name: "Psk. Dan. Elif Kaya",
      title: "Bireysel Terapist",
      description: "Özgüven sorunları, stres yönetimi ve kişisel gelişim konularında bireysel danışmanlık hizmeti vermektedir.",
      fullDescription: "Psk. Dan. Elif Kaya, bireysel terapi alanında 6 yıllık deneyime sahiptir. Özgüven sorunları, stres yönetimi ve kişisel gelişim konularında bireysel danışmanlık hizmeti vermektedir. Varoluşçu terapi ekolünden yararlanır ve danışanlarının yaşam anlamını bulmalarına yardımcı olmaktadır.",
      image: "/src/assets/img/Alfred Binet.png",
      bgColor: "bg-orange-50",
      specialties: ["Bireysel Terapi", "Özgüven Sorunları", "Stres Yönetimi", "Varoluşçu Terapi"],
      experience: "6 Yıl",
      education: "Boğaziçi Üniversitesi - Psikoloji Lisans, Psikolojik Danışmanlık Yüksek Lisans",
      languages: ["Türkçe", "İngilizce"],
      email: "elif.kaya@mindfulcare.com",
      phone: "+90 212 123 45 69"
    },
    {
      id: 'can-arslan',
      name: "Psk. Dan. Can Arslan",
      title: "Grup Terapisti",
      description: "Sosyal anksiyete ve bağımlılık konularında grup terapileri düzenlemektedir.",
      fullDescription: "Psk. Dan. Can Arslan, grup terapisi alanında 7 yıllık deneyime sahiptir. Sosyal anksiyete ve bağımlılık konularında grup terapileri düzenlemektedir. Psikodrama ve grup dinamikleri üzerine odaklanmaktadır. Grup ortamında bireylerin birbirlerinden öğrenmelerini ve destek almalarını sağlamaktadır.",
      image: "/src/assets/img/Carl Gustavt Jung.png",
      bgColor: "bg-slate-50",
      specialties: ["Grup Terapisi", "Sosyal Anksiyete", "Bağımlılık", "Psikodrama"],
      experience: "7 Yıl",
      education: "Hacettepe Üniversitesi - Psikoloji Lisans, Klinik Psikoloji Yüksek Lisans",
      languages: ["Türkçe"],
      email: "can.arslan@mindfulcare.com",
      phone: "+90 212 123 45 70"
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
    <div className="min-h-screen bg-white -mt-10 pt-10">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link
          to="/experts"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 text-xs"
        >
          <ArrowLeft size={14} className="mr-1.5" />
          Uzmanlar sayfasına dön
        </Link>

        {/* Expert Header */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-5">
            <div className={`w-32 h-32 ${expert.bgColor} rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden mx-auto md:mx-0`}>
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-1">{expert.name}</h1>
              <p className="text-base text-slate-600 mb-3">{expert.title}</p>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">{expert.fullDescription}</p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-3 mb-4">
                <a href={`mailto:${expert.email}`} className="flex items-center text-gray-600 hover:text-slate-600 text-xs">
                  <Mail size={14} className="mr-1.5" />
                  {expert.email}
                </a>
                <a href={`tel:${expert.phone}`} className="flex items-center text-gray-600 hover:text-slate-600 text-xs">
                  <Phone size={14} className="mr-1.5" />
                  {expert.phone}
                </a>
              </div>

              <Link
                to="/find-therapist"
                className="inline-flex items-center bg-gradient-to-r from-slate-500 to-slate-700 text-white rounded px-3 py-1.5 hover:from-slate-600 hover:to-slate-800 transition-all text-xs font-medium"
              >
                <Calendar size={12} className="mr-1.5" />
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

