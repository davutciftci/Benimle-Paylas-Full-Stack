import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-3 py-1">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
            <span className="self-center text-3xl font-nunito whitespace-nowrap font-medium" style={{ color: '#00435a' }}>
              Benimle Paylaş
            </span>
          </Link>

          {/* Right Buttons + Hamburger */}
          <div className="flex md:order-2 space-x-2 rtl:space-x-reverse items-center">

            <Link
              to="/find-therapist"
              className="font-nunito rounded-md text-sm px-4 py-2 text-center flex items-center justify-center hover:opacity-90 hover:shadow-md transition-all duration-300 ml-4"
              style={{ backgroundColor: '#00435a', color: '#f4f4f4' }}>
              Randevu Al
            </Link>

            <Link
              to="/login"
              className="bg-white font-nunito rounded-md text-sm px-4 py-2 text-center hover:bg-gray-50 hover:shadow-sm transition-all duration-300"
              style={{ border: '1px solid #00435a', color: '#00435a' }}>
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
              md:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">

              <li>
                <Link to="/" className="hover:opacity-70 block py-1 px-1.5 rounded text-lg" style={{ color: '#00435a' }}>
                  Anasayfa
                </Link>
              </li>

              <li>
                <Link to="/services" className="hover:opacity-70 block py-1 px-1.5 rounded text-lg" style={{ color: '#00435a' }}>
                  Hizmetler
                </Link>
              </li>

              <li>
                <Link to="/experts" className="hover:opacity-70 block py-1 px-1.5 rounded text-lg" style={{ color: '#00435a' }}>
                  Uzmanlar
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:opacity-70 block py-1 px-1.5 rounded text-lg" style={{ color: '#00435a' }}>
                  Hakkımızda
                </Link>
              </li>

            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}
