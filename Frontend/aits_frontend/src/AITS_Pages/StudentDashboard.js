import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import "./StudentDashboard.css";
import { toast } from "react-toastify";
import { FaPowerOff,FaSpinner, FaCheckCircle, FaClock } from "react-icons/fa";


const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([
    { id: 1, title: "Computer Lab Access", description: "Unable to login to computer lab workstations", status: "Pending", priority: "High", reportedDate: "Apr 13, 2025" },
    { id: 2, title: "Missing Assignment Grades", description: "Assignment 2 grades not showing in system", status: "In Progress", priority: "Medium", reportedDate: "Apr 10, 2025" }
  ]); 
  const [stats, setStats] = useState({
    totalIssues: 0,
    totalResolved: 0,
    totalPending: 0,
    totalInProgress: 0,
  }); 
  const [loading, setLoading] = useState({
    issues: false,
  });
  const [error, setError] = useState('');

const handleQuickIssue = (category) => {
  navigate('/StudentIssueReport', { state: { category } });
};


// Add a function to handle search
const [issueStats, setIssueStats] = useState({
  totalReported: 24,
  totalResolved: 19,
  averageIssuesPerWeek: 5,
 
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
    question: "Where can I find my email?", 
    answer: "You email is shown on your Student Profile." 
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
  <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>📊 Issue Status Detail Summary</h2>
      <div style={{color:"red", fontWeight:"bold"}}><FaClock/> Pending 
        <p style={{color:'black',textDecoration:"none"}}>
          The issues has not yet beeen worked on or opened yet.</p>
          </div>
      <div style={{color:"blue", fontWeight:"bold"}}> <FaSpinner/> In Progress <p style={{color:'black'}}>The issues are in the middle of being solved.</p></div>
      <div style={{color:"green", fontWeight:"bold"}}><FaCheckCircle/> Resolved <p style={{color:'black'}}>The issues have been worked upon and solved.</p></div>
   
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
            <ul>*Submit  Academic and non-academic issues</ul>
            <ul>*Monitor your Submitted issues</ul>
            
             
          </div>

          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>📢 Announcements</h2>
          
            <p>Course registration closes soon.</p>
            <p>Recess starts soon.</p>
          </div>

          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>📚 Upcoming Deadlines</h2>
            <p>Assignments - Due Soon</p>
            <p>Final Project - Due Soon</p>
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
</div>
      

      
    </div>
    
    
    
  );
};

export default StudentDashboard;