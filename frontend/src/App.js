import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../src/Pages/Login/RegisterPage';
import Login from '../src/Pages/Login/Login';
import CustomerDash from './Pages/Home/CustomerDash';
import AdminDash from './Pages/Home/AdminDash'
import SeatBooking from './Pages/SeatBooking/SeatBooking';
import AdminSeatManagement from './Admin/SeatAdd';
import Adminevent from './Admin/ManageEvents'
import EventForm from './Admin/EventForm';
import ManageEvents from './Admin/ManageEvents';
import EventList from './Pages/Event/EventList';
// import { Sidebar } from 'react-pro-sidebar';
import Sidebar from './Component/SideBar';
import Header from './Component/Header';
// import Header from './Component/Header';

function App() {
  return (
    <Router>
      
      <div className="App">
        <Sidebar/>
        <Header/>

<div className="main-content" style={{ }}>
        <Routes>
        
        <Route path='/event' element={<EventForm/>} />
        <Route path='/admin' element ={<AdminDash/>} />
        <Route path='/ad' element={<AdminSeatManagement/>} />
        </Routes>


          <Routes>

            
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<CustomerDash/>}/>
          
         
        
          <Route path='/mevent' element={<ManageEvents/>} />
          
          <Route path='/list' element={<EventList/>} />
          <Route path='/booking/:eventId' element ={<SeatBooking/>} />
          
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
