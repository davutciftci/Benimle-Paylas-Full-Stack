import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, FileText, Video } from 'lucide-react';

export default function PsychologistApplicationPage() {
    const steps = [
        {
            icon: <UserPlus size={48} />,
            title: 'Başvuru Yap',
            description: 'Üye olun, fotoğrafınızı, CV\'nizi ve diploma bilgilerinizi yükleyerek başvurunuzu gönderin.',
            features: ['Üyelik oluşturma', 'Fotoğraf yükleme', 'CV yükleme', 'Diploma bilgileri']
        },
        {
            icon: <FileText size={48} />,
            title: 'Profil Oluştur',
            description: 'Hangi alanlarda uzmansınız, çalıştığınız alanlar neler gibi bilgileri düzenleyin.',
            features: ['Uzmanlık alanları', 'Çalışma yöntemleri', 'Deneyim bilgileri', 'Seans ücretleri']
        },
        {
            icon: <Video size={48} />,
            title: 'Terapiye Başla',
            description: 'Profiliniz onaylandıktan sonra danışanlarla görüşmeye başlayın.',
            features: ['Online görüşme', 'Randevu yönetimi', 'Danışan takibi', 'Kazanç kontrolü']
        }
    ];

    return (
        <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f4f4f4' }}>
            <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#00435a' }}>
                        Psikolog Başvurusu
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: '#00435a', opacity: 0.8 }}>
                        Benimle Paylaş platformunda psikolog olarak yer alın ve danışanlarınıza online terapi hizmeti sunun.
                    </p>
                </div>

                {/* Steps Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border p-8 text-center hover:shadow-lg transition-all duration-300"
                            style={{ borderColor: '#8aa6b1' }}
                        >
                            {/* Step Number */}
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto"
                                style={{ backgroundColor: '#f28f3b' }}
                            >
                                {index + 1}
                            </div>

                            {/* Icon */}
                            <div className="mb-4 flex justify-center" style={{ color: '#00435a' }}>
                                {step.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-3" style={{ color: '#00435a' }}>
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="mb-4" style={{ color: '#00435a', opacity: 0.8 }}>
                                {step.description}
                            </p>

                            {/* Features */}
                            <ul className="text-left space-y-2">
                                {step.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2" style={{ color: '#00435a' }}>
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f28f3b' }}></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <Link
                        to="/expert-login"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                        style={{ backgroundColor: '#f28f3b' }}
                    >
                        Başvuru Yap
                    </Link>
                    <p className="mt-4 text-sm" style={{ color: '#8aa6b1' }}>
                        Zaten hesabınız var mı?{' '}
                        <Link to="/expert-login" className="underline hover:opacity-80" style={{ color: '#00435a' }}>
                            Giriş yapın
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
