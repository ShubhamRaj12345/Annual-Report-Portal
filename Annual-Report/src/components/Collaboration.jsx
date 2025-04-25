import React from 'react';
import { Link } from 'react-router-dom';

function Collaboration() {
  return (
    <div className="content">
      <h2>Welcome to the Collaboration Page</h2>
      <p>This section provides knowledge about the institute's collaborations with different institutes.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default Collaboration;