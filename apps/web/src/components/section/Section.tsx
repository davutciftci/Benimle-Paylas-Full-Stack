import React from 'react';
import SignText from '../SignLanguage/SignText';
import { useNavigate } from 'react-router-dom';

export default function Section() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="relative min-h-[calc(50vh-3rem)] flex items-center justify-center overflow-hidden py-12"
        style={{ background: '#f6f7f8' }}
      >
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-nunito text-3xl md:text-2xl font-bold mb-3 text-gray-900">
            <SignText>Zihinsel sağlığınız önemlidir</SignText>
          </h1>
          <p className="font-nunito text-base md:text-lg mb-5 max-w-lg mx-auto text-gray-600">
            <SignText>
              Lisanslı terapistlerimizle güvenli ve destekleyici bir ortamda zihinsel sağlık yolculuğunuza başlayın.
            </SignText>
          </p>
          <button
            onClick={() => navigate('/find-therapist')}
            className="font-nunito rounded-md text-sm px-4 py-2 text-center transition-all duration-300 border-2"
            style={{ color: '#13a4ec', backgroundColor: 'transparent', borderColor: '#13a4ec' }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#13a4ec';
                e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#13a4ec';
            }}
          >
            <SignText
                blockNavigation={true}
                onNavigate={() => navigate('/find-therapist')}
            >
                Randevu Al
            </SignText>
</button>
        </div>
      </div>
    </>
  );
}