
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './style.css';

const AdminHome1 = () => {
  const [mainCategory, setMainCategory]   = useState('');
  const [optionType, setOptionType]       = useState('');
  const [subOption, setSubOption]         = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const navigate = useNavigate();

  /* ---------- handlers ---------- */
  const handleCategorySelection = (mainCat, type) => {
    setMainCategory(mainCat);
    setOptionType(type);
    setSubOption('');
    setSelectedBranch('');
  };

  const handleOptionSelection = (option) => {
    setSubOption(option);
    setSelectedBranch('');
    if (option === 'Mechanical Engineering') {
      navigate('/mechanical');
    } else if (option === 'Computer Science') {
      navigate('/computer-science');
    } else if (option === 'Electrical Engineering') {
      navigate('/electrical');
    } else if (option === 'Civil Engineering') {
      navigate('/civil');
    }
  };

  const handleBranchSelection = (branch) => {
    setSelectedBranch(branch);
  };

  /* ---------- JSX ---------- */
  return (
    <>
      <header>
        <h1>Admin Panel</h1>
      </header>

      <nav>
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/help">Help</Link>
        </div>

        {/* ---- main categories ---- */}
        {!mainCategory && (
          <>
            {/* Finance */}
            <div className="dropdown">
              <a href="#" className="session-link">Finance</a>
              <div className="dropdown-content">
                <a href="#" onClick={() => handleCategorySelection('Finance', 'Department')}>Budget Allocation & Utilization</a>
                <a href="#" onClick={() => handleCategorySelection('Finance', 'Student Placement')}>Fee Structure & Scholarship</a>
                <a href="#" onClick={() => handleCategorySelection('Finance', 'Student Placement')}>Expense Summary</a>
              </div>
            </div>

            {/* Research */}
            <div className="dropdown">
              <a href="#" className="session-link">Research</a>
              <div className="dropdown-content">
                <a href="#" onClick={() => handleCategorySelection('Research', 'Department')}>Research Projects</a>
                <a href="#" onClick={() => handleCategorySelection('Research', 'Student Placement')}>Publications</a>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="dropdown">
              <a href="#" className="session-link">Infrastructure</a>
              <div className="dropdown-content">
                <a href="#" onClick={() => handleCategorySelection('Infrastructure', 'Department')}>Lab Detail</a>
                <a href="#" onClick={() => handleCategorySelection('Infrastructure', 'Student Placement')}>Classroom</a>
                <a href="#" onClick={() => handleCategorySelection('Infrastructure', 'Student Placement')}>Library</a>
                <a href="#" onClick={() => handleCategorySelection('Infrastructure', 'Student Placement')}>Hostel and Sports Facility</a>
                <a href="#" onClick={() => handleCategorySelection('Infrastructure', 'Student Placement')}>Maintenance Report</a>
              </div>
            </div>

            {/* Academics */}
            <div className="dropdown">
              <a href="#" className="session-link">Academics</a>
              <div className="dropdown-content">
                <a href="#" onClick={() => handleCategorySelection('Academics', 'Department')}>Department</a>
                <a href="#" onClick={() => handleCategorySelection('Academics', 'Student Placement')}>Student Placement</a>
              </div>
            </div>
          </>
        )}

        {/* ---- sub-options ---- */}
        {optionType === 'Department' && (
          <div className="dropdown">
            <a href="#" className="session-link">Select Department</a>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleOptionSelection('Computer Science')}>Computer Science</a>
              <a href="#" onClick={() => handleOptionSelection('Mechanical Engineering')}>Mechanical Engineering</a>
              <a href="#" onClick={() => handleOptionSelection('Electrical Engineering')}>Electrical Engineering</a>
              <a href="#" onClick={() => handleOptionSelection('Civil Engineering')}>Civil Engineering</a>
            </div>
          </div>
        )}

        {optionType === 'Student Placement' && (
          <div className="dropdown">
            <a href="#" className="session-link">Placement Type</a>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleOptionSelection('On Campus')}>On Campus</a>
              <a href="#" onClick={() => handleOptionSelection('Off Campus')}>Off Campus</a>
            </div>
          </div>
        )}

        {/* ---- branch ---- */}
        {optionType === 'Student Placement' && subOption && (
          <div className="dropdown">
            <a href="#" className="session-link">Select Branch</a>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleBranchSelection('Computer Science')}>Computer Science</a>
              <a href="#" onClick={() => handleBranchSelection('Mechanical Engineering')}>Mechanical Engineering</a>
              <a href="#" onClick={() => handleBranchSelection('Electrical Engineering')}>Electrical Engineering</a>
              <a href="#" onClick={() => handleBranchSelection('Civil Engineering')}>Civil Engineering</a>
            </div>
          </div>
        )}
      </nav>

      <div className="container">
        <Routes>
          <Route path="/about"       element={<div>About Us</div>} />
          <Route path="/contact"     element={<div>Contact Us</div>} />
          <Route path="/help"        element={<div>Help Page</div>} />
          <Route path="/mechanical"  element={<div>Mechanical Engineering Department Content</div>} />
          <Route path="/computer-science"  element={<div>Computer Science Department Content</div>} />
          <Route path="/electrical"  element={<div>Electrical Engineering Department Content</div>} />
          <Route path="/civil"  element={<div>Civil Engineering Department Content</div>} />
        </Routes>

        {(optionType === 'Department' && subOption) ||
         (optionType === 'Student Placement' && subOption && selectedBranch) ? (
          <div>
            <h2>Selected Academic Info</h2>
            <p>Main Category: {mainCategory}</p>
            <p>Option Type: {optionType}</p>
            <p>Sub Option: {subOption}</p>
            {selectedBranch && <p>Branch: {selectedBranch}</p>}
          </div>
        ) : null}
      </div>

      <footer>
        <p>&copy; 2025 Institute Annual Report Portal</p>
      </footer>
    </>
  );
};

export default AdminHome1;
