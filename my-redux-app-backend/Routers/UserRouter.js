import express from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js'; 
import { getAllUsers, getUserProfile, RegisterUser, uploadProfileImage, UserLogin } from '../Controllers/UserController.js'; 
import multer from 'multer';
import admin from '../firebaseadmin.js'; // Import Firebase Admin SDK setup
import jwt from 'jsonwebtoken';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });



// Public routes
router.post('/register', RegisterUser); 
router.post('/login', UserLogin);     
router.get('/all', getAllUsers);

// Protected routes
router.get('/profile', verifyToken, getUserProfile );
router.post('/profile/upload', verifyToken, upload.single('profileImage'), uploadProfileImage);

router.get('/settings', verifyToken, (req, res) => {
    res.json({ message: "Access to settings", user: req.user });
});

// Google Login Route
// router.post('/auth/google', async (req, res) => {
//     const { token } = req.body;
  
//     if (!token) {
//       return res.status(400).json({ message: 'Token is required' });
//     }
  
//     try {
//       const decodedToken = await admin.auth().verifyIdToken(token);
//       const { uid, email } = decodedToken;

//       if (!email.endsWith('@gmail.com')) {
//         return res.status(403).json({ message: 'Only Google emails are allowed.' });
//       }

//       const customToken = jwt.sign({ uid, email }, secretKey, { expiresIn: '1h' });
//       res.status(200).json({ message: 'Login successful', token: customToken });
//     } catch (error) {
//       console.error('Error verifying Firebase token:', error);
//       return res.status(401).json({ message: 'Invalid token', error });
//     }
// });

router.post('/', async (req, res) => {
    console.log("Received request body:", req.body);  // Log the entire request body
    const { token } = req.body;
    console.log("Received token:", token);  // Log the received token

    // Proceed with the token verification and other logic...
});



router.get('/protected-route',verifyToken,(req,res)=>{
    res.json({message: 'this is s protected route', userId: req.userId});
})

export default router;
    