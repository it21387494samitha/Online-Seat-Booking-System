import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    LastName: '',
    Phone: '',
    Email: '',
    Age: '',
    Subscription: '',
    Password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isGoogleEmail = (email) => {
    const emailDomain = email.split('@')[1];
    return emailDomain === 'gmail.com' || emailDomain.endsWith('.google.com');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isGoogleEmail(formData.Email)) {
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
        <input type="text" name="LastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="text" name="Phone" placeholder="Phone" onChange={handleChange} required />
        <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
        <input type="number" name="Age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="Subscription" placeholder="Subscription" disabled onChange={handleChange} required />
        <input type="password" name="Password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
