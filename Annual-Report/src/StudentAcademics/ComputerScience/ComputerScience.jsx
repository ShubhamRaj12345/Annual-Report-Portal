// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Papa from 'papaparse';
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
// } from 'chart.js';

// import './ComputerScience.css';

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale
// );

// const ComputerScience = () => {
//   const [students, setStudents] = useState([]);
//   const [semesterWiseStudents, setSemesterWiseStudents] = useState({});
//   const [name, setName] = useState('');
//   const [rollNo, setRollNo] = useState('');
//   const [semester, setSemester] = useState('');
//   const [grades, setGrades] = useState({});

//   const subjects = {
//     1: ['Math', 'Data Structures', 'OS', 'DBMS'],
//     2: ['Math', 'Algorithms', 'OS', 'DBMS'],
//     3: ['Math', 'DSA', 'Computer Networks', 'DBMS'],
//     4: ['Math', 'Software Engineering', 'Computer Networks', 'DBMS'],
//     5: ['Math', 'Compiler Design', 'Cloud Computing', 'DBMS'],
//     6: ['Math', 'AI', 'Operating Systems', 'DBMS'],
//     7: ['Math', 'Machine Learning', 'AI', 'DBMS'],
//     8: ['Math', 'Big Data', 'Machine Learning', 'DBMS'],
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = () => {
//     axios.get('http://localhost:7070/students')
//       .then((response) => setStudents(response.data))
//       .catch((error) => console.error('Error fetching students:', error));
//   };

//   const fetchStudentsBySemester = (sem) => {
//     axios.get(`http://localhost:7070/students/semester/${sem}`)
//       .then((response) => {
//         setSemesterWiseStudents((prev) => ({
//           ...prev,
//           [sem]: response.data
//         }));
//       })
//       .catch((error) => console.error(`Error fetching students for semester ${sem}:`, error));
//   };

//   const handleSemesterChange = (e) => {
//     const selectedSemester = e.target.value;
//     setSemester(selectedSemester);
//     setGrades({});
//   };

//   const handleAddStudent = (e) => {
//     e.preventDefault();
//     const newStudent = {
//       name,
//       rollNo,
//       semester: parseInt(semester),
//       subjects: grades,
//     };

//     axios.post('http://localhost:7070/students', newStudent)
//       .then((response) => {
//         setStudents([...students, response.data]);
//         setName('');
//         setRollNo('');
//         setSemester('');
//         setGrades({});
//         fetchStudentsBySemester(newStudent.semester); // Refresh semester list
//       })
//       .catch((error) => console.error('Error adding student:', error));
//   };

//   const handleGradeChange = (subject, grade) => {
//     setGrades({ ...grades, [subject]: grade });
//   };

//   const handleCSVUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       header: true,
//       skipEmptyLines: true,
//       complete: (results) => {
//         const parsedStudents = results.data
//           .filter(row => parseInt(row.semester) >= 1 && parseInt(row.semester) <= 8)
//           .map((row) => ({
//             name: row.name,
//             rollNo: row.rollNo,
//             semester: parseInt(row.semester),
//             subjects: {
//               Math: row.math,
//               'Data Structures': row.dataStructures,
//               OS: row.os,
//               DBMS: row.dbms,
//             },
//           }));
//         axios.post('http://localhost:7070/students/upload', parsedStudents)
//           .then(() => {
//             fetchStudents();
//             parsedStudents.forEach(s => fetchStudentsBySemester(s.semester));
//           })
//           .catch((error) => console.error('CSV upload failed:', error));
//       },
//     });
//   };

//   const prepareChartData = (students) => {
//     let passed = 0;
//     let failed = 0;

//     students.forEach((student) => {
//       const subjects = student.subjects || {};
//       const isPass = !Object.values(subjects).includes('F');
//       if (isPass) {
//         passed += 1;
//       } else {
//         failed += 1;
//       }
//     });

//     return {
//       labels: ['Passed', 'Failed'],
//       datasets: [
//         {
//           data: [passed, failed],
//           backgroundColor: ['#4CAF50', '#FF6347'],
//           hoverOffset: 4,
//         },
//       ],
//     };
//   };

//   return (
//     <div className="admin-home-container">
//       <h1>Department of Computer Science</h1>

//       <form className="student-form">
//         <h3>Upload Students via CSV</h3>
//         <label htmlFor="csvFile" className="upload-btn">Choose CSV File</label>
//         <input
//           type="file"
//           id="csvFile"
//           accept=".csv"
//           onChange={handleCSVUpload}
//           className="hidden-file"
//         />
//       </form>

//       <form onSubmit={handleAddStudent} className="student-form">
//         <input
//           type="text"
//           placeholder="Student Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Roll Number"
//           value={rollNo}
//           onChange={(e) => setRollNo(e.target.value)}
//           required
//         />

//         <select value={semester} onChange={handleSemesterChange} required>
//           <option value="">Select Semester</option>
//           {[...Array(8)].map((_, i) => (
//             <option key={i + 1} value={i + 1}>
//               Semester {i + 1}
//             </option>
//           ))}
//         </select>

//         {semester && subjects[semester].map((subject) => (
//           <select
//             key={subject}
//             value={grades[subject] || ''}
//             onChange={(e) => handleGradeChange(subject, e.target.value)}
//             required
//           >
//             <option value="">Select {subject} Grade</option>
//             <option value="A">A</option>
//             <option value="B">B</option>
//             <option value="C">C</option>
//             <option value="D">D</option>
//             <option value="F">F</option>
//           </select>
//         ))}

//         <button type="submit">Add Student</button>
//       </form>

//       <div className="student-list">
//         <h2>Semester-wise Students</h2>
//         {[...Array(8)].map((_, i) => {
//           const sem = i + 1;
//           const studentsInSem = semesterWiseStudents[sem] || [];

//           return (
//             <div key={sem} className="semester-container">
//               <h3>Semester {sem}</h3>
//               <button onClick={() => fetchStudentsBySemester(sem)}>View Students</button>

//               <div className="semester-content">
//                 <div className="student-list-container">
//                   {studentsInSem.length > 0 && (
//                     <div className="scrollable-list">
//                       <h4>Student List</h4>
//                       <table>
//                         <thead>
//                           <tr>
//                             <th>Name</th>
//                             <th>Roll No</th>
//                             <th>Status</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {studentsInSem.map((student) => {
//                             const subjects = student.subjects || {};
//                             const isPass = !Object.values(subjects).includes('F');
//                             return (
//                               <tr key={student.id}>
//                                 <td>{student.name}</td>
//                                 <td>{student.rollNo}</td>
//                                 <td>{isPass ? 'Pass' : 'Fail'}</td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>

//                 <div className="graph-container">
//                   <h4>Semester Performance</h4>
//                   <Doughnut data={prepareChartData(studentsInSem)} />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ComputerScience;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';

import './ComputerScience.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const ComputerScience = () => {
  const [students, setStudents] = useState([]);
  const [semesterWiseStudents, setSemesterWiseStudents] = useState({});
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [semester, setSemester] = useState('');
  const [grades, setGrades] = useState({});
  const [visibleSemester, setVisibleSemester] = useState(null);

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

  const fetchStudents = () => {
    axios.get('http://localhost:7070/students')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));
  };

  const fetchStudentsBySemester = (sem) => {
    axios.get(`http://localhost:7070/students/semester/${sem}`)
      .then((response) => {
        setSemesterWiseStudents((prev) => ({
          ...prev,
          [sem]: response.data
        }));
        setVisibleSemester(sem); // Show only selected semester
      })
      .catch((error) => console.error(`Error fetching students for semester ${sem}:`, error));
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);
    setGrades({});
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      name,
      rollNo,
      semester: parseInt(semester),
      subjects: grades,
    };

    axios.post('http://localhost:7070/students', newStudent)
      .then((response) => {
        setStudents([...students, response.data]);
        setName('');
        setRollNo('');
        setSemester('');
        setGrades({});
        fetchStudentsBySemester(newStudent.semester);
      })
      .catch((error) => console.error('Error adding student:', error));
  };

  const handleGradeChange = (subject, grade) => {
    setGrades({ ...grades, [subject]: grade });
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
              Math: row.math,
              'Data Structures': row.dataStructures,
              OS: row.os,
              DBMS: row.dbms,
            },
          }));
        axios.post('http://localhost:7070/students/upload', parsedStudents)
          .then(() => {
            fetchStudents();
            parsedStudents.forEach(s => fetchStudentsBySemester(s.semester));
          })
          .catch((error) => console.error('CSV upload failed:', error));
      },
    });
  };

  const prepareChartData = (students) => {
    let passed = 0;
    let failed = 0;

    students.forEach((student) => {
      const subjects = student.subjects || {};
      const isPass = !Object.values(subjects).includes('F');
      if (isPass) passed++;
      else failed++;
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
      <h1>Department of Computer Science</h1>

      {/* CSV Upload Form */}
      <form className="student-form1">
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

      {/* Manual Add Form */}
      <form onSubmit={handleAddStudent} className="student-form1">
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

        <select value={semester} onChange={handleSemesterChange} required>
          <option value="">Select Semester</option>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
          ))}
        </select>

        {semester && subjects[semester].map((subject) => (
          <select
            key={subject}
            value={grades[subject] || ''}
            onChange={(e) => handleGradeChange(subject, e.target.value)}
            required
          >
            <option value="">{subject} Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        ))}

        <button type="submit">Add Student</button>
      </form>

      {/* Semester Buttons */}
      <div className="student-list1">
        <h2>Semester-wise Students</h2>
        {[...Array(8)].map((_, i) => {
          const sem = i + 1;
          return (
            <button key={sem} onClick={() => fetchStudentsBySemester(sem)}>
              Semester {sem}
            </button>
          );
        })}
      </div>

      {/* Semester Display */}
      {visibleSemester && (
        <div className="semester-container">
          <h3>Semester {visibleSemester}</h3>
          <div className="semester-content">
            <div className="student-list-container">
              {semesterWiseStudents[visibleSemester]?.length > 0 && (
                <div className="scrollable-list">
                  <h4>Student List</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semesterWiseStudents[visibleSemester].map((student) => {
                        const subjects = student.subjects || {};
                        const isPass = !Object.values(subjects).includes('F');
                        return (
                          <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.rollNo}</td>
                            <td>{isPass ? 'Pass' : 'Fail'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
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

export default ComputerScience;
