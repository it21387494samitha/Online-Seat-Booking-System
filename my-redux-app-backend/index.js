import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './Routers/UserRouter.js'; 

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

// Use Routes
app.use('/users',userRoute);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
