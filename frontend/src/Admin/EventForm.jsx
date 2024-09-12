import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const [eventId, setEventId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [seatData, setSeatData] = useState({
    rows: '',
    columns: '',
  });

  // Handle form field changes for the event
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form field changes for the seat structure
  const handleSeatChange = (e) => {
    setSeatData({
      ...seatData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form data to the backend API to create an event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // assuming token is stored in localStorage
      const response = await axios.post(
        'http://localhost:5000/api/events/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage('Event created successfully!');
        setEventId(response.data._id); // Store the created event ID
        setModalIsOpen(true); // Open the modal to add seats
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
      const response = await axios.post(
        'http://localhost:5000/api/seats/creat',
        {
          eventId,
          rows: seatData.rows.split(','), // Split the rows into an array
          columns: parseInt(seatData.columns), // Ensure columns is a number
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    <div className='mt-14 '>
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create Event
      </Typography>
      {message && <Alert severity="info">{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Event Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Event Date"
              name="date"
              type="datetime-local"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Create Event
        </Button>
      </form>
     
      {/* Modal for adding seats */}
      <Dialog open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <DialogTitle>Add Seats</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Rows (comma-separated, e.g., A,B,C)"
                name="rows"
                value={seatData.rows}
                onChange={handleSeatChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Columns per row"
                name="columns"
                type="number"
                value={seatData.columns}
                onChange={handleSeatChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSeatSubmit} variant="contained" color="primary">
            Add Seats
          </Button>
          <Button onClick={() => setModalIsOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </div>
  );
};

export default EventForm;