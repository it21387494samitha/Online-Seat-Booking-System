import React from 'react';
import './Header.css'; // Assuming you style it separately
import Login from '../Pages/Login/Login';
import { useNavigate } from 'react-router-dom';


const Header = () => {

const navigate = useNavigate();

  return (
    <header className="header">
      <div >
        <h1>  <br/></h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href='/login'>Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
