import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './Routers/UserRouter.js'; 
import seatRoutes from './Routers/seatRoutes.js';
import eventRoutes from './Routers/EventRoutes.js';
import settingRoutes from './Routers/SettingRoute.js'
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

app.use('/api',settingRoutes )

///// Get the current file path
app.get('/users/profile/image/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user || !user.profileImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Set the content type and send the image buffer
    res.contentType(user.profileImage.contentType);
    res.send(user.profileImage.data);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving image', error: err });
  }
});






// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
