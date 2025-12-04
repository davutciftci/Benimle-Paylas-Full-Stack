import React from 'react';
import { Users, Clock, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <>
      <div className="text-primary font-nunito bg-white py-12" id="hizmetler">
        <div className="flex flex-col items-center justify-center py-8 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#00435a' }}>
            Neden Benimle Paylaş'ı Seçmelisiniz?
          </h1>
          <p className="text-xl mb-10" style={{ color: '#00435a', opacity: 0.8 }}>
            Zihinsel sağlık hizmetlerimizde önceliklerimiz:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">

            <div className="bg-white flex flex-col items-center justify-start text-center rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f4f4f4' }}>
                <Users className="text-4xl" style={{ color: '#00435a' }} />
              </div>
              <h5 className="mb-2 text-2xl font-semibold" style={{ color: '#00435a' }}>Kapsamlı Uzman Ağı</h5>
              <p className="text-lg leading-relaxed" style={{ color: '#00435a', opacity: 0.8 }}>Farklı uzmanlıklara sahip deneyimli terapistlerden oluşan geniş bir ağ sunuyoruz.</p>
            </div>

            <div className="bg-white flex flex-col items-center justify-start text-center rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f4f4f4' }}>
                <Clock className="text-4xl" style={{ color: '#00435a' }} />
              </div>
              <h5 className="mb-2 text-2xl font-semibold" style={{ color: '#00435a' }}>Esnek Randevu Seçenekleri</h5>
              <p className="text-lg leading-relaxed" style={{ color: '#00435a', opacity: 0.8 }}>Yoğun programlarınıza uyum sağlamak için online ve yüz yüze seanslar sunuyoruz.</p>
            </div>

            <div className="bg-white flex flex-col items-center justify-start text-center rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#f4f4f4' }}>
                <Shield className="text-4xl" style={{ color: '#00435a' }} />
              </div>
              <h5 className="mb-2 text-2xl font-semibold" style={{ color: '#00435a' }}>Gizlilik ve Güvenlik</h5>
              <p className="text-lg leading-relaxed" style={{ color: '#00435a', opacity: 0.8 }}>Kullanıcı verilerinin korunması ve gizliliği en önemli önceliğimizdir.</p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
};