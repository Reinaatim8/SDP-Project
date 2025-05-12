import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./LecturerHoverBar.css";
import {
  FaHome, FaUser, FaPhone,
   FaDatabase, FaBell
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
    <div className={`lecturer-floating-tabbar-container ${isMinimized ? "minimized" : ""}`}>
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
            <a href="/LecturerDashboard" className={isActive("/LecturerDashboard") ? "active" : ""}>
              <FaHome /> Home
            </a>
            <a href="/LecturerIssueManagement" className={isActive("/LecturerIssueManagement") ? "active" : ""}>
              <FaDatabase /> Issues
            </a>
            <a href="/LecturerProfile" className={isActive("/LecturerProfile") ? "active" : ""}>
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
