import React, { useState } from "react";
import "./Sidebar.css";

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
              <a href="#view-issues">View Issues</a>
            </li>
            <li>
              <a href="#profile">Profile</a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
