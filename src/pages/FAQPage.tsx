import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b last:border-0" style={{ borderColor: '#f6f7f8' }}>
            <button
                className="flex justify-between items-center w-full py-4 px-6 text-left focus:outline-none hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-medium" style={{ color: '#1f2937' }}>{question}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5" style={{ color: '#13a4ec' }} />
                ) : (
                    <ChevronDown className="w-5 h-5" style={{ color: '#1f2937' }} />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-6 pt-0 leading-relaxed" style={{ color: '#1f2937', opacity: 0.8 }}>
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default function FAQPage() {
    const faqs = [
        {
            question: "Terapi süreci nasıl işler?",
            answer: "Terapi süreci, sizin ihtiyaçlarınıza ve hedeflerinize göre şekillenir. İlk seansta genellikle tanışma ve durum değerlendirmesi yapılır. Daha sonra uzmanınızla birlikte belirleyeceğiniz sıklıkta (genellikle haftada bir) görüşmeler devam eder."
        },
        {
            question: "Online terapi güvenli midir?",
            answer: "Evet, online terapi tamamen güvenlidir. Tüm görüşmeler şifreli bağlantılar üzerinden gerçekleştirilir ve kişisel verileriniz KVKK kapsamında korunmaktadır. Uzmanlarımız da etik kurallara bağlıdır."
        },
        {
            question: "Seans ücretleri ne kadar?",
            answer: "Seans ücretleri uzmanın deneyimine ve uzmanlık alanına göre değişiklik gösterir. Genel olarak 500 TL ile 2000 TL arasında fiyatlar yer almaktadır. Her uzmanın profil sayfasında güncel ücret bilgisini görebilirsiniz."
        },
        {
            question: "Randevumu nasıl iptal edebilirim?",
            answer: "Randevunuzu, görüşme saatinden en az 24 saat önce iptal etmeniz gerekmektedir. Kullanıcı panelinizden veya uzmanınıza mesaj göndererek iptal işlemini gerçekleştirebilirsiniz."
        },
        {
            question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
            answer: "Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Tüm ödemeler güvenli ödeme altyapısı üzerinden gerçekleştirilmektedir."
        },
        {
            question: "İşaret dili desteği var mı?",
            answer: "Evet, platformumuzda Türk İşaret Dili (TİD) bilen uzmanlar bulunmaktadır. Sağır ve işitme engelli danışanlarımız bu uzmanlardan hizmet alabilir. Uzman arama sayfasından işaret dili bilen uzmanları filtreleyebilirsiniz."
        }
    ];

    return (
        <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f6f7f8' }}>
            <div className="max-w-4xl mx-auto px-4 py-12 pt-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: '#1f2937' }}
                    >
                        <HelpCircle size={32} color="white" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1f2937' }}>
                        Sıkça Sorulan Sorular
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: '#1f2937', opacity: 0.8 }}>
                        Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden border" style={{ borderColor: '#f6f7f8' }}>
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center">
                    <p className="mb-4" style={{ color: '#1f2937', opacity: 0.8 }}>
                        Sorunuzun cevabını bulamadınız mı?
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: '#13a4ec' }}
                    >
                        Bize Ulaşın
                    </a>
                </div>
            </div>
        </div>
    );
}
