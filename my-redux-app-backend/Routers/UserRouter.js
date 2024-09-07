import express from 'express';
import {RegisterUser, Userlogin } from '../Controllers/UserController.js';

const userRoute = express.Router();

userRoute.post('/register', RegisterUser);
userRoute.post('/login',Userlogin);

export default userRoute;

