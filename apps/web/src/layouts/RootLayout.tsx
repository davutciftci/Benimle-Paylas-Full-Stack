import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/Footer/Footer';
import SignLanguageSupport from '../components/SignLanguage/SignLanguageSupport';
import { useAuthStore } from '../store/authStore';

export default function RootLayout() {
  const { user } = useAuthStore();
  const roleString = typeof user?.role === 'string' ? user.role : (user?.role as any)?.name;
  const isAdmin = roleString?.toLowerCase() === 'admin';
  const isExpert = roleString?.toLowerCase() === 'expert';

  return (
    <>
      <Navbar />
      <Outlet />
      {!isExpert && <SignLanguageSupport />}
      {!isAdmin && !isExpert && <Footer />}
    </>
  );
}

