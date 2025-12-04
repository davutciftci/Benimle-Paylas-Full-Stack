import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                className="flex justify-between items-center w-full py-4 px-6 text-left focus:outline-none hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-medium text-gray-800">{question}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const faqs = [
        {
            question: "Terapi süreci nasıl işler?",
            answer: "Terapi süreci, sizin ihtiyaçlarınıza ve hedeflerinize göre şekillenir. İlk seansta genellikle tanışma ve durum değerlendirmesi yapılır. Daha sonra uzmanınızla birlikte belirleyeceğiniz sıklıkta (genellikle haftada bir) görüşmeler devam eder."
        },
        {
            question: "Online terapi güvenli midir?",
            answer: "Evet, platformumuz üzerinden yapılan tüm görüşmeler uçtan uca şifreleme ile korunmaktadır. Gizliliğiniz bizim için en önemli önceliktir."
        },
        {
            question: "Hangi uzmanı seçmeliyim?",
            answer: "Uzmanlar sayfamızdaki filtreleri kullanarak ihtiyaç duyduğunuz alanda uzmanlaşmış terapistleri bulabilirsiniz. Ayrıca uzman profillerini inceleyerek özgeçmişleri ve çalışma alanları hakkında detaylı bilgi edinebilirsiniz."
        },
        {
            question: "Seans ücretleri nedir?",
            answer: "Seans ücretleri uzmanların deneyimine ve uzmanlık alanına göre değişiklik gösterebilir. Her uzmanın profilinde seans ücretleri açıkça belirtilmektedir."
        },
        {
            question: "Randevumu iptal edebilir miyim?",
            answer: "Evet, randevu saatinizden 24 saat öncesine kadar randevunuzu ücretsiz olarak iptal edebilir veya erteleyebilirsiniz."
        }
    ];

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Sıkça Sorulan Sorular
                </h2>
                <p className="mt-4 text-xl text-gray-500">
                    Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
                </p>
            </div>
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    );
};

export default FAQ;
