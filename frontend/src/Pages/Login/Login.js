import React, { useState } from 'react';
import axios from 'axios';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../../Component/Header';

const adminEmails = ['dhananjayasamitha68@gmail.com'];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const email = user.email;

        if (email.endsWith('@gmail.com')) {
          alert('Login successful!');
          navigate('/');
        } else {
          auth.signOut();
          alert('Only Google emails are allowed.');
        }
      })
      .catch((error) => {
        console.error('Error during Google login:', error);
        alert('Login failed. Please try again.');
      });
  };

  const handleEmailLogin = () => {
    axios.post('http://localhost:5000/users/login', { email, password })
      .then((response) => {
        const { token } = response.data;
        const isAdmin = adminEmails.includes(email);
        const userRole = isAdmin ? 'admin' : 'user';

        alert('Login successful!');
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', userRole);

        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error during email login:', error);
        alert('Login failed. Please try again.');
      });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/28291092/pexels-photo-28291092/free-photo-of-a-squirrel-climbing-up-a-tree-in-the-woods.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 p-10 bg-white bg-opacity-25 rounded-2xl shadow-2xl backdrop-blur-md max-w-md w-full">
        <h2 className="text-3xl font-semibold text-white mb-4 text-center">Welcome Back!</h2>
        <p className="text-sm text-gray-200 mb-6 text-center">Sign in to continue</p>

        <button
          className="w-full flex items-center justify-center bg-white text-gray-800 py-3 px-6 rounded-lg shadow hover:bg-gray-200 transition mb-4"
          onClick={handleGoogleLogin}
        >
          <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google icon" className="w-1 h-1 mr-3" />
          Sign in with Google
        </button>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white bg-opacity-10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white bg-opacity-10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-300"
          />
          <button
            className="w-full py-3 px-6 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition"
            onClick={handleEmailLogin}
          >
            Sign in with Email
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-300 text-center">
          <p>Terms of Service | Privacy Policy</p>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full opacity-60 blur-md"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-60 blur-md"></div>
    </div>
  );
}

export default Login;
