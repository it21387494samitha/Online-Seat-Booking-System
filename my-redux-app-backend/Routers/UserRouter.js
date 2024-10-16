import express from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js'; 
import { getAllUsers, getUserProfile, googleLogin, RegisterUser, uploadProfileImage, UserLogin } from '../Controllers/UserController.js'; 
import multer from 'multer';
import admin from 'firebase-admin';             // Import Firebase Admin SDK setup


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


router.post('/', async (req, res) => {
    console.log("Received request body:", req.body);  // Log the entire request body
    const { token } = req.body;
    console.log("Received token:", token);  // Log the received token

    // Proceed with the token verification and other logic...
});



router.get('/protected-route',verifyToken,(req,res)=>{
    res.json({message: 'this is s protected route', userId: req.userId});
})


router.post('/google-login', googleLogin);













export default router;
    