import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    age: '',
    subscription: 'false',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isGoogleEmail = (email) => {
    // Check if the email contains '@' before splitting
    if (!email.includes('@')) {
      return false; // Invalid email format
    }

    const emailDomain = email.split('@')[1];
    // Check if emailDomain is defined before calling endsWith
    return emailDomain === 'gmail.com' || (emailDomain && emailDomain.endsWith('.google.com'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isGoogleEmail(formData.email)) {
      alert('Please use a valid Google email (e.g., @gmail.com).');
      return;  // Prevent form submission
    }

    axios.post('http://localhost:5000/users/register', formData)  // Adjust the URL based on your backend server
      .then(response => {
        alert('User registered successfully!');
      })
      .catch(error => {
        console.error('Error registering user:', error);
        alert('Failed to register user.');
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="subscription" placeholder="Subscription" disabled onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
