import React, { useState } from 'react';
import axios from 'axios';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup, getIdToken } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const adminEmails = ['dhananjayasamitha68@gmail.com'];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Password toggle state
  const navigate = useNavigate();

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Get Firebase ID token
      const token = await getIdToken(user);

      // Send the Firebase ID token to your backend for verification
      const response = await axios.post('http://localhost:5000/auth/google', { token });
      const backendToken = response.data.token;

      // Store the backend JWT token and user role
      localStorage.setItem('token', backendToken);
      const isAdmin = adminEmails.includes(user.email);
      const userRole = isAdmin ? 'admin' : 'user';
      localStorage.setItem('userRole', userRole);

      // Fetch user data after successful login
      await fetchData();

      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Error during Google login:', error);
      alert('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle email login
  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password });
      const { token } = response.data;
      const isAdmin = adminEmails.includes(email);
      const userRole = isAdmin ? 'admin' : 'user';

      // Store the backend JWT token and user role
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);

      alert('Login successful!');
      navigate(isAdmin ? '/admin' : '/');
    } catch (error) {
      console.error('Error during email login:', error);
      alert('Login failed. Incorrect email or password.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch protected data after login
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/protected-route', {
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the JWT token in the Authorization header
        },
      });
      console.log('Fetched user data:', response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/28291092/pexels-photo-28291092/free-photo-of-a-squirrel-climbing-up-a-tree-in-the-woods.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 p-10 bg-white bg-opacity-25 rounded-2xl shadow-2xl backdrop-blur-md max-w-md w-full mx-4">
        <h2 className="text-3xl font-semibold text-white mb-4 text-center">Welcome Back!</h2>
        <p className="text-sm text-gray-200 mb-6 text-center">Sign in to continue</p>

        <button
          className={`w-full flex items-center justify-center bg-white text-gray-800 py-3 px-6 rounded-lg shadow-lg transition-transform hover:scale-105 mb-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? 'Signing in...' : (
            <>
              <FcGoogle className="text-xl mr-3" />
              Sign in with Google
            </>
          )}
        </button>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white bg-opacity-10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-300"
            required
          />

          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white bg-opacity-10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-300"
              required
            />
            <div
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
            </div>
          </div>

          <button
            className={`w-full py-3 px-6 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleEmailLogin}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in with Email'}
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-300 text-center">
          <p>By signing in, you agree to our <span className="underline hover:text-pink-500 cursor-pointer">Terms of Service</span> and <span className="underline hover:text-pink-500 cursor-pointer">Privacy Policy</span>.</p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-200">Don't have an account? <Link to="/signup" className="text-pink-500 hover:underline">Sign Up</Link></p>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full opacity-60 blur-md"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-60 blur-md"></div>
    </div>
  );
}

export default Login;
