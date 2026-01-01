import React from 'react';
import { FileText } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-slate-700 px-8 py-12 text-center">
            <FileText className="mx-auto h-16 w-16 text-white opacity-90 mb-4" />
            <h1 className="text-3xl font-extrabold text-white sm:text-2xl">
              Kullanım Koşulları
            </h1>
            <p className="mt-4 text-slate-200 text-lg">
              Hizmetlerimizi kullanmadan önce lütfen okuyunuz.
            </p>
          </div>

          <div className="px-8 py-12 space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Kabul</h2>
              <p>
                Bu web sitesini kullanarak, aşağıda belirtilen kullanım koşullarını kabul etmiş sayılırsınız. Eğer bu koşulları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hizmet Kullanımı</h2>
              <p>
                Platformumuz üzerinden sunulan hizmetler sadece yasal amaçlar için kullanılabilir. Başkalarının haklarını ihlal eden veya yasa dışı faaliyetlerde bulunan kullanıcıların hesapları askıya alınabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Fikri Mülkiyet</h2>
              <p>
                Sitede yer alan tüm içerik, logo ve tasarımlar şirketimize aittir ve izinsiz kullanılamaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Değişiklikler</h2>
              <p>
                Kullanım koşullarını dilediğimiz zaman değiştirme hakkımız saklıdır. Değişiklikler sitede yayınlandığı andan itibaren geçerli olur.
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

export default TermsPage;
