import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeatBooking = () => {
  const [seats, setSeats] = useState([]); // State to store seat information
  const [selectedSeat, setSelectedSeat] = useState(null); // Track the seat the user selects
  const [isLoading, setIsLoading] = useState(true); // State for loading

  const token = localStorage.getItem('token'); // Get the token for authentication

  // Fetch available seats on component mount
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/seats/seats', { headers: { Authorization: token } })
      .then((response) => {
        setSeats(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching seats:', error);
        alert('Failed to load seats.');
        setIsLoading(false);
      });
  }, [token]);

  // Handle seat booking
  const handleBookSeat = (seatNumber) => {
    axios
      .post(
        'http://localhost:5000/api/seats/book',
        { seatNumber },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        alert('Seat booked successfully!');
        setSeats(seats.map((seat) =>
          seat.seatNumber === seatNumber ? { ...seat, isBooked: true } : seat
        ));
      })
      .catch((error) => {
        console.error('Error booking seat:', error);
        alert('Failed to book seat.');
      });
  };

  // Handle seat cancellation
  const handleCancelSeat = (seatNumber) => {
    axios
      .post(
        'http://localhost:5000/api/seats/cancel',
        { seatNumber },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        alert('Booking cancelled successfully!');
        setSeats(seats.map((seat) =>
          seat.seatNumber === seatNumber ? { ...seat, isBooked: false } : seat
        ));
      })
      .catch((error) => {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking.');
      });
  };

  if (isLoading) {
    return <p>Loading seats...</p>;
  }

  return (
    <div>
      <h2>Seat Booking</h2>
      <div className="seat-grid">
        {seats.map((seat) => (
          <div key={seat.seatNumber} className={`seat ${seat.isBooked ? 'booked' : ''}`}>
            <p>Seat {seat.seatNumber}</p>
            {seat.isBooked ? (
              <button onClick={() => handleCancelSeat(seat.seatNumber)}>
                Cancel Booking
              </button>
            ) : (
              <button onClick={() => handleBookSeat(seat.seatNumber)}>
                Book Seat
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatBooking;
