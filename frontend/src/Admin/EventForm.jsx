import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement
Modal.setAppElement('#root');

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });
  
  const [message, setMessage] = useState('');
  const [eventId, setEventId] = useState(null); // To store the created event ID
  const [modalIsOpen, setModalIsOpen] = useState(false); // For controlling the modal
  const [seatData, setSeatData] = useState({
    rows: '',
    columns: '',
  });

  // Handle form field changes for the event
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form field changes for the seat structure
  const handleSeatChange = (e) => {
    setSeatData({
      ...seatData,
      [e.target.name]: e.target.value
    });
  };

  // Submit form data to the backend API to create an event
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
        setEventId(response.data._id); // Store the created event ID
        setModalIsOpen(true); // Open the modal to add seats
        // Optionally reset the form after submission
        setFormData({ name: '', date: '', location: '', description: '' });
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setMessage('Failed to create event.');
    }
  };

  // Submit seat structure to the backend
  const handleSeatSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/seats/creat', {
        eventId,
        rows: seatData.rows.split(','),  // Split the rows into an array
        columns: parseInt(seatData.columns)  // Ensure columns is a number
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setMessage('Seats added successfully!');
        setModalIsOpen(false); // Close the modal after seat submission
      }
    } catch (error) {
      console.error('Error adding seats:', error);
      setMessage('Failed to add seats.');
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

      {/* Modal for adding seats */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Seats"
      >
        <h2>Add Seats</h2>
        <form onSubmit={handleSeatSubmit}>
          <div>
            <label>Rows (comma-separated, e.g., A,B,C):</label>
            <input
              type="text"
              name="rows"
              value={seatData.rows}
              onChange={handleSeatChange}
              required
            />
          </div>

          <div>
            <label>Columns per row:</label>
            <input
              type="number"
              name="columns"
              value={seatData.columns}
              onChange={handleSeatChange}
              required
            />
          </div>

          <button type="submit">Add Seats</button>
          <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default EventForm;
