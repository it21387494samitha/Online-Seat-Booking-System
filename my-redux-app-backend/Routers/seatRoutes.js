import express from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { ReserveSeat, CancelReservation, ViewAvailableSeats, CreateSeat, CreateSeatStructure, GetBookedSeatCount, GetBookingHistory, deleteBooking, ViewAllSeats, deleteSeat, ViewEventSeats, SoftDeleteSeat } from '../Controllers/SeatBookingController.js';

const router = express.Router();


router.post('/create', CreateSeat);
// Reserve a seat (protected route)
router.post('/reserve/:eventId/:seatId',  ReserveSeat);

//
router.get('/event/:eventId/booked-seats-count',GetBookedSeatCount);

//
router.post('/creat', CreateSeatStructure)

// Cancel a reservation (protected route)
router.post('/cancel',  CancelReservation);

// View available seats for an event
router.get('/available/:eventId',  ViewAvailableSeats);

// SeatBookingRouter.js
router.get('/history',  GetBookingHistory);

// Delete a booking by ID (protected route)
router.delete('/history/:id',  deleteBooking); 




router.get('/seats',  ViewAllSeats); // <-- New Route

router.get('/event/:eventId/seats',  ViewEventSeats);





router.delete('/seats/:id', deleteSeat);




///

router.delete('/soft/:id',SoftDeleteSeat)

    
export default router;
