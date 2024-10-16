import mongoose from "mongoose";
import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
// import serviceAccount from '../online-seat-booking-1b50c-firebase-adminsdk-fj9fz-12de045057.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });



const secretKey = "samitha"; // Use a secure secret key


const storage = multer.memoryStorage(); // Store the image in memory as a buffer
const upload = multer({ storage: storage }); // Use memory storage for multer

// Helper function to validate Google email
const isGoogleEmail = (email) => {
    const emailDomain = email.split('@')[1];
    return emailDomain === 'gmail.com' || emailDomain.endsWith('.google.com');
};






// Register User
export function RegisterUser(req, res) {
    const { firstName, lastName, phone, email, age, subscription, password, isAdmin } = req.body;

    // Debug log to check request body data
    console.log('Registering user with:', req.body);

    if (!firstName || !lastName || !phone || !email || !age || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (!isGoogleEmail(email)) {
        return res.status(400).json({ message: "Please use a valid Google email (e.g., @gmail.com)." });
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ message: "Email cannot be null or empty." });
    }

    UserModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: "Email already registered." });
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: "Error hashing password", error: err });
                }

                const newUser = new UserModel({
                    firstName,
                    lastName,
                    phone,
                    email,
                    age,
                    subscription,
                    password: hash,
                    isAdmin: isAdmin || false,
                });

                newUser.save()
                    .then(response => {
                        res.status(201).json(response);
                        console.log("User successfully registered");
                    })
                    .catch(err => {
                        if (err.code === 11000) {
                            res.status(400).json({ message: "Duplicate email entry." });
                        } else {
                            res.status(500).json({ message: "Error saving user", error: err });
                        }
                        console.log(err);
                    });
            });
        })
        .catch(err => res.status(500).json({ message: "Error checking user existence", error: err }));
}




// User Login
export function UserLogin(req, res) {
    const { email, password } = req.body;

    // Find user by email
    UserModel.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Compare password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // Create JWT token
                        const token = jwt.sign(
                            { id: user._id, email: user.email, isAdmin: user.isAdmin },
                            secretKey,  // Use a secure key
                            { expiresIn: '1h' }  // Token expiration time
                        );

                        // Send the token to the client
                        res.status(200).json({ message: "Login successful", token });
                    } else {
                        res.status(400).json({ message: "Invalid credentials" });
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: "Error comparing passwords", error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ message: "Error finding user", error: err });
        });
}


export function CreateAdmin(req, res) {
    const { email, password } = req.body;

    UserModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: "Error hashing password", error: err });
                }

                const newAdmin = new UserModel({
                    email,
                    password: hash,
                    isAdmin: true
                });

                newAdmin.save()
                    .then(user => res.status(201).json(user))
                    .catch(err => res.status(500).json({ message: "Error saving user", error: err }));
            });
        })
        .catch(err => res.status(500).json({ message: "Error finding user", error: err }));
}





export function getAllUsers(req, res) {
    UserModel.find({})
        .then(users => {
            res.status(200).json(users); // Return all users
        })
        .catch(err => {
            res.status(500).json({ message: "Error fetching users", error: err });
        });
}



// Fetch user profile
export function getUserProfile(req, res) {
    const userId = req.user.id; // Extracted from the JWT token

    UserModel.findById(userId)
        .select('-password') // Exclude password
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: "Error fetching user", error: err });
        });
}





export const uploadProfileImage = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Save image data
      user.profileImage = {
        data: fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)),
        contentType: req.file.mimetype,
      };
  
      await user.save();
  
      res.json({ message: 'Profile image uploaded successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to upload image.' });
    }
  };



  export const googleLogin = async (req, res) => {
    try {
      const { token } = req.body;
      console.log('Google token received:', token);
  
      // Verify the Google token
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log('Decoded token:', decodedToken);
  
      const { email } = decodedToken;
  
      // Check if the user exists in MongoDB
      let user = await UserModel.findOne({ email });
      console.log('User found:', user);
  
      if (!user) {
        // If user doesn't exist, create a new user
        user = new UserModel({
          email,
          password: null,  // Google users don’t have a password initially
          isVerified: true,
          role: 'user',  // Default role
        });
        await user.save();
        console.log('New user created:', user);
      }
  
      // Generate JWT token for your app
      const appToken = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
  
      // Return user info and app token
      return res.status(200).json({ userRole: user.role, token: appToken });
    } catch (error) {
      console.error('Error during Google login:', error);
      return res.status(500).json({ message: 'Google login failed' });
    }
  };
  