import express from 'express';
import {RegisterUser } from '../Controllers/UserController.js';

const userRoute = express.Router();

userRoute.post('/', RegisterUser);

export default userRoute;

