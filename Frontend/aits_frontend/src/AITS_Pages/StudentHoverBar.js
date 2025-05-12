import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./StudentHoverBar.css";
import {
  FaHome, FaUser,  FaPhone,
  FaAddressCard,FaHistory, FaDatabase, FaBell
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
              <FaDatabase /> Submit Your Issues
            </a>
            <a href="/ViewIssues" className={isActive("/ViewIssues") ? "active" : ""}>
              <FaHistory /> View Your Issues
            </a>
            <a href="/Profile" className={isActive("/Profile") ? "active" : ""}>
              <FaUser /> Profile
            </a>
            <a href="/Aboutpage" className={isActive("/Aboutpage") ? "active" : ""}>
              <FaPhone /> Contact Us
            </a>
            <a href="/notifications" className={isActive("/notifications") ? "active" : ""}>
              <FaBell /> Notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHoverBar;
