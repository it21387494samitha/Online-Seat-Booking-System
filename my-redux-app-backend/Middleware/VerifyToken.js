import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // To load environment variables from .env file

const secretKey = process.env.JWT_SECRET || "samitha"; // Use .env variable or fallback to hardcoded

// Verify JWT token
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
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
