import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./StudentHoverBar.css";
import {
  FaHome, FaUser, FaSignOutAlt, FaUsers, FaPhone,
  FaAddressCard,FaHistory, FaDatabase
} from "react-icons/fa";

const StudentHoverBar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`floating-tabbar-container ${isMinimized ? "minimized" : ""}`}>
      <div className="floating-tabbar-header">
        <button className="minimize-btn" onClick={toggleMinimize}>
          {isMinimized ? (
            <img src="/images/AITSLOGO.png" alt="Arrow Up" style={{ width: "120px" }} />
          ) : (
            <img src="/images/AITSLOGO.png" alt="Arrow Down" style={{ width: "120px" }} />
          )}
        </button>
      </div>

      {!isMinimized && (
        <div className="floating-tabbar-content">
          <div className="tab-icons">
            <a href="/StudentDashboard" className={isActive("/StudentDashboard") ? "active" : ""}>
              <FaHome /> Home
            </a>
            <a href="/Enrollment" className={isActive("/Enrollment") ? "active" : ""}>
              <FaAddressCard /> Enroll
            </a>
            <a href="/StudentIssueReport" className={isActive("/StudentIssueReport") ? "active" : ""}>
              <FaDatabase /> Issues
            </a>
            <a href="/StudentHistory" className={isActive("/StudentHistory") ? "active" : ""}>
              <FaHistory /> History
            </a>
            <a href="/Profile" className={isActive("/Profile") ? "active" : ""}>
              <FaUser /> Profile
            </a>
            <a href="/Aboutpage" className={isActive("/Aboutpage") ? "active" : ""}>
              <FaPhone /> Contact Us
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHoverBar;
