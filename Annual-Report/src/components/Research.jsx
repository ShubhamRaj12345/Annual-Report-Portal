import React from 'react';
import { Link } from 'react-router-dom';

function Research() {
  return (
    <div className="content">
      <h2>Welcome to the Research Page</h2>
      <p>This section provides an overview of all research publications, ongoing projects, and collaborations within the institute.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default Research;