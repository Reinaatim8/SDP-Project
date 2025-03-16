import React, { useState } from "react";
import "./StudentSidebar.css";
import { Link } from 'react-router-dom';

const StudentSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`student-sidebar ${isMinimized ? 'student-sidebar-minimized' : ''}`}>
      <div className="student-sidebar-header">
        {!isMinimized && <h2 className="student-sidebar-title">STUDENT HUB</h2>}
        <button className="student-sidebar-minimize-btn" onClick={toggleMinimize}>
          {isMinimized ? '🚦' : '🚥'}
        </button>
        
      </div>
      {!isMinimized && (
        <nav className="student-sidebar-nav">
          
          <ul className="student-sidebar-list">
            <li className="student-sidebar-list-item">
              <a href="StudentDashboard" className="student-sidebar-link">Home</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="StudentIssueReport" className="student-sidebar-link">Report an Issue</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="#view-issues" className="student-sidebar-link">View all Issues</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="#profile" className="student-sidebar-link">Student Profile</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="#" className="student-sidebar-link">Contact Us 📞</a>
            </li>
            <li>          <img src="/images/nobgmaklogo.png" className="student-sidebar-schoollogo" alt="Gay" />
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default StudentSidebar;