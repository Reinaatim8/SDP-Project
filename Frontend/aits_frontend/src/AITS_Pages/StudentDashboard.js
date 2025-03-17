import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./StudentDashboard.css";

const StudentDashboard = () => {
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
            <h2>Glad to see you back!</h2>
            <p className="subtitle">Track your academic progress and stay organized.</p>
          </div>
          <div className="dashboard-buttons">
            <button className="btn btn-primary" onClick={handleReportIssue}>
              <span className="btn-icon">📩</span>
              Report an Issue
            </button>
            <button className="btn btn-secondary">
              <span className="btn-icon">📅</span>
              View Course Schedule
            </button>
            <button className="btn btn-secondary">
              <span className="btn-icon">📞</span>
              Contact Lecturer
            </button>
          </div>
          <div className="dashboard-sections">
            <div className="section issue-tracker">
              <h2>📌 Issue Tracker</h2>
              <ul>
                <li className="issue-item">
                  <span className="issue-icon">⚠️</span>
                  <span className="issue-text">Missing Marks - Pending</span>
                </li>
                <li className="issue-item">
                  <span className="issue-icon">✅</span>
                  <span className="issue-text">Lecturer Response - Resolved</span>
                </li>
                <li className="issue-item">
                  <span className="issue-icon">🔄</span>
                  <span className="issue-text">Request in Progress</span>
                </li>
              </ul>
            </div>
            <div className="section announcements">
              <h2>📢 Announcements</h2>
              <p>Midterm results will be released on March 10th.</p>
              <p>Course registration closes soon.</p>
            </div>
            <div className="section deadlines">
              <h2>📚 Upcoming Deadlines</h2>
              <p>Assignment 3 - Due March 5th</p>
              <p>Final Project - Due March 20th</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
