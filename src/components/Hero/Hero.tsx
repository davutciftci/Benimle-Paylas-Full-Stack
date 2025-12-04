import React from 'react';
import { Users, Clock, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <>
      <div className="text-primary font-nunito bg-white py-12" id="hizmetler">
        <div className="flex flex-col items-center justify-center py-8 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Neden Benimle Paylaş'ı Seçmelisiniz?
          </h1>
          <p className="text-xl mb-10 text-gray-600">
            Zihinsel sağlık hizmetlerimizde önceliklerimiz:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">

            <div className="bg-white flex flex-col items-center justify-start text-center rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Users className="text-4xl text-slate-600" />
              </div>
              <h5 className="mb-2 text-2xl font-semibold text-gray-900">Kapsamlı Uzman Ağı</h5>
              <p className="text-lg text-gray-600 leading-relaxed">Farklı uzmanlıklara sahip deneyimli terapistlerden oluşan geniş bir ağ sunuyoruz.</p>
            </div>

            <div className="bg-white flex flex-col items-center justify-start text-center rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-4xl text-slate-600" />
              </div>
              <h5 className="mb-2 text-2xl font-semibold text-gray-900">Esnek Randevu Seçenekleri</h5>
              <p className="text-lg text-gray-600 leading-relaxed">Yoğun programlarınıza uyum sağlamak için online ve yüz yüze seanslar sunuyoruz.</p>
            </div>

            <div className="bg-white flex flex-col items-center justify-start text-center rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-4xl text-slate-600" />
              </div>
              <h5 className="mb-2 text-2xl font-semibold text-gray-900">Gizlilik ve Güvenlik</h5>
              <p className="text-lg text-gray-600 leading-relaxed">Kullanıcı verilerinin korunması ve gizliliği en önemli önceliğimizdir.</p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
};