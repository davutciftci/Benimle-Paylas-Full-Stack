import React from 'react';
import HeroSection from '../components/section/Section';
import WhyChooseUs from '../components/Hero/Hero';
import Experts from '../components/Carousel/Carousel';
import Services from '../components/Services/Services';
import FAQ from '../components/Accordion/Accordion';
import SignLanguageSupport from '../components/SignLanguage/SignLanguageSupport';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <SignLanguageSupport />
      <Experts />
      <Services />
      <FAQ />
    </>
  );
}

