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

          <div className="tab-icons">
            <a href="StudentDashboard"><FaHome /></a>
            <a href="Enrollment"><FaAddressCard /></a>
            <a href="StudentIssueReport"><FaDatabase /></a>
            <a href="Profile"><FaUser /></a>
            <a href="Aboutpage"><FaPhone /></a>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHoverBar;
