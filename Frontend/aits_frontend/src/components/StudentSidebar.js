import React, { useState } from "react";
import "./StudentSidebar.css";
import {Search, X} from 'lucide-react';
import { FaHome, FaUser, FaSignOutAlt, FaUsers, FaPhone, FaSearch, FaReply, FaFilter, FaAddressCard, FaDatabase, FaHistory } from 'react-icons/fa'; // Import icons


const StudentSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  
 

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`student-sidebar ${isMinimized ? 'student-sidebar-minimized' : ''}`}>
      <div className="student-sidebar-header">
        {!isMinimized &&  <h2 className="student-sidebar-title" style={{color:"#f0a500"}}>STUDENT HUB</h2>}
        <button className="student-sidebar-minimize-btn" onClick={toggleMinimize}>
          {isMinimized ? '🚦' : '🚥'}
        </button>
        
      </div>
      {!isMinimized && (
        <nav className="student-sidebar-nav">
          
                  <div className="search-container">
                    <div className="search-input-group">
                      <Search size={16} className="search-icon" />
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                      />
                      {searchQuery && (
                        <button className="clear-search" onClick={() => setSearchQuery('')}>
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
          
          <ul className="student-sidebar-list">
            <li className="student-sidebar-list-item">
              <a href ="StudentDashboard" className="student-sidebar-link"><FaHome/>     Home</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="Enrollment" className="student-sidebar-link"><FaAddressCard/>     Enroll in a Course</a>
            </li>
            <li className="student-sidebar-list-item">  
              <a href="StudentIssueReport" className="student-sidebar-link"><FaDatabase/>  Submit an Issue</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href ="ViewIssues" className="student-sidebar-link"><FaHistory/>  View Your Issues</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="Profile" className="student-sidebar-link"><FaUser/> Student Profile</a>
            </li>
            <li className="student-sidebar-list-item">
              <a href="Aboutpage" className="student-sidebar-link"><FaPhone/> Contact Us</a>
            </li>

            <li>          <img src="/images/nobgmaklogo.png" className="student-sidebar-schoollogo" alt="logo" />
            </li>
          </ul>
          

        </nav>
      )}

    </div>
  );
  
};
export default StudentSidebar;