import React, { useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import "./StudentDashboard.css";
import { toast } from "react-toastify";
import { FaPowerOff } from "react-icons/fa";

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
    
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <StudentSidebar />
      <div style={{ maxWidth: "1200px", width: "80%", backgroundColor: "#f9f9f9",marginLeft:"320px", scale:"0.9", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src="/images/AITSLOGO.png" style={{ width: "300px", marginBottom: "10px" }} alt="student logo" />
          <h2 style={{ color: "#333", fontSize: "24px" }}>
            {user ? `Welcome, Glad to see you back ${user.username}! 👋` : ""}
          </h2>
          <p style={{ color: "#666", fontSize: "16px" }}>Track your academic progress and stay organized.</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={handleReportIssue}
          >
            📩 Report an Issue
          </button>
          <button
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            📅 View Course Schedule
          </button>
          <button
            style={{
              backgroundColor: "#ffc107",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            📞 Contact Us
          </button>

        <button
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",          }}
          onClick={handleLogout}
        >
          Logout <FaPowerOff/>
        </button>
        </div>


        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>📌 Issue Tracker</h2>
            <ul style={{ listStyle: "none", padding: "0" }}>
              {issues.length > 0 ? (
                issues.map((issue, index) => (
                  <li key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "10px" }}>
                      {issue.status === "Pending" ? "⚠️" : issue.status === "Resolved" ? "✅" : "🔄"}
                    </span>
                    <span>{issue.title} - {issue.status}</span>
                  </li>
                ))
              ) : (
                <li>No issues reported yet.</li>
              )}
            </ul>
          </div>

          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>📢 Announcements</h2>
            <p>Midterm results will be released on March 10th.</p>
            <p>Course registration closes soon.</p>
          </div>

          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>📚 Upcoming Deadlines</h2>
            <p>Assignment 3 - Due March 5th</p>
            <p>Final Project - Due March 20th</p>
          </div>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>🎓 Academic Progress</h2>
          <p style={{ color: "#666" }}>Your GPA: 3.8</p>
          <p style={{ color: "#666" }}>Credits Earned: 45</p>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>🌟 Quick Links</h2>
          <a href="/library" style={{ marginRight: "10px", color: "#007bff", textDecoration: "none" }}>Library</a>
          <a href="/timetable" style={{ marginRight: "10px", color: "#007bff", textDecoration: "none" }}>Timetable</a>
          <a href="/resources" style={{ color: "#007bff", textDecoration: "none" }}>Resources</a>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;