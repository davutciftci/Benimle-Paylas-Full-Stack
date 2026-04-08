import React from 'react';
import HeroSection from '../components/section/Section';
import Experts from '../components/Carousel/Carousel';
import Services from '../components/Services/Services';
import FAQ from '../components/Accordion/Accordion';
import SignLanguageSupport from '../components/SignLanguage/SignLanguageSupport';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      
      {/* Social Proof / Stats previously in Hero, but let's just go straight to Experts */}
      <Experts />
      
      <Services />
      
      <div className="bg-slate-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-heading mb-4 tracking-tighter">Sıkça Sorulan Sorular</h2>
                <p className="text-muted font-medium">Aklınıza takılan soruların cevaplarını burada bulabilirsiniz.</p>
            </div>
            <FAQ />
        </div>
      </div>

      <SignLanguageSupport />
    </div>
  );
}
