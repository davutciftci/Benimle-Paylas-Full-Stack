import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
            <span className="self-center text-3xl font-nunito whitespace-nowrap font-medium" style={{ color: '#3C486B' }}>
              Benimle Paylaş
            </span>
          </Link>

          {/* Right Buttons + Hamburger */}
          <div className="flex md:order-2 space-x-3 rtl:space-x-reverse items-center">

            {/* Kayıt Ol - Dark Blue Outline */}
            <Link
              to="/register"
              className="font-nunito rounded-md text-sm px-5 py-2.5 text-center flex items-center justify-center transition-all duration-300 border-2"
              style={{
                color: '#3C486B',
                backgroundColor: 'transparent',
                borderColor: '#3C486B'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3C486B';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#3C486B';
              }}
            >
              Kayıt Ol
            </Link>

            {/* Giriş Yap - Red Outline */}
            <Link
              to="/login"
              className="font-nunito rounded-md text-sm px-5 py-2.5 text-center transition-all duration-300 border-2"
              style={{
                color: '#F45050',
                backgroundColor: 'transparent',
                borderColor: '#F45050'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F45050';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#F45050';
              }}
            >
              Giriş Yap
            </Link>

            {/* Hamburger Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center text-black p-1.5 w-8 h-8 justify-center text-sm rounded-md md:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

          {/* Menu List */}
          <div
            className={`font-nunito w-full md:flex md:w-auto md:order-1 transition-all duration-300
              ${isOpen ? "block" : "hidden"}`}
          >
            <ul className="flex flex-col p-2 md:p-0 mt-1 font-normal rounded text-lg
              md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:items-center">

              <li>
                <Link to="/how-it-works" className="hover:opacity-70 block py-2 px-2 rounded text-lg" style={{ color: '#3C486B' }}>
                  Nasıl Çalışır
                </Link>
              </li>

              <li>
                <Link to="/experts" className="hover:opacity-70 block py-2 px-2 rounded text-lg" style={{ color: '#3C486B' }}>
                  Uzmanlar
                </Link>
              </li>

              <li>
                <Link to="/psychological-tests" className="hover:opacity-70 block py-2 px-2 rounded text-lg" style={{ color: '#3C486B' }}>
                  Psikolojik Testler
                </Link>
              </li>

              <li>
                <Link to="/blog" className="hover:opacity-70 block py-2 px-2 rounded text-lg" style={{ color: '#3C486B' }}>
                  Blog
                </Link>
              </li>

              {/* Separator */}
              <li className="hidden md:block">
                <div className="h-6 w-px mx-2" style={{ backgroundColor: '#3C486B' }}></div>
              </li>
              <li className="block md:hidden">
                <hr className="my-2 border-t" style={{ borderColor: '#3C486B' }} />
              </li>

              <li>
                <Link to="/psychologist-application" className="hover:opacity-70 block py-2 px-2 rounded text-lg font-medium" style={{ color: '#F45050' }}>
                  Psikolog Başvurusu
                </Link>
              </li>

            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}
