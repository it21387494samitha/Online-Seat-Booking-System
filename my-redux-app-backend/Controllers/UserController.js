import mongoose from "mongoose";
import UserSchema from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = "samitha"; // Use a secure secret key
export const UserModel = mongoose.model("user", UserSchema);

// Helper function to validate Google email
const isGoogleEmail = (email) => {
    const emailDomain = email.split('@')[1];
    return emailDomain === 'gmail.com' || emailDomain.endsWith('.google.com');
};

export function RegisterUser(req, res) {
    const { firstName, LastName, Phone, Email, Age, Subscription, Password, isAdmin } = req.body;

    // Validate if the email is a Google email
    if (!isGoogleEmail(Email)) {
        return res.status(400).json({ message: "Please use a valid Google email (e.g., @gmail.com)." });
    }

    // Hash the password before saving the user
    bcrypt.hash(Password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password", error: err });
        }

        // Create the new user instance
        let newuser = new UserModel({
            firstName,
            LastName,
            Phone,
            Email,
            Age,
            Subscription,
            Password: hash,
            isAdmin: isAdmin || false ,
        });

        // Save the user in MongoDB
        newuser
            .save()
            .then((response) => {
                res.status(201).json(response);
                console.log("User successfully registered");
            })
            .catch((err) => {
                res.status(500).json({ message: "Error saving user", error: err });
                console.log(err);
            });
    });
}

export function Userlogin(req, res) {
    const { email, password } = req.body;

    // Find user by email
    UserModel.findOne({ Email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Compare password
            bcrypt.compare(password, user.Password)
                .then(isMatch => {
                    if (isMatch) {
                        // Create JWT token
                        const token = jwt.sign(
                            { id: user._id, email: user.Email, isAdmin: user.isAdmin },
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


export function createAdmin(req, res) {
    const { email, password } = req.body;

    UserModel.findOne({ Email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: "Error hashing password", error: err });
                }

                const newAdmin = new UserModel({
                    Email: email,
                    Password: hash,
                    isAdmin: true // Set admin flag
                });

                newAdmin.save()
                    .then(user => res.status(201).json(user))
                    .catch(err => res.status(500).json({ message: "Error saving user", error: err }));
            });
        })
        .catch(err => res.status(500).json({ message: "Error finding user", error: err }));
}