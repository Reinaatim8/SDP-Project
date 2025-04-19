import React, { useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
//import InAppNotifications from "../components/InAppNotifications";
//import EmailNotifications from "../components/EmailNotifications";
import "./StudentDashboard.css";
import { toast } from "react-toastify";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]); 


//load user from local storage
useEffect(() => {
  try{
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
    toast.success('Hello Again!',{autoClose:60000});
    //alert("Login Successful!");
  }  
  } catch (error) {
    console.error("Error loading user from local storage:", error);
    setUser(null);
  } 
}, []);

  
  const handleReportIssue = () => {
    navigate('/StudentIssueReport');
  };
  // Logout function to clear local storage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
    <div className="student-dashboard-container">
      <StudentSidebar />

     {/*} <EmailNotifications />
     {/* <InAppNotifications />*/}
      <div className="student-dashboard-content">
        <div className="student-dashboard-panel">
          <div className="student-dashboard-header">
            <img src="/images/AITSLOGO.png"style={{width:"350px"}} alt="student logo"/>
            <h2 className="student-dashboard-title">
            {user ? `Welcome, Glad to see you back ${user.username}! 👋`: ""}
            </h2>
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
              Contact Us
            </button>
            </div>
            {/*  Logout Button */}
           <button className="student-dashboard-btn-logout" onClick={handleLogout}>
            Logout
          </button>
          
          <div className="student-dashboard-sections">
            <div className="student-dashboard-section student-dashboard-issue-tracker">
              <h2 className="student-dashboard-section-title">📌 Issue Tracker</h2>
              <ul className="student-dashboard-issue-list">
              {issues.length > 0 ? (
                  issues.map((issue, index) => (
                    <li key={index} className="student-dashboard-issue-item">
                      <span className="student-dashboard-issue-icon">
                        {issue.status === "Pending" ? "⚠️" : issue.status === "Resolved" ? "✅" : "🔄"}
                      </span>
                      <span className="student-dashboard-issue-text">
                        {issue.title} - {issue.status}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No issues reported yet.</li>
                )}
               
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