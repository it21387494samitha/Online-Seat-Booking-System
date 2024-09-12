import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingPage = () => {
  const { eventId } = useParams(); // Retrieve the eventId from the route parameters
  const [seatNumber, setSeatNumber] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleReserveSeat = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/seats/reserve',
        {
          seatNumber,
          eventId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error reserving seat');
    }
  };

  return (
    <div>
      <h1>Book Your Seat for Event {eventId}</h1>
      <input
        type="text"
        placeholder="Seat Number"
        value={seatNumber}
        onChange={(e) => setSeatNumber(e.target.value)}
      />
      <button onClick={handleReserveSeat}>Reserve Seat</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingPage;
