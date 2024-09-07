import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../src/Pages/Login/RegisterPage';
import Login from '../src/Pages/Login/Login';
import CustomerDash from './Pages/Home/CustomerDash';
import AdminDash from './Pages/Home/AdminDash'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<CustomerDash/>}/>
          <Route path='/admin' element ={<AdminDash/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
