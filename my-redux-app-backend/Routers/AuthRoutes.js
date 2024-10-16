// Routers/AuthRoutes.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Local login route
router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/fail' }), (req, res) => {
  res.status(200).json({ message: 'Logged in successfully', user: req.user });
});

// Google login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard'); // Adjust as needed for your frontend
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Failure route (optional)
router.get('/fail', (req, res) => {
  res.status(401).json({ message: 'Login failed' });
});

export default router;
