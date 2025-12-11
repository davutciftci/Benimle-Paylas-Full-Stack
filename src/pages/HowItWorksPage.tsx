import React from 'react';
import { Search, CreditCard, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
    const steps = [
        {
            icon: <Search size={64} />,
            number: 1,
            title: 'Psikolog Seç',
            description: 'Uzman psikologlarımız arasından ihtiyaçlarınıza en uygun olanı seçin. Uzmanlık alanları, deneyim ve hasta yorumlarını inceleyerek size en uygun terapisti bulun.',
            color: '#00435a'
        },
        {
            icon: <CreditCard size={64} />,
            number: 2,
            title: 'Ödeme Yap',
            description: 'Güvenli ödeme sistemimiz ile seans ücretinizi ödeyin. Kredi kartı, banka kartı veya havale ile ödeme yapabilirsiniz.',
            color: '#f28f3b'
        },
        {
            icon: <Video size={64} />,
            number: 3,
            title: 'Terapiye Başla',
            description: 'Belirlenen tarihte online görüşmenize katılın. Evinizin konforunda, güvenli bir şekilde terapinize başlayın.',
            color: '#8aa6b1'
        }
    ];

    return (
        <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f4f4f4' }}>
            <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#00435a' }}>
                        Nasıl Çalışır?
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: '#00435a', opacity: 0.8 }}>
                        Sadece 3 adımda online terapi hizmetinden yararlanmaya başlayın
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Line */}
                    <div
                        className="hidden md:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
                        style={{ backgroundColor: '#8aa6b1', opacity: 0.3 }}
                    ></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 border" style={{ borderColor: step.color }}>
                                    {/* Step Number Badge */}
                                    <div
                                        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                                        style={{ backgroundColor: step.color }}
                                    >
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className="mb-6 flex justify-center pt-4" style={{ color: step.color }}>
                                        {step.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#00435a' }}>
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="leading-relaxed" style={{ color: '#00435a', opacity: 0.8 }}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#00435a' }}>
                        Hemen Başlayın
                    </h2>
                    <Link
                        to="/find-therapist"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                        style={{ backgroundColor: '#f28f3b' }}
                    >
                        Psikolog Bul
                    </Link>
                </div>
            </div>
        </div>
    );
}
