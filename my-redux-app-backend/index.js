import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './Routers/UserRouter.js'; 
import seatRoutes from './Routers/seatRoutes.js';
import eventRoutes from './Routers/EventRoutes.js';
import settingRoutes from './Routers/SettingRoute.js'
import attendenceRoute from './Routers/AttendanceRouter.js'
import feedback from './Routers/FeedbackRouter.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';
import authroutes from './Routers/AuthRoutes.js'


import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client("487049466992-6acu3fqq1ths32g98ceigh9lq085h0oo.apps.googleusercontent.com");




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Import Routes
// const userRoute = require('./Routers/UserRouter');

// Middleware
app.use(cors());
app.use(bodyParser.json());











app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend origin
  methods: 'POST',
}));

// Use Routes
app.use('/users',userRoute);

app.use("/api/seats", seatRoutes);
app.use("/api/events", eventRoutes);

app.use('/api',settingRoutes );

app.use('/attendance',attendenceRoute );

app.use('/api/feedback', feedback);

app.post("/users", async (req, res) => {
  console.log('Google login data received:', req.body);
  const { token } = req.body;

  try {
    // Verify the token using Google OAuth2Client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "487049466992-6acu3fqq1ths32g98ceigh9lq085h0oo.apps.googleusercontent.com", // Replace with your Google Client ID
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    // Proceed with your application logic (e.g., creating a user session or saving user data to the DB)

    res.status(200).json({ name, email, picture });
  } catch (error) {
    console.error("Error during token verification:", error);
    res.status(500).json({ error: "Internal Server Error during Google login" });
  }
});


app.use(cookieParser());
app.use(passport.initialize());

app.use('/auth', authroutes);





// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
