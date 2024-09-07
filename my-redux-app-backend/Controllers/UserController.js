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
    const { firstName, LastName, Phone, Email, Age, Subscription, Password } = req.body;

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
    const { Email, Password } = req.body;

    // Validate if the email is a Google email
    if (!isGoogleEmail(Email)) {
        return res.status(400).json({ message: "Please use a valid Google email (e.g., @gmail.com)." });
    }

    // Find the user by email in the database
    UserModel.findOne({ Email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Compare the provided password with the hashed password in the database
            bcrypt.compare(Password, user.Password)
                .then(isMatch => {
                    if (isMatch) {
                        // Create a JWT token if passwords match
                        const token = jwt.sign(
                            { id: user._id, email: user.Email },
                            secretKey, // Sign token with the secret key
                            { expiresIn: '1h' } // Token expiration time
                        );

                        res.status(200).json({ message: "Login successfully", token });
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
