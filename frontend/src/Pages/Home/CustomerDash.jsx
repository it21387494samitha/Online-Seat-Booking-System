// src/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';





function CustomerDash() {


  const navigate = useNavigate();



  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to the Home Page</h1>
        <p>This is your home page built with React.</p>
        <button onClick={() => alert('Button clicked!')}>Click Me</button>
        <button onClick={() => navigate('/list')}>Go to Booking Page</button>
      </header>
    </div>
  );
}

export default CustomerDash;
