import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Hakkımızda
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Benimle Paylaş, herkesin ulaşılabilir ve kaliteli psikolojik destek almasını sağlayan bir platformdur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
              alt="Team working"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Misyonumuz</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Amacımız, teknolojinin gücünü kullanarak ruh sağlığı hizmetlerini demokratikleştirmek ve herkes için erişilebilir kılmaktır. Uzman psikologlarımızla, danışanlarımızı güvenli ve konforlu bir ortamda buluşturuyoruz.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Her bireyin kendine özgü bir hikayesi olduğuna inanıyor ve bu hikayede onlara eşlik etmekten gurur duyuyoruz.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Uzman Psikolog</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">10k+</div>
              <div className="text-gray-600 font-medium">Mutlu Danışan</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Canlı Destek</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
