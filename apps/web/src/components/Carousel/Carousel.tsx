import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { Expert } from '../../types';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await api.experts.getAll();
        if (response.success && response.data) {
          // Yalnızca profili doldurulmuş uzmanları listele (Örn: resmi olanlar öncelikli)
          const validExperts = response.data.data.filter((e: Expert) => e.user?.firstName);
          setExperts(validExperts);
        }
      } catch (error) {
        console.error("Uzmanlar Carousel'a yüklenemedi", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperts();
  }, []);

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
        <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1f2937' }}>
          Uzmanlarımızla Tanışın
        </h1>

        <div className="relative w-full max-w-3xl overflow-hidden">
          {/* Carousel Container */}
          {isLoading ? (
            <div className="py-12 flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div></div>
          ) : experts.length === 0 ? (
            <div className="py-12 flex justify-center text-gray-400 font-medium">Uzman bulunamadı.</div>
          ) : (
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {experts.map((expert, index) => (
                <div
                  key={index}
                  className="min-w-full flex flex-col items-center justify-center text-center px-4"
                >
                  <div className="w-48 h-48 rounded-full mb-4 shadow-md overflow-hidden flex items-center justify-center mx-auto bg-gray-100">
                    {expert.profilePhotoUrl ? (
                      <img
                        src={expert.profilePhotoUrl}
                        alt={`${expert.user?.firstName || ''} ${expert.user?.lastName || ''}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
                        }}
                      />
                    ) : (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                        alt="Placeholder"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-1 text-gray-900">
                    {expert.user?.firstName} {expert.user?.lastName}
                  </h2>
                  {expert.title?.name && (
                    <p className="text-lg text-blue-600 font-semibold bg-blue-50 px-4 py-1.5 rounded-full inline-block">
                      {expert.title.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors z-10"
            style={{ borderColor: '#1f2937' }}
            aria-label="Önceki"
          >
            <ChevronLeft size={16} style={{ color: '#1f2937' }} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors z-10"
            style={{ borderColor: '#1f2937' }}
            aria-label="Sonraki"
          >
            <ChevronRight size={16} style={{ color: '#1f2937' }} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {experts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all ${index === currentIndex ? 'w-4' : 'w-1.5'} h-1.5`}
                style={{ backgroundColor: index === currentIndex ? '#1f2937' : '#f6f7f8' }}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}