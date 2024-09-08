import express from 'express';
import { createEvent, getEvents } from '../Controllers/EventController.js';
import { verifyToken } from '../Middleware/AuthMiddleware.js';  // Middleware for verifying JWT token

const router = express.Router();

// Route to create a new event (Admin only)
router.post("/create", verifyToken, createEvent);

// Route to get all events (Public route)
router.get("/", getEvents);

export default router;
