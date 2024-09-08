import express from 'express';
import { verifyToken } from "../Middleware/VerifyToken.js";
import { bookSeat, getSeats, cancelBooking } from "../Controllers/SeatBookingController.js";

const router = express.Router();

// Route to book a seat
router.post("/book", verifyToken, bookSeat);

// Route to view all seats
router.get("/seats", getSeats);

// Route to cancel a seat booking
router.post("/cancel", verifyToken, cancelBooking);

export default router;
