import React, { useState } from "react";
import "./LecturerSidebar.css";
import { Link } from 'react-router-dom';

const LecturerSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
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
              <a href="LecturerDashboard" className="lecturer-sidebar-link">Home</a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <a href="Studentissue" className="lecturer-sidebar-link">Respond to Students</a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <a href="#view-issues" className="lecturer-sidebar-link">View all Issues</a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <a href="#profile" className="lecturer-sidebar-link">Your Profile</a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <a href="#" className="lecturer-sidebar-link">Contact Us 📞</a>
            </li>
            <li>          <img src="/images/nobgmaklogo.png" className="lecturer-sidebar-schoollogo" alt="Gay" />
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default LecturerSidebar;