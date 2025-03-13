import React, { useState } from "react";
import "./LecturerSidebar.css";
import { Link } from 'react-router-dom';


const LecturerSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
      <div className="sidebar-header">
        {!isMinimized && <h2>LECTURER HUB</h2>}
        <button className="minimize-btn" onClick={toggleMinimize}>
          {isMinimized ? '🚦' : '🚥'}
        </button>
      </div>
      {!isMinimized && (
        <nav className="sidebar-nav">
          <ul>
          
            <li>
              <a href="dashboard">Dashboard</a>
            </li>
            <li>
              <a href="Studentissue">Respond to Students</a>
            </li>
            <li>
              <a href="#view-issues">View all Issues</a>
            </li>
            <li>
              <a href="#profile">Your Profile</a>
            </li>
            <li>
              <a href="#">GAY?</a>
            </li>
          </ul>
          {/* <br></br>         using br tag to add space btn the listitems and logo */}
          <br></br>  
          <br></br>  
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <img src="/images/nobgmaklogo.png" className="schoollogo" alt="Gay"></img>

        </nav>
      )}
    </div>
  );
};

export default LecturerSidebar;
