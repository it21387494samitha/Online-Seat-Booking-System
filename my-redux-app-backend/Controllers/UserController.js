import mongoose from "mongoose";
import UserSchema from "../Models/UserModel.js";
import { response } from "express";
import bcrypt, { hash } from 'bcrypt'
import user from "../Models/UserModel.js";

export const UserModel = mongoose.model("user",UserSchema);


export function RegisterUser(req, res) {
    const { firstName, LastName, Phone, Email, Age, Subscription, Password } = req.body;

   
    bcrypt.hash(Password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password", error: err });
        }

       
        let newuser = new UserModel({
            firstName,
            LastName,
            Phone,
            Email,
            Age,
            Subscription,
            Password: hash, 
        });

       
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

    
    UserModel.findOne({ Email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            
            bcrypt.compare(Password, user.Password)
                .then(isMatch => {
                    if (isMatch) {
                        res.status(200).json({ message: "Login successfully" });
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

