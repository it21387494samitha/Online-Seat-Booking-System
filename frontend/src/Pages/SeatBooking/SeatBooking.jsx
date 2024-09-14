import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SeatBooking = () => {
  const { eventId } = useParams();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [eventName, setEventName] = useState('');
  const [confirmReservation, setConfirmReservation] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  // Fetch seats and event name when eventId changes
  useEffect(() => {
    if (eventId) {
      const fetchSeatsAndEvent = async () => {
        try {
          const token = localStorage.getItem('token');

          // Fetch seats for the event
          const seatResponse = await axios.get(
            `http://localhost:5000/api/seats/available/${eventId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSeats(seatResponse.data); // Store the available seats in state

          // Fetch event details to get the event name
          const eventResponse = await axios.get(
            `http://localhost:5000/api/events/${eventId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setEventName(eventResponse.data.name); // Store the event name in state
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Error fetching data.');
        } finally {
          setLoading(false); // Loading is done
        }
      };

      fetchSeatsAndEvent();
    }
  }, [eventId]);

  // Handle seat reservation
  const handleSeatReservation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/seats/reserve/${eventId}/${selectedSeat}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(`Seat ${response.data.seat.seatNumber} reserved successfully!`);
      setError('');
      setConfirmReservation(false);
    } catch (error) {
      console.error('Error reserving seat:', error);
      setError('Error reserving seat.');
      setSuccess('');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="mt-20 p-5 max-w-4xl mx-auto">
      {/* Display Event Name */}
      <h2 className="text-2xl font-semibold text-center mb-10">
        Seat Booking for Event: <span className="text-indigo-600">{eventName || eventId}</span>
      </h2>

      {/* Error and Success messages */}
      {error && <p className="text-red-500 text-center mb-5">{error}</p>}
      {success && <p className="text-green-500 text-center mb-5">{success}</p>}

      {/* Seat Grid */}
      <div className="grid grid-cols-4 gap-5">
        {seats.map((seat) => (
        <div
        key={seat._id}
        className={`p-4 border rounded-lg text-center shadow-sm transition-all ${
          seat.isAvailable
            ? 'bg-white hover:bg-green-100 cursor-pointer'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
        onClick={() => {
          if (seat.isAvailable) {
            setSelectedSeat(seat._id); // Set selected seat
            setConfirmReservation(true); // Open the modal to confirm reservation
          }
        }}
      >
        <p className="font-semibold">{seat.seatNumber}</p>
        <button
          className={`mt-3 w-full px-4 py-2 rounded text-white transition-colors ${
            seat.isAvailable ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-gray-500'
          }`}
          disabled={!seat.isAvailable}
        >
          {seat.isAvailable ? 'Reserve' : 'Reserved'}
        </button>
      </div>
      
        ))}
      </div>

      {/* Confirm Reservation Modal */}
      {confirmReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Reservation</h3>
            <p className="mb-4">Are you sure you want to reserve this seat?</p>
            <div className="flex justify-end">
              <button
                onClick={handleSeatReservation}
                className="bg-indigo-600 text-white p-2 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmReservation(false)}
                className="bg-gray-600 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatBooking;
