import React, { useState, useEffect } from 'react';

function CustomerDash() {
  const [bgImage, setBgImage] = useState(0);

  const images = [
    'https://www.telecomreviewasia.com/images/stories/2023/06/SLT-MOBITEL_Debuts_New_Operational_Headquarters.jpg',
    'https://images.pexels.com/photos/319893/pexels-photo-319893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2937148/pexels-photo-2937148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/13391116/pexels-photo-13391116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/364086/pexels-photo-364086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgImage((prevBgImage) => (prevBgImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Clear interval when the component unmounts
  }, [images.length]);

  return (
    <div className="relative min-h-screen bg-cover bg-center transition-all duration-500 ease-in-out" style={{ backgroundImage: `url(${images[bgImage]})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <header className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="px-6 py-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg shadow-lg max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Platform</h1>
          <p className="text-lg text-gray-200 mb-8">Your one-stop solution for all your needs.</p>

          <div className="flex justify-center space-x-4">
            <button
              className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition-transform hover:scale-105"
              onClick={() => alert('Primary Action!')}
            >
              Explore Now
            </button>
            <button
              className="bg-white bg-opacity-80 text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-100 transition-transform hover:scale-105"
              onClick={() => console.log('Go to Booking Page')}
            >
              Go to Booking Page
            </button>
          </div>
        </div>
      </header>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-purple-500 rounded-full opacity-70 blur-lg"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500 rounded-full opacity-70 blur-lg"></div>
    </div>
  );
}

export default CustomerDash;
