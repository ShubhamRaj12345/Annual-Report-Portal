import React, { useState } from 'react';
import './AdminLogin.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom'; // Import hook

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for redirection

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`http://localhost:7070/api/login?username=${username}&password=${password}`, {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          // Redirect to admin home
          navigate('/admin-home1');
        } else {
          return response.text().then(text => {
            setError(text);
          });
        }
      })
      .catch(err => {
        setError('Error: ' + err.message);
      });
  };

  return (
    <div className="admin-login-container">
      <Header />
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2 className="title">Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
