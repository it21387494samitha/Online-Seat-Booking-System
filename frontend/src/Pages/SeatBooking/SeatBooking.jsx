import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SeatBooking = () => {
  const { eventId } = useParams(); 
  const [seats, setSeats] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  useEffect(() => {
    if (eventId) {
      const fetchSeats = async () => {
        try {
          const token = localStorage.getItem('token'); 
          const response = await axios.get(`http://localhost:5000/api/seats/available/${eventId}`, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
          setSeats(response.data); 
        } catch (error) {
          console.error('Error fetching seats:', error);
          setError('Error fetching seats.');
        }
      };

      fetchSeats();
    }
  }, [eventId]);

  // Handle seat reservation
  const handleSeatReservation = async (seatId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/seats/reserve/${eventId}/${seatId}`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setSuccess(`Seat ${response.data.seat.seatNumber} reserved successfully!`);
      setError(''); 
    } catch (error) {
      console.error('Error reserving seat:', error);
      setError('Error reserving seat.');
      setSuccess(''); 
    }
  };
  

  return (
    <div className='mt-20'>
      <h2>Seat Booking for Event: {eventId}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <ul>
        {seats.map((seat) => (
          <li key={seat._id}>
            {seat.seatNumber}
            <button onClick={() => handleSeatReservation(seat._id)} disabled={!seat.isAvailable}>
              {seat.isAvailable ? 'Reserve Seat' : 'Reserved'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeatBooking;
