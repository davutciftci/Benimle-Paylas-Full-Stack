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
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
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
                <div className="w-24 h-24 rounded-full mb-2 shadow-sm overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-0.5">{expert.name}</h2>
                <p className="text-2xl text-gray-600">{expert.title}</p>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors z-10"
            aria-label="Önceki"
          >
            <ChevronLeft size={16} className="text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors z-10"
            aria-label="Sonraki"
          >
            <ChevronRight size={16} className="text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {experts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentIndex ? 'bg-slate-600 w-4' : 'bg-gray-300'
                  }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}