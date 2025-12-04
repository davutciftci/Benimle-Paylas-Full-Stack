import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/Footer/Footer';

import SignLanguageSupport from '../components/SignLanguage/SignLanguageSupport';

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <SignLanguageSupport />
      <Footer />
    </>
  );
}

