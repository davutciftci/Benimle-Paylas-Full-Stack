import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, FileText, Video, CheckCircle, Hand, Shield, Users, Clock } from 'lucide-react';

export default function PsychologistApplicationPage() {
    const steps = [
        {
            icon: <UserPlus size={48} />,
            title: 'Başvuru Yap',
            description: 'Üye olun, fotoğrafınızı, CV\'nizi ve diploma bilgilerinizi yükleyerek başvurunuzu gönderin.',
            features: [
                'Üyelik oluşturma',
                'Fotoğraf yükleme',
                'CV yükleme',
                'Diploma bilgileri',
                'Türk İşaret Dili Sertifikası (MEB Onaylı)'
            ]
        },
        {
            icon: <FileText size={48} />,
            title: 'Profil Oluştur',
            description: 'Hangi alanlarda uzmansınız, çalıştığınız alanlar neler gibi bilgileri düzenleyin.',
            features: [
                'Uzmanlık alanları',
                'Çalışma yöntemleri',
                'Deneyim bilgileri',
                'İşaret dili bilgisi'
            ]
        },
        {
            icon: <Video size={48} />,
            title: 'Terapiye Başla',
            description: 'Profiliniz onaylandıktan sonra danışanlarla görüşmeye başlayın.',
            features: ['Online görüşme', 'Randevu yönetimi', 'Danışan takibi', 'Kazanç kontrolü']
        }
    ];

    const whyChooseUs = [
        {
            icon: <Hand size={32} />,
            title: 'İşaret Dili Desteği',
            description: 'Türk İşaret Dili bilen uzmanlarımız sayesinde Sağır/İşitme engelli danışanlarımıza da hizmet sunuyoruz.'
        },
        {
            icon: <Users size={32} />,
            title: 'Geniş Danışan Kitlesi',
            description: 'Platformumuz üzerinden binlerce danışana ulaşma imkanı.'
        },
        {
            icon: <Shield size={32} />,
            title: 'Güvenli Platform',
            description: 'Tüm görüşmeler şifrelenmiş ve güvenli altyapımızda gerçekleşir.'
        },
        {
            icon: <Clock size={32} />,
            title: 'Esnek Çalışma',
            description: 'Kendi çalışma saatlerinizi belirleyin, istediğiniz yerden çalışın.'
        }
    ];

    return (
        <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f6f7f8' }}>
            <div className="max-w-7xl mx-auto px-4 py-12 pt-28">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                        Psikolog Başvurusu
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto text-muted">
                        Benimle Paylaş platformunda psikolog olarak yer alın ve danışanlarınıza online terapi hizmeti sunun.
                    </p>
                </div>

                {/* Steps Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border p-8 text-center hover:shadow-lg transition-all duration-300"
                            style={{ borderColor: '#1f2937' }}
                        >
                            {/* Step Number */}
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto"
                                style={{ backgroundColor: '#13a4ec' }}
                            >
                                {index + 1}
                            </div>

                            {/* Icon */}
                            <div className="mb-4 flex justify-center" style={{ color: '#1f2937' }}>
                                {step.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-3" style={{ color: '#1f2937' }}>
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="mb-4" style={{ color: '#1f2937', opacity: 0.8 }}>
                                {step.description}
                            </p>

                            {/* Features */}
                            <ul className="text-left space-y-2">
                                {step.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2" style={{ color: '#1f2937' }}>
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#13a4ec' }}></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Sign Language Info Banner */}
                <div
                    className="bg-white rounded-xl shadow-sm border p-6 mb-12 flex flex-col md:flex-row items-center gap-6"
                    style={{ borderColor: '#F9D949', borderWidth: '2px' }}
                >
                    <div className="flex-shrink-0">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#F9D949' }}
                        >
                            <Hand size={32} color="white" />
                        </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold mb-2" style={{ color: '#1f2937' }}>
                            İşaret Dili Biliyor musunuz?
                        </h3>
                        <p style={{ color: '#1f2937', opacity: 0.8 }}>
                            Türk İşaret Dili (TİD) sertifikanızı başvuru sırasında mutlaka paylaşın.
                            Sağır/İşitme engelli danışanlarımıza hizmet verebilecek uzmanlar aramaktayız.
                        </p>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#1f2937' }}>
                        Neden Benimle Paylaş'ı Seçmelisiniz?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyChooseUs.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-all"
                            >
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                                    style={{ backgroundColor: '#1f2937' }}
                                >
                                    {React.cloneElement(item.icon, { color: 'white' })}
                                </div>
                                <h4 className="text-lg font-bold mb-2" style={{ color: '#1f2937' }}>
                                    {item.title}
                                </h4>
                                <p className="text-sm" style={{ color: '#1f2937', opacity: 0.8 }}>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <Link
                        to="/register"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                        style={{ backgroundColor: '#13a4ec' }}
                    >
                        Başvuru Yap
                    </Link>
                    <p className="mt-4 text-sm" style={{ color: '#1f2937' }}>
                        Zaten hesabınız var mı?{' '}
                        <Link to="/login" className="underline hover:opacity-80" style={{ color: '#1f2937' }}>
                            Giriş yapın
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
