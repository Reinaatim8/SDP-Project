import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const images = [
    '/images/makerereone.jpeg',
    '/images/makereretwo.jpeg',
    '/images/makererethree.jpeg',
    '/images/makererefour.jpeg',
    '/images/makererefive.jpeg',
  ];

  return (
    <div className="welcome-container">
      {/* Fixed Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">AITS</span>
        </div>
        <div className="navbar-right">
          <Link to="/about" className="nav-link">ABOUT</Link>
          <Link to="/features" className="nav-link">FEATURES</Link>
          <Link to="/contact" className="nav-link">CONTACT</Link>
        </div>
      </nav>

      {/* Conveyor Belt Positioned Under Navbar */}
      <div className="image-slider">
        <div className="image-track">
          {images.concat(images).map((src, index) => (
            <img key={index} src={src} alt={`slide-${index}`} className="slider-image" />
          ))}
        </div>
      </div>

      {/* Hero Content Below Images */}
      <div className="hero-section">
        <div className="hero-content">
          <img src='/images/nobgmaklogo.png' alt="AITS Logo" className="hero-logo" />
          <h1 className="hero-title">Welcome to AITS</h1>
          <h2 className="hero-subtitle">Academic Issue Tracking System</h2>
          <p className="hero-description">
            Streamline your academic concerns with our efficient issue tracking system. Submit, track, and resolve academic matters seamlessly.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="hero-button">GET STARTED</Link>
            <Link to="/login" className="hero-button-outline">LOGIN</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className='footer-div'>
          <div>lorem ddddddddddddd</div>
          <div>loremloremloremloremloremloremlorem</div>
          <div>loremloremloremloremloremlorem</div>


        </div>
        <p>&copy; 2025 AITS. All rights reserved.</p>
      </footer>
      
    </div>
  );
};

export default WelcomePage;
