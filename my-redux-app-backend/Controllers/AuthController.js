// controllers/authController.js
import User from '../Models/UserModel';'../models/User';
import bcrypt from 'bcryptjs';

// Register User
export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
};

// Login User
export const login = (req, res) => {
  res.status(200).json({ message: 'Logged in successfully', user: req.user });
};

// Logout User
export const logout = (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out successfully' });
  });
};
