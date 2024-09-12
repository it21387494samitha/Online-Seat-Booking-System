import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaBars, FaTimes, FaCalendarAlt, FaShoppingCart, FaBook } from 'react-icons/fa'; // Icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className="sidebar-menu">
          <li>
            <Link to="/documentation">
              <FaBook className="icon" /> Documentation
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              <FaCalendarAlt className="icon" /> Calendar
            </Link>
          </li>
          <li>
            <Link to="/e-commerce">
              <FaShoppingCart className="icon" /> E-commerce
            </Link>
          </li>
        </ul>
      </div>
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
