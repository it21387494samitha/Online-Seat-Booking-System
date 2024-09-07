import express from "express";
import { getAllSeats, bookSeat, cancelBooking } from "../Controllers/SeatController.js";
import {verifyToken} from "../Middleware/VerifyToken.js"; // Adjust path if needed

const router = express.Router();

router.get('/seats', verifyToken, getAllSeats);
router.post('/book',verifyToken,  bookSeat);
router.post('/cancel', verifyToken, cancelBooking);

export default router;
