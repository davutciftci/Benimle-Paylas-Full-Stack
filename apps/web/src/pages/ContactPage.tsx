import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log('Form submitted:', formData);
        alert('Mesajınız başarıyla gönderildi!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="font-nunito min-h-screen pt-28 pb-12" style={{ backgroundColor: '#f6f7f8' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1f2937' }}>
                        İletişime Geçin
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: '#1f2937', opacity: 0.8 }}>
                        Sorularınız, önerileriniz veya destek talepleriniz için bize her zaman ulaşabilirsiniz.
                        Ekibimiz size en kısa sürede dönüş yapacaktır.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border" style={{ borderColor: '#f6f7f8' }}>
                            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1f2937' }}>
                                İletişim Bilgileri
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1" style={{ color: '#1f2937' }}>E-posta</h3>
                                        <p style={{ color: '#1f2937' }}>info@benimlepaylas.com</p>
                                        <p style={{ color: '#1f2937' }}>destek@benimlepaylas.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1" style={{ color: '#1f2937' }}>Telefon</h3>
                                        <p style={{ color: '#1f2937' }}>+90 (212) 555 0123</p>
                                        <p style={{ color: '#1f2937' }}>Hafta içi: 09:00 - 18:00</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1" style={{ color: '#1f2937' }}>Ofis</h3>
                                        <p style={{ color: '#1f2937' }}>
                                            Levent Mah. Büyükdere Cad. No:123<br />
                                            Şişli, İstanbul 34394
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-white rounded-2xl p-2 shadow-lg h-64 overflow-hidden border relative" style={{ borderColor: '#f6f7f8' }}>
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                <p style={{ color: '#1f2937' }}>Harita Görünümü</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border" style={{ borderColor: '#f6f7f8' }}>
                        <h2 className="text-2xl font-bold mb-6" style={{ color: '#1f2937' }}>
                            Mesaj Gönderin
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#1f2937' }}>Ad Soyad</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all"
                                    style={{ borderColor: '#e5e7eb' }}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#1f2937' }}>E-posta</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all"
                                    style={{ borderColor: '#e5e7eb' }}
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: '#1f2937' }}>Konu</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all"
                                    style={{ borderColor: '#e5e7eb' }}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#1f2937' }}>Mesajınız</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all resize-none"
                                    style={{ borderColor: '#e5e7eb' }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-lg font-bold text-white shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
                                style={{ backgroundColor: '#13a4ec' }}
                            >
                                <Send size={20} />
                                Gönder
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
