import jwt from 'jsonwebtoken';

const secretKey = "samitha"; // Same secret key used for signing the token

export function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Failed to authenticate token", error: err });
        }

        // If token is valid, save the decoded user info to request for use in other routes
        req.user = decoded;
        next();
    });
}
