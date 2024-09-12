import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDash() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* You can add the sidebar code here if needed */}

      {/* Main Content */}
      <div className="flex-grow p-6">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your events, users, and seat bookings from here.</p>
        </header>

        {/* Statistics and Activities */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Total Events</h3>
            <p className="text-4xl font-extrabold text-blue-500">45</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Total Users</h3>
            <p className="text-4xl font-extrabold text-green-500">120</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Bookings</h3>
            <p className="text-4xl font-extrabold text-yellow-500">300</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Revenue</h3>
            <p className="text-4xl font-extrabold text-red-500">$5,000</p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate('/event')}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Manage Events</h3>
            <p className="text-gray-500">Create, edit, or delete events.</p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate('/manage-users')}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Manage Users</h3>
            <p className="text-gray-500">View and manage user accounts and permissions.</p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate('/seat-booking')}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Seat Booking</h3>
            <p className="text-gray-500">View and manage seat bookings for events.</p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate('/settings')}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Settings</h3>
            <p className="text-gray-500">Configure system settings and preferences.</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Recent Activities</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>User John Doe created a new event "Annual Conference" on Sep 12, 2024.</li>
            <li>User Jane Smith booked 5 seats for the event "Workshop".</li>
            <li>Admin updated the settings on Sep 11, 2024.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
