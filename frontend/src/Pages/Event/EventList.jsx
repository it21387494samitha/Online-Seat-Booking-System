import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActionArea, CardMedia, Typography, Grid, Container, Alert } from '@mui/material';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:5000/api/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data); 
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events.');
      }
    };

    fetchEvents();
  }, []);


  const handleEventClick = (eventId) => {
    navigate(`/booking/${eventId}`);
 
  };

  return (

    <div className='mt-20'>
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      
      {error && <Alert severity="error">{error}</Alert>}

      {events.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No events available
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardActionArea onClick={() => handleEventClick(event._id)} >
                  
                  <CardMedia
                    component="img"
                    height="80"
                    image={event.imageUrl || 'https://rainbowpages.lk/uploads/listings/logo/s/slt_digital.jpg'} 
                    alt={event.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
                      {event.name}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                      {new Date(event.date).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      <strong>Location:</strong> {event.location}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      {event.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>

    </div>
  );
};

export default EventList;