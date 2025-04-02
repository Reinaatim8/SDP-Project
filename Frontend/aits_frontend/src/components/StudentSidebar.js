import React, { useState } from "react";
import "./StudentSidebar.css";


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
              <a href ="StudentDashboard" className="student-sidebar-link">Home</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="StudentIssueReport" className="student-sidebar-link">Report an Issue</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="Enrollment" className="student-sidebar-link">Enroll in a Course</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="Profile" className="student-sidebar-link">Student Profile</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="Aboutpage" className="student-sidebar-link">Contact Us 📞</a>
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