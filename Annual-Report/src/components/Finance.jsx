import React from 'react';
import { Link } from 'react-router-dom';

function Finance() {
  return (
    <div className="content">
      <h2>Welcome to the Finance Page</h2>
      <p>This section provides an overview of all finance and funding raised by the different institute.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default Finance;