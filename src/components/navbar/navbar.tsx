import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-100">
        <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto px-4 py-2.5">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
            <span className="self-center text-xl font-nunito whitespace-nowrap font-semibold text-gray-900">
              Benimle Paylaş
            </span>
          </Link>

          {/* Right Buttons + Hamburger */}
          <div className="flex md:order-2 space-x-2 rtl:space-x-reverse items-center">

            {/* Kayıt Ol - Outline button, fills on hover */}
            <Link
              to="/register"
              className="font-nunito rounded-md text-xs px-4 py-2 text-center flex items-center justify-center transition-all duration-300 border"
              style={{
                color: '#13a4ec',
                backgroundColor: 'transparent',
                borderColor: '#13a4ec'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#13a4ec';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#13a4ec';
              }}
            >
              Kayıt Ol
            </Link>

            {/* Giriş Yap - Filled button, becomes outline on hover */}
            <Link
              to="/login"
              className="font-nunito rounded-md text-xs px-4 py-2 text-center transition-all duration-300 border"
              style={{
                color: 'white',
                backgroundColor: '#13a4ec',
                borderColor: '#13a4ec'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#13a4ec';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#13a4ec';
                e.currentTarget.style.color = 'white';
              }}
            >
              Giriş Yap
            </Link>

            {/* Hamburger Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center text-gray-700 p-1.5 w-8 h-8 justify-center text-sm rounded-md md:hidden"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>

          {/* Menu List */}
          <div
            className={`font-nunito w-full md:flex md:w-auto md:order-1 transition-all duration-300
              ${isOpen ? "block" : "hidden"}`}
          >
            <ul className="flex flex-col p-2 md:p-0 mt-1 font-normal rounded text-sm
              md:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:items-center">

              <li>
                <Link to="/how-it-works" className="hover:text-blue-500 block py-1.5 px-2 rounded text-sm text-gray-700">
                  Nasıl Çalışır
                </Link>
              </li>

              <li>
                <Link to="/experts" className="hover:text-blue-500 block py-1.5 px-2 rounded text-sm text-gray-700">
                  Uzmanlar
                </Link>
              </li>

              <li>
                <Link to="/psychological-tests" className="hover:text-blue-500 block py-1.5 px-2 rounded text-sm text-gray-700">
                  Psikolojik Testler
                </Link>
              </li>

              <li>
                <Link to="/blog" className="hover:text-blue-500 block py-1.5 px-2 rounded text-sm text-gray-700">
                  Blog
                </Link>
              </li>

              {/* Separator */}
              <li className="hidden md:block">
                <div className="h-4 w-px mx-2 bg-gray-300"></div>
              </li>
              <li className="block md:hidden">
                <hr className="my-2 border-t border-gray-200" />
              </li>

              <li>
                <Link to="/psychologist-application" className="hover:opacity-80 block py-1.5 px-2 rounded text-sm font-medium text-blue-500">
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
