import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './style.css';

const AdminHome1 = () => {
  const [mainCategory, setMainCategory] = useState('');
  const [optionType, setOptionType] = useState('');
  const [subOption, setSubOption] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const navigate = useNavigate();

  const handleCategorySelection = (mainCat, type) => {
    setMainCategory(mainCat);
    setOptionType(type);
    setSubOption('');
    setSelectedBranch('');
    setSelectedYear('');
  };

  const handleOptionSelection = (option) => {
    setSubOption(option);
    setSelectedBranch('');
    setSelectedYear('');
    if (option === 'Mechanical Engineering') {
      navigate('/mechanical'); // Navigate to the Mechanical Engineering page
    }
  };

  const handleBranchSelection = (branch) => {
    setSelectedBranch(branch);
    setSelectedYear('');
  };

  const handleYearSelection = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    if (
      (optionType === 'Department' && subOption && selectedYear) ||
      (optionType === 'Student Placement' && subOption && selectedBranch && selectedYear)
    ) {
      navigate('/computer-science');
    }
  }, [optionType, subOption, selectedBranch, selectedYear, navigate]);

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

        {/* Department SubOptions */}
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

        {/* Student Placement SubOptions */}
        {optionType === 'Student Placement' && (
          <div className="dropdown">
            <a href="#" className="session-link">Placement Type</a>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleOptionSelection('On Campus')}>On Campus</a>
              <a href="#" onClick={() => handleOptionSelection('Off Campus')}>Off Campus</a>
            </div>
          </div>
        )}

        {/* Branch Selection */}
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

        {/* Year Selection */}
        {(optionType === 'Department' && subOption) || (optionType === 'Student Placement' && subOption && selectedBranch) ? (
          <div className="dropdown">
            <a href="#" className="session-link">Select Year</a>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleYearSelection('2022')}>2022</a>
              <a href="#" onClick={() => handleYearSelection('2023')}>2023</a>
              <a href="#" onClick={() => handleYearSelection('2024')}>2024</a>
              <a href="#" onClick={() => handleYearSelection('2025')}>2025</a>
              <a href="#" onClick={() => handleYearSelection('2026')}>2026</a>
            </div>
          </div>
        ) : null}
      </nav>

      <div className="container">
        <Routes>
          <Route path="/about" element={<div>About Us</div>} />
          <Route path="/contact" element={<div>Contact Us</div>} />
          <Route path="/help" element={<div>Help Page</div>} />
          <Route path="/mechanical" element={<div>Mechanical Engineering Department Content</div>} />
        </Routes>

        {(optionType === 'Department' && subOption && selectedYear) ||
        (optionType === 'Student Placement' && subOption && selectedBranch && selectedYear) ? (
          <div>
            <h2>Selected Academic Info</h2>
            <p>Main Category: {mainCategory}</p>
            <p>Option Type: {optionType}</p>
            <p>Sub Option: {subOption}</p>
            {selectedBranch && <p>Branch: {selectedBranch}</p>}
            <p>Year: {selectedYear}</p>
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
