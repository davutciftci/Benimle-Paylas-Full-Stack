import React from 'react';
import { Link } from 'react-router-dom';

export default function Section() {
  return (
    <>
      <div
        className="relative min-h-[calc(70vh-3rem)] flex items-end justify-center overflow-hidden pt-5 pb-8"
        style={{ background: '#3C486B' }}
      >
        {/* Yeni tasarlanmış arka plan deseni - #3C486B teması ile */}
        <div className="absolute inset-0" style={{ opacity: 0.15 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: '#3C486B',
            }}
          >
          </div>
        </div>

        {/* Dekoratif elementler */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 -left-10 w-40 h-40 rounded-full"

          ></div>
          <div
            className="absolute bottom-1/4 -right-10 w-60 h-60 rounded-full"
          ></div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1
            className="font-nunito text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: '#F0F0F0',
              textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            Zihinsel sağlığınız önemlidir
          </h1>
          <p
            className="font-nunito text-lg md:text-xl mb-6 max-w-lg mx-auto"
            style={{
              color: '#F0F0F0',
              textShadow: '1px 1px 4px rgba(0,0,0,0.2)'
            }}
          >
            Lisanslı terapistlerimizle güvenli ve destekleyici bir ortamda zihinsel sağlık yolculuğunuza başlayın.
          </p>
          <Link
            to="/find-therapist"
            className="font-nunito rounded-md text-sm px-5 py-2.5 text-center transition-all duration-300 border-2"
            style={{
              color: '#F45050',
              backgroundColor: 'transparent',
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
            Randevu Al
          </Link>
        </div>
      </div>
    </>
  )
}
