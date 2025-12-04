import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <>
      <div
        className="relative min-h-[calc(70vh-3rem)] flex items-end justify-center overflow-hidden pt-5 pb-8"
        style={{ background: 'linear-gradient(135deg, #00435a 0%, #005266 25%, #00435a 50%, #003a4d 75%, #00435a 100%)' }}
      >
        {/* Yeni tasarlanmış arka plan deseni - #00435a teması ile */}
        <div className="absolute inset-0" style={{ opacity: 0.15 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f4f4f4' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
          </div>
        </div>

        {/* Dekoratif elementler */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 -left-10 w-40 h-40 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(244,244,244,0.1) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          ></div>
          <div
            className="absolute bottom-1/4 -right-10 w-60 h-60 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(244,244,244,0.08) 0%, transparent 70%)',
              filter: 'blur(50px)'
            }}
          ></div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1
            className="font-nunito text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: '#f4f4f4',
              textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            Zihinsel sağlığınız önemlidir
          </h1>
          <p
            className="font-nunito text-lg md:text-xl mb-6 max-w-lg mx-auto"
            style={{
              color: '#f4f4f4',
              textShadow: '1px 1px 4px rgba(0,0,0,0.2)'
            }}
          >
            Lisanslı terapistlerimizle güvenli ve destekleyici bir ortamda zihinsel sağlık yolculuğunuza başlayın.
          </p>
          <Link
            to="/find-therapist"
            className="hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 mt-4 rounded px-6 py-3 text-base font-medium text-center shadow-lg inline-block"
            style={{
              backgroundColor: '#f4f4f4',
              color: '#00435a',
              border: '2px solid #f4f4f4'
            }}
          >
            Randevu Al
          </Link>
        </div>
      </div>
    </>
  )
}