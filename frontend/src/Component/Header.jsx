import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate('/')}>
          MyBrand
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="hidden md:flex space-x-8 text-lg font-medium">
            <li>
              <a
                href="/"
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-700 transition"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            id="menu-btn"
            className="block hamburger focus:outline-none"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              menu.classList.toggle('hidden');
            }}
          >
            <div className="hamburger-top bg-gray-700"></div>
            <div className="hamburger-middle bg-gray-700"></div>
            <div className="hamburger-bottom bg-gray-700"></div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-white px-4 py-6 space-y-6 text-lg font-medium shadow-md">
        <a href="/" className="block text-gray-700 hover:text-pink-600">Home</a>
        <a href="/about" className="block text-gray-700 hover:text-pink-600">About</a>
        <a href="/services" className="block text-gray-700 hover:text-pink-600">Services</a>
        <a href="/contact" className="block text-gray-700 hover:text-pink-600">Contact</a>
        <a href="/login" className="block bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-700">
          Login
        </a>
      </div>
    </header>
  );
};

export default Header;
