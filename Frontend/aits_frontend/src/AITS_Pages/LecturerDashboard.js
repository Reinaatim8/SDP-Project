import React from "react";
import { useNavigate } from "react-router-dom";
import LecturerSidebar from "../components/LecturerSidebar";
import "./LecturerDashboard.css";

const LecturerDashboard = () => {
  const navigate = useNavigate();

  const handleReportIssue = () => {
    navigate('/issue-report');
  };

  return (
    <div className="lecturer-dashboard-container">
      <LecturerSidebar />
      <div className="lecturer-dashboard-content">
        <div className="lecturer-dashboard-panel">
          <div className="lecturer-dashboard-header">
            <img src="/images/teacherlogo.png" alt="teacherlogo" className="lecturer-dashboard-teacherlogo"/>
            <h2 className="lecturer-dashboard-title">Welcome back, Professor!</h2>
            <p className="lecturer-dashboard-subtitle">Manage your courses, students, and academic tasks efficiently.</p>
          </div>
          <div className="lecturer-dashboard-buttons">
            <button className="lecturer-dashboard-btn lecturer-dashboard-btn-primary" onClick={handleReportIssue}>
              <span className="lecturer-dashboard-btn-icon">📝</span>
              Submit Grade Report
            </button>
            <button className="lecturer-dashboard-btn lecturer-dashboard-btn-secondary">
              <span className="lecturer-dashboard-btn-icon">👥</span>
              View Student Roster
            </button>
            <button className="lecturer-dashboard-btn lecturer-dashboard-btn-secondary">
              <span className="lecturer-dashboard-btn-icon">📅</span>
              Schedule Office Hours
            </button>
          </div>
          <div className="lecturer-dashboard-sections">
            <div className="lecturer-dashboard-section lecturer-dashboard-issue-tracker">
              <h2 className="lecturer-dashboard-section-title">📌 Issue Tracker</h2>
              <ul className="lecturer-dashboard-issue-list">
                <li className="lecturer-dashboard-issue-item">
                  <span className="lecturer-dashboard-issue-icon">⚠️</span>
                  <span className="lecturer-dashboard-issue-text">Grade Submission Pending</span>
                </li>
                <li className="lecturer-dashboard-issue-item">
                  <span className="lecturer-dashboard-issue-icon">✅</span>
                  <span className="lecturer-dashboard-issue-text">Student Query Resolved</span>
                </li>
                <li className="lecturer-dashboard-issue-item">
                  <span className="lecturer-dashboard-issue-icon">🔄</span>
                  <span className="lecturer-dashboard-issue-text">Resource Request Processing</span>
                </li>
              </ul>
            </div>
            <div className="lecturer-dashboard-section lecturer-dashboard-announcements">
              <h2 className="lecturer-dashboard-section-title">📢 Announcements</h2>
              <p className="lecturer-dashboard-announcement">Faculty Meeting: March 15th, 2 PM</p>
              <p className="lecturer-dashboard-announcement">New Course Materials Available</p>
            </div>
            <div className="lecturer-dashboard-section lecturer-dashboard-deadlines">
              <h2 className="lecturer-dashboard-section-title">📚 Upcoming Deadlines</h2>
              <p className="lecturer-dashboard-deadline">Grade Submission: March 8th</p>
              <p className="lecturer-dashboard-deadline">Research Proposal: March 22nd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;