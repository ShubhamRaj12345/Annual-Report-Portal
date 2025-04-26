import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './components/Dashboard';
import Research from './components/Research';
import Finance from './components/Finance';
import Academics from './components/Academics';
import Collaboration from './components/Collaboration';
import Report from './components/Report';
import AdminLogin from './Admin/AdminLogin';
import AdminHome from './Admin/AdminHome';


function App() {
  

  return (
    <Router>
      <div className="app">
    

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin-login.html" element={<AdminLogin/>} />
          <Route path="/research" element={<Research />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/report" element={<Report />} />
          <Route path="/admin-home" element={<AdminHome />} />
       

          
        </Routes>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
