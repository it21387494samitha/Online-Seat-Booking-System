import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './Routers/UserRouter.js'; 
import seatRoutes from './Routers/seatRoutes.js';
import eventRoutes from './Routers/EventRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';


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

app.use("/api/seats", seatRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/events', eventRoutes);

///// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);

// Now you can use __dirname as usual
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));







// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
