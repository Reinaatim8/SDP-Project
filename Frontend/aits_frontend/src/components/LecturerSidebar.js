import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaUsers, FaPhone } from 'react-icons/fa'; // Import icons
import "./LecturerSidebar.css";

const LecturerSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const navigate = useNavigate();

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleLogout(); // Log out when the timer reaches zero
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className={`lecturer-sidebar ${isMinimized ? 'lecturer-sidebar-minimized' : ''}`}>
      <div className="lecturer-sidebar-header">
        {!isMinimized && <h2 className="lecturer-sidebar-title">LECTURER HUB</h2>}
        <button className="lecturer-sidebar-minimize-btn" onClick={toggleMinimize}>
          {isMinimized ? '🚦' : '🚥'}
        </button>
      </div>
      {!isMinimized && (
        <nav className="lecturer-sidebar-nav">
          <ul className="lecturer-sidebar-list">
            <li className="lecturer-sidebar-list-item">
              <Link to="/LecturerDashboard" className="lecturer-sidebar-link">
                <FaHome className="lecturer-sidebar-icon" /> Home
              </Link>
            </li>
            <li className="lecturer-sidebar-list-item">
              <Link to="/Studentissue" className="lecturer-sidebar-link">
                <FaUsers className="lecturer-sidebar-icon" /> Respond to Students
              </Link>
            </li>
            <li className="lecturer-sidebar-list-item">
              <a href="#profile" className="lecturer-sidebar-link">
                <FaUser className="lecturer-sidebar-icon" /> Your Profile
              </a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <a href="#" className="lecturer-sidebar-link">
                <FaPhone className="lecturer-sidebar-icon" /> Contact Us
              </a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <button className="lecturer-sidebar-link lecturer-sidebar-logout-btn" id="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt className="lecturer-sidebar-icon" />           Logout
              </button>
            </li>
            <li>
              <img src="/images/nobgmaklogo.png" className="lecturer-sidebar-schoollogo" alt="School Logo" />
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default LecturerSidebar;