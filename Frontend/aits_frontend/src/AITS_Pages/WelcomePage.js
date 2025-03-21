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
          <Link to="/Aboutpage" className="nav-link">ABOUT</Link>
          <Link to="/features" className="nav-link">FEATURES</Link>
          <Link to="/Aboutpage" className="nav-link">CONTACT</Link>
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
      <footer className="footer-welcome">
        <div id='footer-daddy'>
        <div className='footer-div'>
          <div className='divone' id='divOne'>
                                    <h2>ABOUT</h2>
                                    <p>AITS (Academic Issue Tracking System) is operated by the IT Support Unit
                                    , within the Faculty of Computing and Informatics. This platform is developed and updated by the 
                                    Systems Administration Team. For more information, please contact us via makerere@mak.ac.ug or
                                    elearning@mak.ac.ug.You will need a University email address to complete the AITS account creation process. 
                                    Students without University Email Addresses should write to or visit the College ICT personnel listed here in the College
                                     Contacts to have a working one created or re-activated to enable you to access AITS with ease.</p>
                                     </div>
          <div className='divone'>
            <h2>INFO</h2>
            <ul>
              <li><a href='https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://mak.ac.ug/&ved=2ahUKEwiy9s3XipKMAxUyhf0HHRZFClgQFnoECAwQAQ&usg=AOvVaw3NazKROMvUyH2a4dN4fqCU'>Makerere main site</a></li>
              <li><a href='https://intranet.mak.ac.ug/'>Intranet</a></li>
              <li><a href='http://cees.mak.ac.ug/'>College of Education & External Studies</a></li>
              <li><a href="https://support.mak.ac.ug/">Support DICTS</a></li>
              <li><a href='#'><strong>credit GroupQ</strong></a></li>
            </ul>
            
            </div>

          <div className='divone'>            
          <h2>FOLLOW US</h2>
          <ul>
            <li><img src='/images/X.png'/></li>
            <li><img src='/images/whatsapp.png'/></li>
            <li><img src='images/messenger.png'/></li>
            <li><img src='/images/instagram.png' id='instagram'/></li>
          </ul>
          </div>


        </div>
        </div>
        <p id='footer-footer'>&copy; 2025 AITS. All rights reserved.</p>
      </footer>
      
    </div>
  );
};

export default WelcomePage;
