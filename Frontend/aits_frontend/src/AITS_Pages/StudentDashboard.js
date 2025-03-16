import React from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleReportIssue = () => {
    navigate('/issue-report');
  };

  return (
    <div className="student-dashboard-container">
      <StudentSidebar />
      <div className="student-dashboard-content">
        <div className="student-dashboard-panel">
          <div className="student-dashboard-header">
            <img src="/images/academician.png" alt="student logo"/>
            <h2 className="student-dashboard-title">Glad to see you back!</h2>
            <p className="student-dashboard-subtitle">Track your academic progress and stay organized.</p>
          </div>
          <div className="student-dashboard-buttons">
            <button className="student-dashboard-btn student-dashboard-btn-primary" onClick={handleReportIssue}>
              <span className="student-dashboard-btn-icon">📩</span>
              Report an Issue
            </button>
            <button className="student-dashboard-btn student-dashboard-btn-secondary">
              <span className="student-dashboard-btn-icon">📅</span>
              View Course Schedule
            </button>
            <button className="student-dashboard-btn student-dashboard-btn-secondary">
              <span className="student-dashboard-btn-icon">📞</span>
              Contact Lecturer
            </button>
          </div>
          <div className="student-dashboard-sections">
            <div className="student-dashboard-section student-dashboard-issue-tracker">
              <h2 className="student-dashboard-section-title">📌 Issue Tracker</h2>
              <ul className="student-dashboard-issue-list">
                <li className="student-dashboard-issue-item">
                  <span className="student-dashboard-issue-icon">⚠️</span>
                  <span className="student-dashboard-issue-text">Missing Marks - Pending</span>
                </li>
                <li className="student-dashboard-issue-item">
                  <span className="student-dashboard-issue-icon">✅</span>
                  <span className="student-dashboard-issue-text">Lecturer Response - Resolved</span>
                </li>
                <li className="student-dashboard-issue-item">
                  <span className="student-dashboard-issue-icon">🔄</span>
                  <span className="student-dashboard-issue-text">Request in Progress</span>
                </li>
              </ul>
            </div>
            <div className="student-dashboard-section student-dashboard-announcements">
              <h2 className="student-dashboard-section-title">📢 Announcements</h2>
              <p className="student-dashboard-announcement">Midterm results will be released on March 10th.</p>
              <p className="student-dashboard-announcement">Course registration closes soon.</p>
            </div>
            <div className="student-dashboard-section student-dashboard-deadlines">
              <h2 className="student-dashboard-section-title">📚 Upcoming Deadlines</h2>
              <p className="student-dashboard-deadline">Assignment 3 - Due March 5th</p>
              <p className="student-dashboard-deadline">Final Project - Due March 20th</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;