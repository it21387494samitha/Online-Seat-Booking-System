import express from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { ReserveSeat, CancelReservation, ViewAvailableSeats, CreateSeat, CreateSeatStructure } from '../Controllers/SeatBookingController.js';

const router = express.Router();


router.post('/create', verifyToken, CreateSeat);
// Reserve a seat (protected route)
router.post('/reserve', verifyToken, ReserveSeat);

//
router.post('/creat',verifyToken , CreateSeatStructure)

// Cancel a reservation (protected route)
router.post('/cancel', verifyToken, CancelReservation);

// View available seats for an event
router.get('/available/:eventId', verifyToken, ViewAvailableSeats);

export default router;
