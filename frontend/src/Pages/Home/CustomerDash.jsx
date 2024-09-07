// src/Home.jsx
import React from 'react';


function CustomerDash() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to the Home Page</h1>
        <p>This is your home page built with React.</p>
        <button onClick={() => alert('Button clicked!')}>Click Me</button>
      </header>
    </div>
  );
}

export default CustomerDash;
