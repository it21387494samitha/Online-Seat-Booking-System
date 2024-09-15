import express from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js'; 
import { getAllUsers, getUserProfile, RegisterUser, uploadProfileImage, UserLogin} from '../Controllers/UserController.js'; 
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public routes
router.post('/register', RegisterUser); 
router.post('/login', UserLogin);     

router.get('/all',getAllUsers);



// Protected routes
router.get('/profile', verifyToken, getUserProfile );

router.post('/upload-profile-image', verifyToken, upload.single('profileImage'), uploadProfileImage);

router.get('/settings', verifyToken, (req, res) => {
    res.json({ message: "Access to settings", user: req.user });
});

export default router;
