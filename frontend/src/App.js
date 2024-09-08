import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../src/Pages/Login/RegisterPage';
import Login from '../src/Pages/Login/Login';
import CustomerDash from './Pages/Home/CustomerDash';
import AdminDash from './Pages/Home/AdminDash'
import SeatBooking from './Pages/SeatBooking/SeatBooking';
import AdminSeatManagement from './Admin/SeatAdd';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<CustomerDash/>}/>
          <Route path='/admin' element ={<AdminDash/>} />
          <Route path='/booking' element ={<SeatBooking/>} />
          <Route path='/ad' element={<AdminSeatManagement/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
