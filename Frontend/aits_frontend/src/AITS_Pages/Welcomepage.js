import React from 'react';
import { Link } from 'react-router-dom';
import './Welcomepage.css';

const Welcomepage = () => {
  return (
    <div className="welcome-container">
      {/* Left side of the page */}
      <div className="left">
        {/* University Logo and Name */}
        <p></p>
        <p></p>
        <img src='/images/nobgmaklogo.png' alt="Makerere University LogO" className="university-logo" />
        <h4 className="university-name">MAKERERE UNIVERSITY</h4>

        {/* AITS Welcome Section */}
        <div className="welcome-card">
          <h1 className="system-title">AITS</h1>
          <h2 className="system-subtitle">ACADEMIC ISSUE TRACKING SYSTEM</h2>
          <p className="system-motto">
            "Streamline your academic concerns with our efficient issue tracking system. Submit, track, and resolve academic matters seamlessly."
          </p>
          <h3 className="call-to-action">Get Started Today!</h3>
        </div>

        {/* Navigation Buttons */}
        <div className="action-buttons">
          <Link to="/signup" className="btn btn-register">REGISTER TO START</Link>
          <Link to="/login" className="btn btn-login">LOGIN TO YOUR ACCOUNT</Link>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2025 AITS. All rights reserved.</p>
        </footer>
      </div>

      {/* Right side of the page */}
      <div className="right" style={{ backgroundImage: 'url("/images/pic.jpg")' }}></div>
    </div>
  );
};

export default Welcomepage;