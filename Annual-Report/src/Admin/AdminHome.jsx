import React, { useState } from 'react';

const AdminHome = () => {
  const [faculty, setFaculty] = useState({
    name: '',
    email: '',
    department: '',
    password: ''
  });

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Faculty Submitted:', faculty);
    alert('Faculty registered successfully!');
    setFaculty({ name: '', email: '', department: '', password: '' });
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '194.5vh',
    background: 'linear-gradient(to right, #4facfe, #00f2fe)',
    padding: '1rem',
  };

  const formStyle = {
    background: '#fff',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = {
    marginBottom: '15px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Faculty Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={faculty.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={faculty.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={faculty.department}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={faculty.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>Register Faculty</button>
      </form>
    </div>
  );
};

export default AdminHome;
