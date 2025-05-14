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
     <div className="welcome-container" id='welcome'>
      {/* Fixed Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo"> <img src='/images/AITSLOGO.png' alt='logo' style={{width:'100px'}}/>
          </span>

        </div>
        <div className="navbar-right">
          <Link to="/Aboutpage" className="nav-link">ABOUT</Link>
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
            "Streamline your academic concerns with our efficient issue tracking system. Submit, track, and resolve academic matters seamlessly."
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
                                    , within the Faculty of Computing and Informatics (COCIS). This platform is developed and updated by the 
                                    CS Students Year 1(SDP). For more information, please contact us via our email address makerereaits@gmail.com 
                                    You will need a University email address to complete the AITS account creation process. 
                                     Contact us to have a working email to access AITS with ease.</p>
                                     </div>
          <div className='divone'>
            <h2>INFO</h2>
            <ul>
              <li><a href='https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://mak.ac.ug/&ved=2ahUKEwiy9s3XipKMAxUyhf0HHRZFClgQFnoECAwQAQ&usg=AOvVaw3NazKROMvUyH2a4dN4fqCU'>MAKERERE UNIVERSITY MAIN SITE </a></li>
              <li><a href='http://cocis.mak.ac.ug/'>COCIS FACULTY</a></li>
              <li>Support Us At AITS </li>
              <li><strong>GROUP Q CS YEAR 1</strong></li>
            </ul>
            
            </div>

          <div className='divone'>            
          <h2>FOLLOW US</h2>
          <ul>
            <li><img src='/images/X.png' alt='Twitter logo'/></li>
            <li><img src='/images/whatsapp.png' alt='Whatsapp logo'/></li>
            <li><img src='images/messenger.png' alt='Messenger logo'/></li>
            <li><img src='/images/instagram.png' alt='IG Logo' id='instagram'/></li>
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