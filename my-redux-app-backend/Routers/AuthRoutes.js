// Routers/AuthRoutes.js
import express from 'express';
import { google, signOut, signin, signup } from '../Controllers/AuthController.js';


 const router = express.Router();

 router.post("/signup",signup) ;
 router.post("/signin",signin);
 router.post('/google',google);
 router.get('/signout',signOut);


export default router;
