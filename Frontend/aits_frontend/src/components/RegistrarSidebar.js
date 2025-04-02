import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './RegistrarSidebar.css';

const RegistrarSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`registrar-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {isExpanded && <h2>REGISTRAR HUB</h2>}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isExpanded ? '🚥' : '🚦'}
      </button>
      <nav>
        <ul>
          <li><NavLink to="/RegistrarDashboard" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/students" className="nav-link">Student Management</NavLink></li>
          <li><NavLink to="/courses" className="nav-link">Course Management</NavLink></li>
          <li><NavLink to="/reports" className="nav-link">Reports & Analytics</NavLink></li>
          <li><NavLink to="/notifications" className="nav-link">Notifications</NavLink></li>
          <li><NavLink to="/settings" className="nav-link">Settings</NavLink></li>
          <li><img src="/images/nobgmaklogo.png" className="student-sidebar-schoollogo" alt="Gay" /></li>
        </ul>
      </nav>
    </div>
  );
};

export default RegistrarSidebar;
