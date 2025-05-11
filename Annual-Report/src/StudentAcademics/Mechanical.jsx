import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import {
  Pie,
  Bar,
  Line,
  Doughnut,
  PolarArea
} from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';

import './Mechanical.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale
);

const Mechanical = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [semester, setSemester] = useState('');
  const [math, setMath] = useState('');
  const [physics, setPhysics] = useState('');
  const [thermo, setThermo] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:7070/students')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      name,
      rollNo,
      semester: parseInt(semester),
      subjects: {
        math,
        physics,
        thermodynamics: thermo
      }
    };

    axios.post('http://localhost:7070/students', newStudent)
      .then((response) => {
        setStudents([...students, response.data]);
        setName('');
        setRollNo('');
        setSemester('');
        setMath('');
        setPhysics('');
        setThermo('');
      })
      .catch((error) => console.error('Error adding student:', error));
  };

  const handleDeleteStudent = (id) => {
    axios.delete(`http://localhost:7070/students/${id}`)
      .then(() => setStudents(students.filter(student => student.id !== id)))
      .catch((error) => console.error('Error deleting student:', error));
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedStudents = results.data
          .filter(row => parseInt(row.semester) >= 1 && parseInt(row.semester) <= 8)
          .map((row) => ({
            name: row.name,
            rollNo: row.rollNo,
            semester: parseInt(row.semester),
            subjects: {
              math: row.math,
              physics: row.physics,
              thermodynamics: row.thermodynamics,
            },
          }));
        axios.post('http://localhost:7070/students/upload', parsedStudents)
          .then(() => fetchStudents())
          .catch((error) => console.error('CSV upload failed:', error));
      },
    });
  };

  const prepareChartData = () => {
    const semesterGroups = {};

    students.forEach((student) => {
      const subjects = student.subjects || {};
      const isPass = !Object.values(subjects).includes('F');
      if (!semesterGroups[student.semester]) {
        semesterGroups[student.semester] = { passed: 0, total: 0 };
      }
      semesterGroups[student.semester].total += 1;
      if (isPass) {
        semesterGroups[student.semester].passed += 1;
      }
    });

    const labels = Object.keys(semesterGroups).map((sem) => `Sem ${sem}`);
    const data = Object.values(semesterGroups).map((g) => g.passed);

    return {
      labels,
      datasets: [
        {
          label: 'Passed Students',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(100, 255, 218, 0.6)',
            'rgba(200, 100, 255, 0.6)'
          ],
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="admin-home-container">
      <h1>Department of Mechanical Engineering</h1>

      <form className="student-form">
        <h3>Upload Students via CSV</h3>
        <label htmlFor="csvFile" className="upload-btn">Choose CSV File</label>
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          onChange={handleCSVUpload}
          className="hidden-file"
        />
      </form>

      <form onSubmit={handleAddStudent} className="student-form">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />

        <select value={semester} onChange={(e) => setSemester(e.target.value)} required>
          <option value="">Select Semester</option>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Semester {i + 1}
            </option>
          ))}
        </select>

        <select value={math} onChange={(e) => setMath(e.target.value)} required>
          <option value="">Select Math Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
        <select value={physics} onChange={(e) => setPhysics(e.target.value)} required>
          <option value="">Select Physics Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
        <select value={thermo} onChange={(e) => setThermo(e.target.value)} required>
          <option value="">Select Thermodynamics Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>

        <button type="submit">Add Student</button>
      </form>

      <div className="student-list">
        <h2>Students List</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Semester</th>
                <th>Math</th>
                <th>Physics</th>
                <th>Thermo</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const subjects = student.subjects || {};
                const isPass = !Object.values(subjects).includes('F');
                return (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.semester}</td>
                    <td>{subjects.math}</td>
                    <td>{subjects.physics}</td>
                    <td>{subjects.thermodynamics}</td>
                    <td>{isPass ? 'Pass' : 'Fail'}</td>
                    <td>
                      <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="chart-section">
        <h2>Semester-wise Pass Count</h2>
        <div className="chart-scroll-container">
          <div className="chart-wrapper">
            <h4>Pie Chart</h4>
            <Pie data={prepareChartData()} />

            <h4>Bar Chart</h4>
            <Bar data={prepareChartData()} options={{ responsive: true, plugins: { legend: { display: false } } }} />

            <h4>Line Chart</h4>
            <Line data={prepareChartData()} options={{ responsive: true }} />

            <h4>Doughnut Chart</h4>
            <Doughnut data={prepareChartData()} />

            <h4>Polar Area Chart</h4>
            <PolarArea data={prepareChartData()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mechanical;
