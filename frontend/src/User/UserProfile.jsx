import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js'; // Import crypto-js
import './Profile.css';
import { ClipLoader } from 'react-spinners'; // Loading spinner
import { 
  FaPhoneAlt, FaEnvelope, FaUserCircle, FaCheckCircle, 
  FaTimesCircle, FaMapMarkerAlt, FaBirthdayCake, FaGlobe, FaEdit 
} from 'react-icons/fa'; // Import icons

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios
        .get('http://localhost:5000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          setError('Failed to load profile. Please try again.');
          console.error('Error fetching user profile:', error);
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        });
    }
  }, [navigate]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const getGravatarUrl = (email) => {
    const emailHash = CryptoJS.MD5(email.trim().toLowerCase()).toString();
    return `https://www.gravatar.com/avatar/${emailHash}`;
  };

  const handleSubscriptionRenewal = () => {
    alert('Redirecting to subscription renewal...');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile'); // Example route to navigate to edit profile page
  };

  if (!user) {
    return (
      <div className="loading-container">
        <ClipLoader color="#007bff" />
        <p>Loading profile, please wait...</p>
      </div>
    );
  }

  const profileCompletion = calculateProfileCompletion(user);

  return (
    <div className={`profile-container ${darkMode ? 'dark-mode' : ''}`}>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      <h2>User Profile</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="profile-header">
        <div className="cover-photo">
          {/* Add cover photo, if applicable */}
        </div>

        <div className="profile-info">
          <div className="profile-image">
            <img src={getGravatarUrl(user.email)} alt="Profile" />
          </div>

          <div className="user-details">
            <p>
              <FaUserCircle className="icon" aria-label="User" />{' '}
              <strong>{user.firstName} {user.lastName}</strong>
            </p>
            <p>
              <FaEnvelope className="icon" /> {user.email}
            </p>
            <p>
              <FaPhoneAlt className="icon" /> Phone: {user.phone}
            </p>
            <p>
              <FaBirthdayCake className="icon" /> Age: {user.age}
            </p>
            <p>
              {/* <FaMapMarkerAlt className="icon" /> Location: {user.city}, {user.state}, {user.country} */}
            </p>
            <p>
              {/* <FaGlobe className="icon" /> Languages: {user.languages.join(', ')} */}
            </p>
            <p>
              <strong>Subscription: </strong>
              <span className={`subscription-status ${user.subscription ? 'active' : 'inactive'}`}>
                {user.subscription ? <FaCheckCircle /> : <FaTimesCircle />}
                {user.subscription ? ' Active' : ' Inactive'}
              </span>
            </p>

            <button className="edit-profile-button" onClick={handleEditProfile}>
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-completion">
          <p>Profile Completion: {profileCompletion}%</p>
          <div className="completion-bar">
            <div className="completion-bar-fill" style={{ width: `${profileCompletion}%` }}></div>
          </div>
        </div>

        {!user.subscription && (
          <button className="form-button" onClick={handleSubscriptionRenewal}>
            Renew Subscription
          </button>
        )}
      </div>

      <div className="user-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>Logged in 2 days ago</li>
          <li>Updated profile picture</li>
          <li>Posted a new comment</li>
          {/* Add more activity */}
        </ul>
      </div>
    </div>
  );
};

const calculateProfileCompletion = (user) => {
  const totalFields = 8; // Update based on the number of fields
  let completedFields = 0;
  if (user.firstName) completedFields++;
  if (user.lastName) completedFields++;
  if (user.email) completedFields++;
  if (user.phone) completedFields++;
  if (user.age) completedFields++;
  // if (user.city) completedFields++;
  // if (user.state) completedFields++;
  // if (user.country) completedFields++;

  return Math.floor((completedFields / totalFields) * 100);
};

export default Profile;
