import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import NotificationsModal from '../components/NotificationsModal';
import "./StudentDashboard.css";
import { toast } from "react-toastify";
import { FaPowerOff } from "react-icons/fa";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([
    { id: 1, title: "Computer Lab Access", description: "Unable to login to computer lab workstations", status: "Pending", priority: "High", reportedDate: "Apr 13, 2025" },
    { id: 2, title: "Missing Assignment Grades", description: "Assignment 2 grades not showing in system", status: "In Progress", priority: "Medium", reportedDate: "Apr 10, 2025" }
  ]);  
  const [showNotifications, setShowNotifications] = useState(false);
  const [activities, setActivities] = useState([
    { id: 1, title: "Network Issue", description: "Lecturer responded to your ticket", type: "response", time: "Today, 2:30 PM" },
    { id: 2, title: "Library Access", description: "Status changed to In Progress", type: "status_change", time: "Yesterday, 4:15 PM" },
    { id: 3, title: "Course Material Error", description: "New issue reported", type: "new", time: "Apr 14, 10:00 AM" }
  ]);
  const [notifications] = useState([
    { id: 1, message: "Your profile has been updated.", type: "success" },
    { id: 2, message: "New course materials are available.", type: "info" },
    { id: 3, message: "Your password will expire soon.", type: "warning" },
    
  ]);
  const [responseMetrics, setResponseMetrics] = useState({
    averageResponse: "4 hours",
    averageResolution: "2 days",
    responseRate: "92%"
  });
  const quickIssueCategories = ["Missing marks", "Wrong marks", "Marking complaint", "Lecturer Consultation"];
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const departments = ["All", "Computer Science", "Engineering", "Business", "Arts & Humanities"];


const handleQuickIssue = (category) => {
  navigate('/StudentIssueReport', { state: { category } });
};
const [searchTerm, setSearchTerm] = useState("");

// Add a function to handle search
const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};
const [issueStats, setIssueStats] = useState({
  totalReported: 24,
  totalResolved: 19,
  averageIssuesPerWeek: 5,
  mostCommonCategory: "Technical Issues"
});
// Add this state to your component
const [faqs, setFaqs] = useState([
  { 
    question: "How do I reset my password?", 
    answer: "Go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email." 
  },
  { 
    question: "How long does it take to resolve technical issues?", 
    answer: "Most technical issues are resolved within 24-48 hours of reporting." 
  },
  { 
    question: "Where can I find my student ID?", 
    answer: "Your student ID is shown on your profile page and student card." 
  }
]);

//load user from local storage
useEffect(() => {
  try{
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
   // toast.success('Hello Again!',{autoClose:6000});
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
  const handleContactUs = () => {
    navigate('/Aboutpage');
  };

  // Logout function to clear local storage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    console.log("User logged out");
    toast.success('Logout Successful! Login Again to continue.',{autoClose:6000});
  };

  return (

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <StudentSidebar />
      <div style={{ maxWidth: "1200px", width: "80%", backgroundColor: "#f9f9f9", marginLeft: "320px", scale: "0.9", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src="/images/AITSLOGO.png" style={{ width: "300px", marginBottom: "10px" }} alt="student logo" />
          <h2 style={{ color: "#333", fontSize: "24px" }}>
            {user ? `Welcome, Glad to see you back ${user.username}! 👋` : ""}
          </h2>
          <p style={{ color: "#666", fontSize: "16px" }}>Track your academic progress and stay organized.</p>
        </div>
<div style={{ marginTop: "20px", backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width:"" }}>
  <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>📊 Issue Status Summary</h2>
  <div style={{ display: "flex", justifyContent: "space-around" }}>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#dc3545" }}>
        {issues.filter(issue => issue.status === "Pending").length || 0}
      </div>
      <div>Pending</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ffc107" }}>
        {issues.filter(issue => issue.status === "In Progress").length || 0}
      </div>
      <div>In Progress</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>
        {issues.filter(issue => issue.status === "Resolved").length || 0}
      </div>
      <div>Resolved</div>
    </div>
  </div>
</div>
<div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginTop: "20px", width: "" }}>
  {/* <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>🔍 Search Issues</h2>
  <div style={{ display: "flex", marginBottom: "15px" }}>
    <input
      type="text"
      placeholder="Search for previously reported issues..."
      value={searchTerm}
      onChange={handleSearch}
      style={{
        flex: 1,
        padding: "8px 12px",
        border: "1px solid #ced4da",
        borderRadius: "4px 0 0 4px",
        fontSize: "14px",
      }}
    />
    <button
      style={{
        padding: "8px 16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "0 4px 4px 0",
        cursor: "pointer",
      }}
    >
      Search
    </button>
  </div>
  <div style={{ fontSize: "14px", color: "#6c757d" }}>
    Try searching for keywords like "wifi", "grades", or "classroom"
  </div> */}
</div>
<div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginTop: "20px", width: "" }}>
  <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>🔔 Recent Activity</h2>
  {activities.length > 0 ? (
    <ul style={{ listStyle: "none", padding: "0" }}>
      {activities.slice(0, 5).map((activity, index) => (
        <li key={index} style={{ 
          padding: "8px", 
          borderLeft: `4px solid ${
            activity.type === "response" ? "#28a745" : 
            activity.type === "status_change" ? "#ffc107" : "#007bff"
          }`,
          marginBottom: "8px",
          backgroundColor: "#f8f9fa"
        }}>
          <div style={{ fontSize: "14px", color: "#495057" }}>
            <span style={{ fontWeight: "bold" }}>{activity.title}</span> - {activity.description}
          </div>
          <div style={{ fontSize: "12px", color: "#6c757d", marginTop: "4px" }}>
            {activity.time}
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>No recent activity.</p>
  )}
</div>
<div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginTop: "20px", width: "" }}>
  <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>⚠️ Priority Issues</h2>
  {issues.filter(issue => issue.priority === "High").length > 0 ? (
    <ul style={{ listStyle: "none", padding: "0" }}>
      {issues
        .filter(issue => issue.priority === "High")
        .slice(0, 3)
        .map((issue, index) => (
          <li key={index} style={{ 
            padding: "10px", 
            backgroundColor: "#fff3cd", 
            border: "1px solid #ffeeba", 
            borderRadius: "4px",
            marginBottom: "8px"
          }}>
            <div style={{ fontWeight: "bold" }}>{issue.title}</div>
            <div style={{ fontSize: "14px", marginTop: "5px" }}>{issue.description}</div>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              fontSize: "12px", 
              marginTop: "8px" 
            }}>
              <span>Status: {issue.status}</span>
              <span>Reported: {issue.reportedDate}</span>
            </div>
          </li>
        ))}
    </ul>
  ) : (
    <p>No high priority issues at the moment.</p>
  )}
</div>
<div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginTop: "20px", width: "" }}>
  <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>⏱️ Response Time Metrics</h2>
  <div style={{ display: "flex", justifyContent: "space-around" }}>
    <div style={{ textAlign: "center", padding: "10px" }}>
      <div style={{ fontSize: "14px", color: "#666" }}>Avg. First Response</div>
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#004085" }}>{responseMetrics.averageResponse}</div>
    </div>
    <div style={{ textAlign: "center", padding: "10px" }}>
      <div style={{ fontSize: "14px", color: "#666" }}>Avg. Resolution Time</div>
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#004085" }}>{responseMetrics.averageResolution}</div>
    </div>
    <div style={{ textAlign: "center", padding: "10px" }}>
      <div style={{ fontSize: "14px", color: "#666" }}>Response Rate</div>
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#004085" }}>{responseMetrics.responseRate}</div>
    </div>
  </div>
</div>
<div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginTop: "20px", width: "" }}>
  <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>🚀 Quick Issue Report</h2>
  <p style={{ marginBottom: "10px" }}>Select Different Issue categories to report such as;</p>
  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    {quickIssueCategories.map((category, index) => (
      <button
        key={index}
        onClick={() => handleQuickIssue(category)}
        style={{
          padding: "8px 12px",
          backgroundColor: "#e9ecef",
          border: "1px solid #ced4da",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          fontSize: "14px",
          ":hover": { backgroundColor: "#dee2e6" }
        }}
      >
        {category}
      </button>
    ))}
  </div>
  <div style={{marginBottom:"10px", backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginTop: "20px", width: "" }}>
  <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>📈 Issue Statistics</h2>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
    <div style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
      <div style={{ fontSize: "14px", color: "#6c757d" }}>Total Issues Reported</div>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>{issueStats.totalReported}</div>
    </div>
    <div style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
      <div style={{ fontSize: "14px", color: "#6c757d" }}>Issues Resolved</div>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>{issueStats.totalResolved}</div>
    </div>
    <div style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
      <div style={{ fontSize: "14px", color: "#6c757d" }}>Issues Per Week</div>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>{issueStats.averageIssuesPerWeek}</div>
    </div>
    <div style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
      <div style={{ fontSize: "14px", color: "#6c757d" }}>Most Common Issue</div>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>{issueStats.mostCommonCategory}</div>
    </div>
  </div>
</div>
</div>


        <div style={{marginTop:"20px", display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
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
              backgroundColor: "#ffc107",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={handleContactUs}
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
              fontSize: "16px",
            }}
            onClick={handleLogout}
          >
            Logout <FaPowerOff />
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
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>🎓Track Your Academic Progress with Ease.</h2>

        </div>

<div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginTop: "20px", width: "100%" }}>
  <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>❓ Frequently Asked Questions</h2>
  {faqs.map((faq, index) => (
    <div key={index} style={{ marginBottom: "15px", borderBottom: index < faqs.length - 1 ? "1px solid #dee2e6" : "none", paddingBottom: "15px" }}>
      <div style={{ fontSize: "16px", fontWeight: "bold", color: "#343a40", marginBottom: "5px" }}>
        {faq.question}
      </div>
      <div style={{ fontSize: "14px", color: "#495057" }}>
        {faq.answer}
      </div>
    </div>
  ))}
</div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>🌟 Quick Links</h2>
          <a href="/library" style={{ marginRight: "10px", color: "#007bff", textDecoration: "none" }}>Library</a>
          <a href="/timetable" style={{ marginRight: "10px", color: "#007bff", textDecoration: "none" }}>Timetable</a>
          <a href="/resources" style={{ color: "#007bff", textDecoration: "none" }}>Resources</a>
        </div>
      </div>
      

      <button onClick={() => setShowNotifications(true)} style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "10px 20px",
        backgroundColor: "#0a2463",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
        View Notifications
      </button>

      {showNotifications && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
        />
      )}
      
    </div>
    
    
    
  );
};

export default StudentDashboard;