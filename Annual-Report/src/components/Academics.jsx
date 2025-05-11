import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Importing Link here
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './style.css'; // Import the CSS file here

Chart.register(BarElement, CategoryScale, LinearScale);

const Academics = () => {
  const [students, setStudents] = useState([]);
  const [year, setYear] = useState('');

  // Fetch Students on Page Load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:7070/students') // Spring Boot port 7070
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  };

  // Group students by year and count passed students
  const groupStudentsByYear = () => {
    const yearGroups = {};

    students.forEach((student) => {
      if (!yearGroups[student.year]) {
        yearGroups[student.year] = { passed: 0, total: 0 };
      }

      yearGroups[student.year].total += 1;
      if (student.marks >= 40) { // Assuming pass mark is 40
        yearGroups[student.year].passed += 1;
      }
    });

    return yearGroups;
  };

  // Format the data for the bar chart
  const prepareChartData = () => {
    const yearGroups = groupStudentsByYear();
    const labels = Object.keys(yearGroups); // Years
    const passedData = labels.map((year) => yearGroups[year].passed); // Passed students
    const totalData = labels.map((year) => yearGroups[year].total); // Total students

    return {
      labels,
      datasets: [
        {
          label: 'Passed Students',
          data: passedData,
          backgroundColor: 'rgba(31, 251, 16, 0.6)',
        },
        {
          label: 'Total Students',
          data: totalData,
          backgroundColor: 'rgba(233, 0, 0, 0.6)',
        },
      ],
    };
  };

  return (
    <>
      <header>
        <h1>Annual Report Portal</h1>
      </header>

      <nav>
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/help">Help</Link>
        </div>

        <div className="dropdown">
          <a href="#" className="session-link">Session</a>
          <div className="dropdown-content">
            <a href="/session/2022">2022</a>
            <a href="/session/2023">2023</a>
            <a href="/session/2024">2024</a>
            <a href="/session/2025">2025</a>
            <a href="/session/2026">2026</a>
          </div>
        </div>

        <div className="dropdown">
          <a href="#" className="session-link">Branch</a>
          <div className="dropdown-content">
            <a href="/">Computer Science</a>
            <a href="/">Mechanical</a>
            <a href="/">Electrical</a>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* Bar Chart Section */}
        <div className="chart-section">
          <h2>Annual Student Report Acording To Marks </h2>
          <Bar
            data={prepareChartData()}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      </div>

      <footer>
        <p>&copy; 2025 Institute Annual Report Portal</p>
      </footer>
    </>
  );
};

export default Academics;
