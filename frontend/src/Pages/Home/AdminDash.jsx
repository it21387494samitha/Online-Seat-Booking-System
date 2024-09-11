import React from 'react';
import { useNavigate } from 'react-router-dom';


function AdminDash() {
  const navigate = useNavigate();

  return (

   
    <div className="admin-dashboard">
      <style>
        {`
        .admin-dashboard {
  padding: 20px;
  text-align: center;
}

.admin-header {
  margin-bottom: 20px;
}

.dashboard-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  background-color: #f1f1f1;
  padding: 20px;
  width: 200px;
  margin: 10px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card h3 {
  margin-bottom: 10px;
}

.card p {
  color: #666;
}

        
        
        `}
      </style>
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your events, users, and seat bookings from here.</p>
      </header>

      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate('/mevent')}>
          <h3>Manage Events</h3>
          <p>Create, edit, or delete events.</p>
        </div>

        <div className="card" onClick={() => navigate('/mevent')}>  
          <h3>Manage Users</h3>
          <p>View and manage user accounts and permissions.</p>
        </div>

        <div className="card" onClick={() => navigate('/seat-booking')}>
          <h3>Seat Booking</h3>
          <p>View and manage seat bookings for events.</p>
        </div>

        <div className="card" onClick={() => navigate('/settings')}>
          <h3>Settings</h3>
          <p>Configure system settings and preferences.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
