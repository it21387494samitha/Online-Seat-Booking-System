import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });
  
  const [message, setMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit form data to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token'); // assuming token is stored in localStorage
      const response = await axios.post('http://localhost:5000/api/events/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setMessage('Event created successfully!');
        // Optionally reset the form after submission
        setFormData({ name: '', date: '', location: '', description: '' });
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setMessage('Failed to create event.');
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Event Date:</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
