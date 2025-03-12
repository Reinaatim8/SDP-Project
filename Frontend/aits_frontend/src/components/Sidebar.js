import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
      <div className="sidebar-header">
        {!isMinimized && <h2>Student Portal</h2>}
        <button className="minimize-btn" onClick={toggleMinimize}>
          {isMinimized ? '➜' : '⬅'}
        </button>
      </div>
      {!isMinimized && (
        <nav className="sidebar-nav">
          <ul>
          
            <li>
              <a href="dashboard">Dashboard</a>
            </li>
            <li>
              <a href="Studentissue">Report an Issue</a>
            </li>
            <li>
              <a href="#view-issues">View all Issues</a>
            </li>
            <li>
              <a href="#profile">Student Profile</a>
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

export default Sidebar;
