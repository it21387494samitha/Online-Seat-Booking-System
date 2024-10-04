import express from "express";
import { verifyToken } from "../Middleware/VerifyToken.js";
import { CreateFeedback } from "../Controllers/FeedbackController.js";

const router = express.Router();

// Route to create feedback
router.post('/', verifyToken, CreateFeedback);

export default router;
