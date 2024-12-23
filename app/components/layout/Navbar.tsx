'use client';

import { useState } from 'react';
import Link from 'next/link';
import CartIcon from './CartIcon';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-gradient-to-r from-sky-300 to to-sky-400 transition-all duration-200 z-50">
      <div className="container mx-auto px-12 py-3 flex justify-between items-center">
        {/* Company Name */}
        <div className="text-xl font-bold">
          <Link href="/" className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-cyan-400 to-cyan-600">
            Health Quick Lab
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-6 bg-white/80 md:bg-transparent absolute md:relative top-full left-0 right-0 md:top-auto p-4 md:p-0`}
        >
          <Link
            href="/"
            className="block py-2 px-4 text-xl font-semibold text-gray-700 md:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-blue-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="block py-2 px-4 text-xl font-semibold text-gray-700 md:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-blue-600 transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            href="/partner-with-us"
            className="block py-2 px-4 text-xl font-semibold text-gray-700 md:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-blue-600 transition-colors duration-300"
          >
            Partner with Us
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <CartIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
