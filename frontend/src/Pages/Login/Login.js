import React, { useState } from 'react';
import axios from 'axios';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const adminEmails = ['dhananjayasamitha68@gmail.com']; // List of admin emails

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState('google'); // 'email' or 'google'

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
    axios.post('http://localhost:5000/users/login', { email, password })  // POST to your backend
      .then((response) => {
        const { token } = response.data;

        // Check if the user is an admin
        const isAdmin = adminEmails.includes(email);
        const userRole = isAdmin ? 'admin' : 'user';

        alert('Login successful!');
        // Store token and user role in localStorage or session
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', userRole);
        console.info(token);

        // Navigate to different routes based on role
        if (isAdmin) {
          navigate('/admin');  // Redirect to admin dashboard
        } else {
          navigate('/');  // Redirect to regular user dashboard
        }
      })
      .catch((error) => {
        console.error('Error during email login:', error);
        alert('Login failed. Please try again.');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <button onClick={() => setLoginMethod('google')}>Sign in with Google</button>
        <button onClick={() => setLoginMethod('email')}>Sign in with Email</button>
      </div>

      {loginMethod === 'google' ? (
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleEmailLogin}>Sign in with Email</button>
        </div>
      )}

      <div> </div> 
        
        
        
    </div>
  );
}

export default Login;
