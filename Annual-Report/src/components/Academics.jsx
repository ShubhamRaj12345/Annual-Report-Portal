import React from 'react';
import { Link } from 'react-router-dom';

function Academics() {
  return (
    <div className="content">
      <h2>Welcome to the Academics Page</h2>
      <p>This section provides an overview of our college's academics, like Semester Exams, Mid-Semester Exams, and End-Semester Exams.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default Academics;