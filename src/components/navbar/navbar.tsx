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
            <span className="text-slate-600 self-center text-3xl font-nunito whitespace-nowrap font-medium">
              Benimle Paylaş
            </span>
          </Link>

          {/* Right Buttons + Hamburger */}
          <div className="flex md:order-2 space-x-2 rtl:space-x-reverse items-center">

            <Link
              to="/find-therapist"
              className="bg-gradient-to-r from-slate-500 to-slate-700 font-nunito text-white rounded-md text-sm px-4 py-2 text-center flex items-center justify-center hover:from-slate-600 hover:to-slate-800 hover:shadow-md transition-all duration-300 ml-4">
              Randevu Al
            </Link>

            <Link
              to="/login"
              className="bg-white border border-slate-600 font-nunito text-slate-600 rounded-md text-sm px-4 py-2 text-center hover:bg-slate-50 hover:shadow-sm transition-all duration-300">
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
                <Link to="/" className="text-slate-600 hover:text-gray-600 block py-1 px-1.5 rounded text-lg">
                  Anasayfa
                </Link>
              </li>

              <li>
                <Link to="/services" className="text-slate-600 hover:text-gray-600 block py-1 px-1.5 rounded text-lg">
                  Hizmetler
                </Link>
              </li>

              <li>
                <Link to="/experts" className="text-slate-600 hover:text-gray-600 block py-1 px-1.5 rounded text-lg">
                  Uzmanlar
                </Link>
              </li>

              <li>
                <Link to="/about" className="text-slate-600 hover:text-gray-600 block py-1 px-1.5 rounded text-lg">
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
