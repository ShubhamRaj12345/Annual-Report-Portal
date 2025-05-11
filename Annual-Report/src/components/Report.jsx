import React from 'react';
import { Link } from 'react-router-dom';
import Index from './Academics';
function Report() {
  return (
    <div className="content">
      <h2>Welcome to the Final Report Page</h2>
      <p>This section allows you to view the final report.</p>
      <Link to="/">← Back to Home</Link>
      <Index />
    </div>
  );
}

export default Report;