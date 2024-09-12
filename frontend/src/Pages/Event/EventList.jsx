import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:5000/api/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data); // Assuming data contains the array of events
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events.');
      }
    };

    fetchEvents();
  }, []);

  // Function to handle event click
  const handleEventClick = (eventId) => {
    navigate(`/booking/${eventId}`); // Navigate to the booking page with the event ID
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      {error && <p>{error}</p>}

      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id} onClick={() => handleEventClick(event._id)} style={{ cursor: 'pointer', marginBottom: '20px' }}>
              <h3>{event.name}</h3>
              <p>Date: {new Date(event.date).toLocaleString()}</p>
              <p>Location: {event.location}</p>
              <p>Description: {event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
