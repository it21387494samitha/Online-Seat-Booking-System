import React, { useState, useEffect } from 'react';
import './Home.css'; // Assuming styles are in a separate file

function CustomerDash() {
  const [bgImage, setBgImage] = useState(0);

  const images = [
    'https://www.telecomreviewasia.com/images/stories/2023/06/SLT-MOBITEL_Debuts_New_Operational_Headquarters.jpg',

    'https://images.pexels.com/photos/319893/pexels-photo-319893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2937148/pexels-photo-2937148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/13391116/pexels-photo-13391116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/364086/pexels-photo-364086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgImage((prevBgImage) => (prevBgImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Clear interval when the component unmounts
  }, [images.length]);

  return (
    <div className='full-container'>
    <div
      className="home-container"
      style={{ backgroundImage: `url(${images[bgImage]})` }}
    >
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Platform</h1>
          <p>Your one-stop solution for all your needs.</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={() => alert('Primary Action!')}>
              Explore Now
            </button>
            <button className="secondary-btn" onClick={() => console.log('Go to Booking Page')}>
              Go to Booking Page
            </button>
          </div>
        </div>
      </header>
    </div>

    </div>
  );
}

export default CustomerDash;
