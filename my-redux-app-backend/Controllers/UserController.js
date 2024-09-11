import mongoose from "mongoose";
import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = "samitha"; // Use a secure secret key

// Helper function to validate Google email
const isGoogleEmail = (email) => {
    const emailDomain = email.split('@')[1];
    return emailDomain === 'gmail.com' || emailDomain.endsWith('.google.com');
};

// Register User
export function RegisterUser(req, res) {
    const { firstName, lastName, phone, email, age, subscription, password, isAdmin } = req.body;

    if (!firstName || !lastName || !phone || !email || !age || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (!isGoogleEmail(email)) {
        return res.status(400).json({ message: "Please use a valid Google email (e.g., @gmail.com)." });
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
                        res.status(500).json({ message: "Error saving user", error: err });
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

// Create Admin User
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
