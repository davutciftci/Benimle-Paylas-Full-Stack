import React from 'react';
import { Users, Clock, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <>
      <div className="font-nunito bg-white py-10" id="hizmetler">
        <div className="flex flex-col items-center justify-center py-6 text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
            Neden Benimle Paylaş'ı Seçmelisiniz?
          </h2>
          <p className="text-base mb-8 text-gray-600">
            Zihinsel sağlık hizmetlerimizde önceliklerimiz:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-6xl">

            <div className="bg-white flex flex-col items-center justify-start text-center rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-blue-50">
                <Users className="w-7 h-7 text-blue-500" />
              </div>
              <h5 className="mb-2 text-lg font-semibold text-gray-900">Kapsamlı Uzman Ağı</h5>
              <p className="text-sm leading-relaxed text-gray-600">Farklı uzmanlıklara sahip deneyimli terapistlerden oluşan geniş bir ağ sunuyoruz.</p>
            </div>

            <div className="bg-white flex flex-col items-center justify-start text-center rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-blue-50">
                <Clock className="w-7 h-7 text-blue-500" />
              </div>
              <h5 className="mb-2 text-lg font-semibold text-gray-900">Esnek Randevu Seçenekleri</h5>
              <p className="text-sm leading-relaxed text-gray-600">Yoğun programlarınıza uyum sağlamak için online ve yüz yüze seanslar sunuyoruz.</p>
            </div>

            <div className="bg-white flex flex-col items-center justify-start text-center rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-blue-50">
                <Shield className="w-7 h-7 text-blue-500" />
              </div>
              <h5 className="mb-2 text-lg font-semibold text-gray-900">Gizlilik ve Güvenlik</h5>
              <p className="text-sm leading-relaxed text-gray-600">Kullanıcı verilerinin korunması ve gizliliği en önemli önceliğimizdir.</p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
};