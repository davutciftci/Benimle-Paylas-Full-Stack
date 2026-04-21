import React from 'react';
import { Users, Clock, Shield } from 'lucide-react';

const heroCard =
  'spotlight-static premium-card p-6 flex flex-col items-center text-center group';

export default function Hero() {
  return (
    <section className="py-24 bg-white" id="hizmetler">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-heading mb-4">
            Neden Benimle Paylaş'ı Seçmelisiniz?
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Zihinsel sağlık hizmetlerimizde önceliklerimiz:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={heroCard}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-heading">Kapsamlı Uzman Ağı</h3>
            <p className="text-muted leading-relaxed">
              Farklı uzmanlıklara sahip deneyimli terapistlerden oluşan geniş bir ağ sunuyoruz.
            </p>
          </div>

          <div className={heroCard}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-green-50 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-heading">Esnek Randevu Seçenekleri</h3>
            <p className="text-muted leading-relaxed">
              Yoğun programlarınıza uyum sağlamak için online ve yüz yüze seanslar sunuyoruz.
            </p>
          </div>

          <div className={heroCard}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-heading">Gizlilik ve Güvenlik</h3>
            <p className="text-muted leading-relaxed">
              Kullanıcı verilerinin korunması ve gizliliği en önemli önceliğimizdir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}