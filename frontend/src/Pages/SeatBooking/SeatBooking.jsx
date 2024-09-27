import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChair, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa'; // Icons from Font Awesome

const SeatBooking = () => {
  const { eventId } = useParams();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [eventName, setEventName] = useState('');
  const [confirmReservation, setConfirmReservation] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch seats and event name API logic
  const fetchSeatsAndEvent = async () => {
    try {
      const seatResponse = await axios.get(
        `http://localhost:5000/api/seats/event/${eventId}/seats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSeats(seatResponse.data); // Store all seats in state

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

  // Handle seat reservation API logic
  const handleSeatReservation = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/seats/reserve/${eventId}/${selectedSeat}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setError('');
      setConfirmReservation(false);
      // Update seat status in UI after successful reservation
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat._id === selectedSeat ? { ...seat, isAvailable: false } : seat
        )
      );
      setSuccess('Seat successfully reserved!');
    } catch (error) {
      console.error('Error reserving seat:', error);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else if (error.response && error.response.status === 409) {
        setError('Seat is already reserved.');
      } else {
        setError('Error reserving seat. Please try again.');
      }
      setSuccess('');
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    if (!token) {
      setError('You must be logged in to book a seat.');
      setLoading(false);
      return;
    }

    if (eventId && token) {
      fetchSeatsAndEvent(); // Call the API to fetch data
    }
  }, [eventId, token]);

  const handleSeatClick = (seatId) => {
    setSelectedSeat(seatId);
    setConfirmReservation(true);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="animate-spin">
          <FaSpinner className="w-12 h-12 text-indigo-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Image Section */}
      <div className="w-full flex justify-center mb-5">
        <img
          src="https://cdn.prod.website-files.com/65e8dbcc20b03bec9c6fe12c/65ea107210b0d454518127e0_65565ddc63f46e2b10932b52_SEAT%20PLAN%20-EDIT.svg"
          alt="Event"
          className="w-48 h-48  shadow-lg object-cover"
        />
      </div>

      {/* Seat Booking Section */}
      <div className="bg-slate-300 p-8 w-full max-w-4xl mx-auto rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Seat Booking for:{' '}
          <span className="text-indigo-600">{eventName || eventId}</span>
        </h2>

        {/* Error and Success messages */}
        {error && <p className="text-red-500 text-center mb-5">{error}</p>}
        {success && <p className="text-green-500 text-center mb-5">{success}</p>}

        {/* Seat Grid */}
        <div className="grid grid-cols-4 gap-5">
          {seats.map((seat) => (
            <div
              key={seat._id}
              className={`p-4 border rounded-lg text-center shadow-lg transition-transform transform hover:scale-105 ${
                seat.isAvailable
                  ? selectedSeat === seat._id
                    ? 'bg-green-200 shadow-2xl'
                    : 'bg-white hover:bg-green-100 cursor-pointer'
                  : 'bg-red-300 cursor-not-allowed'
              }`}
              onClick={() => seat.isAvailable && handleSeatClick(seat._id)}
            >
              <p className="font-semibold">{seat.seatNumber}</p>
              <FaChair
                className={`mx-auto my-3 text-2xl ${
                  seat.isAvailable ? 'text-green-500' : 'text-red-500'
                }`}
              />
              <button
                className={`mt-3 w-full px-4 py-2 rounded text-white transition-all ${
                  seat.isAvailable && !confirmReservation
                    ? 'bg-indigo-600 hover:bg-indigo-500'
                    : 'bg-gray-500 cursor-not-allowed'
                }`}
                disabled={!seat.isAvailable || confirmReservation}
              >
                {seat.isAvailable ? 'Reserve' : 'Booked'}
              </button>
            </div>
          ))}
        </div>

        {/* Confirm Reservation Modal */}
        {confirmReservation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all scale-105">
              <h3 className="text-lg font-semibold mb-4">Confirm Reservation</h3>
              <p className="mb-4">Are you sure you want to reserve this seat?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleSeatReservation}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500 transition-colors"
                >
                  <FaCheckCircle className="inline-block mr-2" />
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmReservation(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition-colors"
                >
                  <FaTimesCircle className="inline-block mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatBooking;
