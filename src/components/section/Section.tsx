import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative min-h-[calc(70vh-3rem)] flex items-end justify-center overflow-hidden pt-5 pb-8">
        {/* Arka plan görseli için gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-900/0 to-slate-900/0">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}>
          </div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="font-nunito drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)] text-4xl md:text-5xl font-bold mb-4 text-white">
            Zihinsel sağlığınız önemlidir
          </h1>
          <p className="font-nunito drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)] text-lg md:text-xl mb-6 text-white max-w-lg mx-auto">
            Lisanslı terapistlerimizle güvenli ve destekleyici bir ortamda zihinsel sağlık yolculuğunuza başlayın.
          </p>
          <Link
            to="/find-therapist"
            className="bg-gradient-to-r from-slate-500 to-slate-700 text-white hover:from-slate-600 hover:to-slate-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 mt-4 rounded px-6 py-3 text-base font-medium text-center shadow-sm inline-block"
          >
            Randevu Al
          </Link>
        </div>
      </div>
    </>
  )
}