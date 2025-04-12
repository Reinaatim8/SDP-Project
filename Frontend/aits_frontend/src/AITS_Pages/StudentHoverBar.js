import React, { useState } from "react";
import "./StudentHoverBar.css";
import { Search, X } from 'lucide-react';
import {
  FaHome, FaUser, FaSignOutAlt, FaUsers, FaPhone,
  FaAddressCard, FaDatabase
} from 'react-icons/fa';

const StudentHoverBar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`floating-tabbar-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="floating-tabbar-header">
        <button className="minimize-btn" onClick={toggleMinimize}>
          {isMinimized ? '🔼' : '🔽'}
        </button>
      </div>

      {!isMinimized && (
        <div className="floating-tabbar-content">
          <div className="search-box">
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="tab-icons">
            <a href="StudentDashboard"><FaHome />Home</a>
            <a href="Enrollment"><FaAddressCard />Enroll</a>
            <a href="StudentIssueReport"><FaDatabase />Issues</a>
            <a href="Profile"><FaUser />Profile</a>
            <a href="Aboutpage"><FaPhone />contact us</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHoverBar;
