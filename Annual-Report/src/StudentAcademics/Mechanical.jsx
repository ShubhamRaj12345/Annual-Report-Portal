import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import './Mechanical.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const Mechanical = () => {
  const [students, setStudents] = useState([]);
  const [semesterWiseStudents, setSemesterWiseStudents] = useState({});
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [semester, setSemester] = useState('');
  const [grades, setGrades] = useState({});
  const [session, setSession] = useState('');
  const [filterSession, setFilterSession] = useState('');
  const [visibleSemester, setVisibleSemester] = useState(null);
  const [message, setMessage] = useState('');

  const subjects = {
    1: ['Math', 'Data Structures', 'OS', 'DBMS'],
    2: ['Math', 'Algorithms', 'OS', 'DBMS'],
    3: ['Math', 'DSA', 'Computer Networks', 'DBMS'],
    4: ['Math', 'Software Engineering', 'Computer Networks', 'DBMS'],
    5: ['Math', 'Compiler Design', 'Cloud Computing', 'DBMS'],
    6: ['Math', 'AI', 'Operating Systems', 'DBMS'],
    7: ['Math', 'Machine Learning', 'AI', 'DBMS'],
    8: ['Math', 'Big Data', 'Machine Learning', 'DBMS'],
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (filterSession) {
      for (let i = 1; i <= 8; i++) {
        fetchStudentsBySemester(i);
      }
    }
  }, [filterSession]);

  const fetchStudents = () => {
    axios.get('http://localhost:7070/students')
      .then((res) => setStudents(res.data))
      .catch((err) => console.error('Error fetching students:', err));
  };

  const fetchStudentsBySemester = (sem) => {
    if (!filterSession) return;
    axios.get(`http://localhost:7070/students/semester/${sem}/session/${filterSession}`)
      .then((res) => {
        setSemesterWiseStudents((prev) => ({
          ...prev,
          [sem]: res.data,
        }));
      })
      .catch((err) => console.error(`Error fetching semester ${sem}:`, err));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      name,
      rollNo,
      semester: parseInt(semester),
      session,
      subjects: grades,
    };
    axios.post('http://localhost:7070/students', newStudent)
      .then(() => {
        fetchStudentsBySemester(newStudent.semester);
        setName('');
        setRollNo('');
        setSemester('');
        setSession('');
        setGrades({});
        setMessage('Student added successfully!');
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((err) => console.error('Error adding student:', err));
  };

  const handleDeleteStudent = (id, semester) => {
    axios.delete(`http://localhost:7070/students/${id}`)
      .then(() => {
        fetchStudentsBySemester(semester);
        setMessage('Student deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((err) => console.error('Error deleting student:', err));
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    axios.post('http://localhost:7070/students/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        const uploadedSession = res.data.session;
        setFilterSession(uploadedSession);
        setMessage('Upload successful!');
        setTimeout(() => setMessage(''), 3000);
        for (let i = 1; i <= 8; i++) {
          fetchStudentsBySemester(i);
        }
      })
      .catch((err) => console.error('Upload failed:', err));
  };

  const downloadTemplate = (sem) => {
    const headers = ['name', 'rollNo', 'semester', 'session', ...subjects[sem]];
    const csvContent = [headers.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `semester_${sem}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const prepareChartData = (students) => {
    let passed = 0;
    let failed = 0;
    students.forEach((s) => {
      const isPass = s.subjects ? !Object.values(s.subjects).includes('F') : false;
      isPass ? passed++ : failed++;
    });

    return {
      labels: ['Passed', 'Failed'],
      datasets: [{
        data: [passed, failed],
        backgroundColor: ['#4CAF50', '#FF6347'],
        hoverOffset: 4,
      }],
    };
  };

  return (
    <div className="admin-home-container1">
      <h1>Department of Mechanical</h1>
      {message && <div className="message-popup">{message}</div>}

      {/* CSV Upload */}
      <form className="student-form1">
        <h3>Upload Students via CSV</h3>
        <label htmlFor="csvFile" className="upload-btn">Choose CSV File</label>
        <input type="file" id="csvFile" accept=".csv" onChange={handleCSVUpload} className="hidden-file" />
        <div className="csv-templates">
          <h4>Download Semester-wise CSV Templates</h4>
          {[...Array(8)].map((_, i) => {
            const sem = i + 1;
            return (
              <button type="button" key={sem} onClick={() => downloadTemplate(sem)}>
                Download Semester {sem} Template
              </button>
            );
          })}
        </div>
      </form>

      {/* Manual Add Form */}
      <form onSubmit={handleAddStudent} className="student-form1">
        <input type="text" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Roll Number" value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
        <select value={semester} onChange={(e) => { setSemester(e.target.value); setGrades({}); }} required>
          <option value="">Select Semester</option>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
          ))}
        </select>
        <select value={session} onChange={(e) => setSession(e.target.value)} required>
          <option value="">Select Session</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
        </select>
        {semester && subjects[semester]?.map((sub) => (
          <select key={sub} value={grades[sub] ?? ''} onChange={(e) => setGrades({ ...grades, [sub]: e.target.value })} required>
            <option value="">{sub} Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        ))}
        <button type="submit">Add Student</button>
      </form>

      {/* Session Filter */}
      <div className="session-selector-container">
        <h3>Filter by Session</h3>
        <select value={filterSession} onChange={(e) => setFilterSession(e.target.value)}>
          <option value="">-- Select Session --</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
        </select>
      </div>

      {/* Semester Buttons */}
      <div className="student-list1">
        <h2>Semester-wise Students</h2>
        <div className="semester-buttons">
          {[...Array(8)].map((_, i) => {
            const sem = i + 1;
            return (
              <button key={sem} onClick={() => { setVisibleSemester(sem); fetchStudentsBySemester(sem); }}>
                Semester {sem}
              </button>
            );
          })}
        </div>
      </div>

      {/* Display Semester Data */}
      {visibleSemester && (
        <div className="semester-container">
          <h3>Semester {visibleSemester}</h3>
          <div className="semester-content">
            <div className="student-list-container">
              <div className="scrollable-list">
                <h4>Student List</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Roll No</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semesterWiseStudents[visibleSemester]?.map((s) => {
                      const isPass = s.subjects ? !Object.values(s.subjects).includes('F') : false;
                      return (
                        <tr key={s.id}>
                          <td>{s.name}</td>
                          <td>{s.rollNo}</td>
                          <td>{isPass ? 'Pass' : 'Fail'}</td>
                          <td>
                            <button onClick={() => handleDeleteStudent(s.id, visibleSemester)}>Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="graph-container">
              <h4>Semester Performance</h4>
              <Doughnut data={prepareChartData(semesterWiseStudents[visibleSemester])} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mechanical;
