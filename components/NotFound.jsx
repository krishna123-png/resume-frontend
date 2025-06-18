import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-wrapper">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="back-home">Go back to Home</Link>
    </div>
  );
}

