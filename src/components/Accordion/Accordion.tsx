import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: AccordionItem[] = [
    {
      question: "İlk seansımda ne beklemeliyim?",
      answer: "İlk seansınızda terapistiniz sizinle tanışacak, sorunlarınızı dinleyecek ve tedavi planınızı oluşturmak için gerekli bilgileri toplayacaktır. Bu seans, karşılıklı güven oluşturmak ve beklentilerinizi belirlemek için önemlidir."
    },
    {
      question: "Seans ücretleri ne kadar?",
      answer: "Seans ücretleri, terapistin deneyimi ve uzmanlık alanına göre değişiklik göstermektedir. Detaylı fiyat bilgisi için lütfen randevu alırken veya terapist profillerini incelerken fiyat bilgilerine bakabilirsiniz."
    },
    {
      question: "Terapi ne kadar sürer?",
      answer: "Terapi süresi, kişinin ihtiyaçlarına ve sorunlarının karmaşıklığına bağlı olarak değişir. Bazı durumlarda birkaç seans yeterli olurken, daha karmaşık durumlarda daha uzun süreli terapi gerekebilir. Terapistiniz sizinle birlikte uygun bir tedavi planı oluşturacaktır."
    },
    {
      question: "Online terapi yüz yüze terapi kadar etkili mi?",
      answer: "Araştırmalar, online terapi'nin birçok durumda yüz yüze terapi kadar etkili olduğunu göstermektedir. Online terapi, özellikle zaman ve mekan kısıtlaması olan kişiler için uygun bir seçenektir. Terapistiniz, sizin durumunuza en uygun seans tipini belirlemenize yardımcı olacaktır."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="text-primary font-nunito w-full flex bg-white py-12" id="sss">
        <div className="w-full max-w-3xl mx-auto px-4">
          <div className="text-center mb-8 space-y-2">
            <h1 className='text-2xl md:text-3xl font-bold' style={{ color: '#1f2937' }}>Sıkça Sorulan Sorular</h1>
            <p className='text-sm' style={{ color: '#1f2937', opacity: 0.8 }}>Hizmetlerimiz hakkında merak ettiğiniz her şey burada.</p>
          </div>

          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="mb-1 border border-gray-200 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex items-center justify-between w-full p-3 font-normal bg-white hover:bg-gray-50 transition-colors text-left"
                  style={{ color: '#1f2937' }}
                >
                  <span className="text-sm font-medium">{item.question}</span>
                  {openIndex === index ? (
                    <Minus className="flex-shrink-0 ml-3" size={16} style={{ color: '#1f2937', opacity: 0.7 }} />
                  ) : (
                    <Plus className="flex-shrink-0 ml-3" size={16} style={{ color: '#1f2937', opacity: 0.7 }} />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-3 border-t border-gray-200" style={{ backgroundColor: '#f6f7f8' }}>
                    <p className="leading-relaxed text-xs" style={{ color: '#1f2937', opacity: 0.9 }}>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Accordion