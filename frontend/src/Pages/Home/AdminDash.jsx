// src/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';


function AdminDash() {


const navigate = useNavigate();

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to the admin Page</h1>
        <p>This is your home page built with React.</p>
        <button onClick={() =>  alert('Button clicked!')}>Click Me</button>
        <button onClick={() => navigate('/ad')}>Go to Booking Page</button>
      </header>
    </div>
  );
}

export default AdminDash;
