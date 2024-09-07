// src/Login.js
import React, { useState } from 'react';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState('google'); // 'email' or 'google'

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const email = user.email;

        if (email.endsWith('@gmail.com')) {
          alert('Login successful!');
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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Login successful!');
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
    </div>
  );
}

export default Login;
