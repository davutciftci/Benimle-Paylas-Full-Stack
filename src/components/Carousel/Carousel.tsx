import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const experts = [
    {
      name: "Dr. Elif Demir",
      title: "Klinik Psikolog",
      image: "/src/assets/img/davut ciftci.jpg"
    },
    {
      name: "Dr. Can Yılmaz",
      title: "Aile Terapisti",
      image: "/src/assets/img/freud.png"
    },
    {
      name: "Dr. Ayşe Kaya",
      title: "Danışman",
      image: "/src/assets/img/Alfred Binet.png"
    },
    {
      name: "Dr. Mehmet Öztürk",
      title: "Psikiyatrist",
      image: "/src/assets/img/Carl Gustavt Jung.png"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % experts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + experts.length) % experts.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="text-primary font-nunito bg-white flex flex-col items-center justify-center py-8 px-4 text-center relative">
        <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#3C486B' }}>
          Uzmanlarımızla Tanışın
        </h1>

        <div className="relative w-full max-w-3xl overflow-hidden">
          {/* Carousel Container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {experts.map((expert, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col items-center justify-center text-center px-4"
              >
                <div className="w-24 h-24 rounded-full mb-2 shadow-sm overflow-hidden flex items-center justify-center mx-auto" style={{ backgroundColor: '#F0F0F0' }}>
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-semibold mb-0.5" style={{ color: '#3C486B' }}>{expert.name}</h2>
                <p className="text-2xl" style={{ color: '#3C486B', opacity: 0.8 }}>{expert.title}</p>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors z-10"
            style={{ borderColor: '#3C486B' }}
            aria-label="Önceki"
          >
            <ChevronLeft size={16} style={{ color: '#3C486B' }} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors z-10"
            style={{ borderColor: '#3C486B' }}
            aria-label="Sonraki"
          >
            <ChevronRight size={16} style={{ color: '#3C486B' }} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {experts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all ${index === currentIndex ? 'w-4' : 'w-1.5'} h-1.5`}
                style={{ backgroundColor: index === currentIndex ? '#3C486B' : '#F0F0F0' }}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}