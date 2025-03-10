import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


 const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Manage Events</h2>
      <button onClick={() => navigate('/event')} >Create New Event</button>
      <ul>
        {events.map(event => (
          <li key={event._id}>{event.eventName} - {event.location}</li>
        ))}
      </ul>
    </div>
  );
}

export default ManageEvents;
