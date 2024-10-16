import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import admin from "firebase-admin";

dotenv.config(); // To load environment variables from .env file

const secretKey = process.env.JWT_SECRET || "samitha"; // Use .env variable or fallback to hardcoded

// Verify JWT token


export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token received:", token); // Log the received token

    try {
        // Attempt to verify as a Google token first
        const decoded = await admin.auth().verifyIdToken(token);
        console.log("Decoded Google token:", decoded); // Log decoded Google token
        req.user = {
            id: decoded.uid, // Firebase User ID
            email: decoded.email,
            isAdmin: false, // Default to false; adjust as needed
        };
        next();
    } catch (err) {
        console.error("Google token verification failed:", err); // Log verification error
        // If Google verification fails, try to verify as a normal JWT
        try {
            const decoded = jwt.verify(token, secretKey);
            console.log("Decoded JWT token:", decoded); // Log decoded JWT token
            req.user = decoded; // Attach user info to request object
            next(); // Proceed to the next middleware/route handler
        } catch (err) {
            console.error("JWT token verification failed:", err); // Log verification error
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
};



// Check if user is an admin
export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Access denied, user not authenticated' });
    }
    
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }

    next(); // Proceed if user is an admin
};



