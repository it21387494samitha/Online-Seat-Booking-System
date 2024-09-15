import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar'; // Importing SideBar component
import Logo from '../Assest/SLT_logo.png'; // Path to your logo image
import { FaSearch, FaBars, FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaUser } from 'react-icons/fa'; // Icons for nav

const Header = ({ toggleSidebar, isOpen, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4`}>
        {/* Logo and Title */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src={Logo} alt="Logo" className="w-14 h-14 object-contain ml-5" /> {/* Logo */}
          <div className="text-3xl font-bold text-white ml-5">
            Online Reservation
          </div>
        </div>

        {/* Navigation Links & Search Bar */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium text-white">
          <a href="/" className="hover:text-yellow-300 flex items-center space-x-1 transition-colors">
            <FaHome /> <span>Home</span>
          </a>
          <a href="/about" className="hover:text-yellow-300 flex items-center space-x-1 transition-colors">
            <FaInfoCircle /> <span>About</span>
          </a>
          <a href="/services" className="hover:text-yellow-300 flex items-center space-x-1 transition-colors">
            <FaServicestack /> <span>Services</span>
          </a>
          <a href="/contact" className="hover:text-yellow-300 flex items-center space-x-1 transition-colors">
            <FaEnvelope /> <span>Contact</span>
          </a>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <FaSearch className="absolute top-3 right-3 text-gray-600" />
          </div>

          {/* Call to Action Button */}
          <a href="/signup" className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-yellow-600 transition">
            Sign Up
          </a>

          <a href="/login" className="bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-700 transition">
            Login
          </a>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-3">
          <button onClick={toggleMobileMenu} className="text-white text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 right-8 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-48 z-50">
            <a href="/" className="block px-4 py-2 hover:bg-gray-100">Home</a>
            <a href="/about" className="block px-4 py-2 hover:bg-gray-100">About</a>
            <a href="/services" className="block px-4 py-2 hover:bg-gray-100">Services</a>
            <a href="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
            <a href="/login" className="block px-4 py-2 bg-pink-600 text-white rounded-lg text-center hover:bg-pink-700 transition">
              Login
            </a>
            <a href="/signup" className="block px-4 py-2 bg-yellow-500 text-white rounded-lg text-center hover:bg-yellow-600 transition mt-2">
              Sign Up
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
