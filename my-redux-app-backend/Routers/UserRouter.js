import express from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js'; 
import { getAllUsers, RegisterUser, UserLogin} from '../Controllers/UserController.js'; 

const router = express.Router();

// Public routes
router.post('/register', RegisterUser); 
router.post('/login', UserLogin);     

router.get('/all',getAllUsers);



// Protected routes
router.get('/profile', verifyToken, (req, res) => {
    
    res.json({ message: "This is a protected profile route", user: req.user });
});


router.get('/settings', verifyToken, (req, res) => {
    res.json({ message: "Access to settings", user: req.user });
});

export default router;
