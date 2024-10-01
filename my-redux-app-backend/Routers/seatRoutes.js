import express from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { ReserveSeat, CancelReservation, ViewAvailableSeats, CreateSeat, CreateSeatStructure, GetBookedSeatCount, GetBookingHistory, deleteBooking, ViewAllSeats, deleteSeat, ViewEventSeats, SoftDeleteSeat } from '../Controllers/SeatBookingController.js';

const router = express.Router();


router.post('/create', verifyToken, CreateSeat);
// Reserve a seat (protected route)
router.post('/reserve/:eventId/:seatId', verifyToken, ReserveSeat);

//
router.get('/event/:eventId/booked-seats-count',GetBookedSeatCount);

//
router.post('/creat',verifyToken , CreateSeatStructure)

// Cancel a reservation (protected route)
router.post('/cancel', verifyToken, CancelReservation);

// View available seats for an event
router.get('/available/:eventId', verifyToken, ViewAvailableSeats);

// SeatBookingRouter.js
router.get('/history', verifyToken, GetBookingHistory);

// Delete a booking by ID (protected route)
router.delete('/history/:id', verifyToken, deleteBooking); 




router.get('/seats', verifyToken, ViewAllSeats); // <-- New Route

router.get('/event/:eventId/seats', verifyToken, ViewEventSeats);





router.delete('/seats/:id', verifyToken,deleteSeat);




///

router.delete('/soft/:id',verifyToken,SoftDeleteSeat)

    
export default router;
