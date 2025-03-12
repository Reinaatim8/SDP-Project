import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./LecturerDashboard.css";

const LecturerDashboard = () => {
  const navigate = useNavigate();

  const handleReportIssue = () => {
    navigate('/issue-report');
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-panel">
          <div className="dashboard-header">
            <img src="/images/teacherlogo.png" alt="teacherlogo" className="teacherlogo"/>
            <h2>Welcome back, Professor!</h2>
            <p className="subtitle">Manage your courses, students, and academic tasks efficiently.</p>
          </div>
          <div className="dashboard-buttons">
            <button className="btn btn-primary" onClick={handleReportIssue}>
              <span className="btn-icon">📝</span>
              Submit Grade Report
            </button>
            <button className="btn btn-secondary">
              <span className="btn-icon">👥</span>
              View Student Roster
            </button>
            <button className="btn btn-secondary">
              <span className="btn-icon">📅</span>
              Schedule Office Hours
            </button>
          </div>
          <div className="dashboard-sections">
            <div className="section issue-tracker">
              <h2>📌 Issue Tracker</h2>
              <ul>
                <li className="issue-item">
                  <span className="issue-icon">⚠️</span>
                  <span className="issue-text">Grade Submission Pending</span>
                </li>
                <li className="issue-item">
                  <span className="issue-icon">✅</span>
                  <span className="issue-text">Student Query Resolved</span>
                </li>
                <li className="issue-item">
                  <span className="issue-icon">🔄</span>
                  <span className="issue-text">Resource Request Processing</span>
                </li>
              </ul>
            </div>
            <div className="section announcements">
              <h2>📢 Announcements</h2>
              <p>Faculty Meeting: March 15th, 2 PM</p>
              <p>New Course Materials Available</p>
            </div>
            <div className="section deadlines">
              <h2>📚 Upcoming Deadlines</h2>
              <p>Grade Submission: March 8th</p>
              <p>Research Proposal: March 22nd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;