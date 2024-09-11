import jwt from 'jsonwebtoken';

const secretKey = "samitha"; // Ensure this matches the key used to sign the token

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Expecting 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Attach user info to request
        next(); // Continue to the next middleware/route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
