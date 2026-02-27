import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 px-8 py-12 text-center">
            <Shield className="mx-auto h-16 w-16 text-white opacity-90 mb-4" />
            <h1 className="text-3xl font-extrabold text-white sm:text-2xl">
              Gizlilik Politikası
            </h1>
            <p className="mt-4 text-indigo-100 text-lg">
              Verilerinizin güvenliği bizim için önemlidir.
            </p>
          </div>

          <div className="px-8 py-12 space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Veri Toplama</h2>
              <p>
                Hizmetlerimizi kullandığınızda, adınız, e-posta adresiniz ve iletişim bilgileriniz gibi kişisel verilerinizi toplayabiliriz. Bu veriler, size daha iyi hizmet sunmak amacıyla kullanılır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Veri Kullanımı</h2>
              <p>
                Topladığımız veriler, randevu oluşturma, iletişim kurma ve hizmet kalitemizi artırma gibi amaçlarla işlenir. Verileriniz, yasal zorunluluklar dışında üçüncü şahıslarla paylaşılmaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Çerezler</h2>
              <p>
                Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır. Çerez tercihlerinizi tarayıcı ayarlarınızdan değiştirebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Güvenlik</h2>
              <p>
                Verilerinizin güvenliği için endüstri standardı güvenlik önlemleri almaktayız. Ancak, internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olmadığını unutmayınız.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <p className="text-sm text-gray-500">
                Son güncelleme: 3 Aralık 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
