import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
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
          setPreviewImage(response.data.profileImage); // Set existing image
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        });
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (image) {
      const formData = new FormData();
      formData.append('profileImage', image);

      try {
        const response = await axios.post(
          'http://localhost:5000/users/upload-profile-image',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        alert('Image uploaded successfully!');
        setUser({ ...user, profileImage: response.data.profileImage });
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Subscription:</strong> {user.subscription ? 'Active' : 'Inactive'}</p>
        
        {/* Display Profile Image */}
        {previewImage && (
          <div className="profile-image">
            <img src={previewImage} alt="Profile" />
          </div>
        )}

        {/* Upload Image Form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="profileImage">Upload Profile Image:</label>
          <input type="file" id="profileImage" onChange={handleImageUpload} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
