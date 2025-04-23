import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import LecturerSidebar from "../components/LecturerSidebar";
import Calendar from "react-calendar"; // Import the calendar library
import "react-calendar/dist/Calendar.css"; // Import default styles for the calendar
import "./LecturerDashboard.css";

const LecturerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date()); // State to manage selected date
  const [events, setEvents] = useState([]); // State to store events
  const [newEvent, setNewEvent] = useState(""); // State for new event input
  const [searchTerm, setSearchTerm] = useState(""); // State for searching announcements
  const [showUserDetails, setShowUserDetails] = useState(false); // State to toggle user details

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleReportIssue = () => {
    navigate('/issue-report');
  };

  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the selected date
    console.log("Selected date:", newDate); // Debugging
  };

  const handleAddEvent = () => {
    if (newEvent.trim() === "") return;
    const updatedEvents = [...events, { date: date.toDateString(), event: newEvent }];
    setEvents(updatedEvents);
    setNewEvent("");
  };

  const getEventsForDate = (selectedDate) => {
    return events.filter(event => event.date === selectedDate.toDateString());
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="lecturer-dashboard-container">
      <LecturerSidebar />
      <div className="lecturer-dashboard-content">
        <div className="lecturer-dashboard-panel">
          <div className="lecturer-dashboard-header" id="lecturer-dashboard-header-image">
            <img src="/images/teacherlogo.png" alt="teacherlogo" className="lecturer-dashboard-teacherlogo" />
            <h2 className="lecturer-dashboard-title">
              {user ? `Welcome back, ${user.username}` : "Welcome back!"}
            </h2>
            <p className="lecturer-dashboard-subtitle">
              Manage your courses, students, and academic tasks efficiently.
            </p>
            <div
              className="lecturer-dashboard-user-icon"
              onMouseEnter={() => setShowUserDetails(true)}
              onMouseLeave={() => setShowUserDetails(false)}
            >
              <FaUserCircle size={50} style={{ padding: "10px", paddingLeft: "10px", color: "black" }} />
              {showUserDetails && user && (
                <div className="lecturer-dashboard-user-details">
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.user_type}</p>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
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

          {/* Sections Grid */}
          <div className="lecturer-dashboard-sections">
            {/* Issue Tracker Section */}
            <div className="lecturer-dashboard-section lecturer-dashboard-issue-tracker">
              <div className="section-image-container">
                <img src="/images/issue-tracker.png" alt="Issue Tracker" className="section-image" />
              </div>
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

            {/* Announcements Section */}
            <div className="lecturer-dashboard-section lecturer-dashboard-announcements">
              <div className="section-image-container">
                <img src="/images/announcements.jpeg" alt="Announcements" className="section-image" />
              </div>
              <h2 className="lecturer-dashboard-section-title">📢 Announcements</h2>
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
              />
              <p className="lecturer-dashboard-announcement">Faculty Meeting: March 15th, 2 PM</p>
              <p className="lecturer-dashboard-announcement">New Course Materials Available</p>
            </div>

            {/* Upcoming Deadlines Section */}
            <div className="lecturer-dashboard-section lecturer-dashboard-deadlines">
              <div className="section-image-container">
                <img src="/images/deadlines.jpeg" alt="Deadlines" className="section-image" />
              </div>
              <h2 className="lecturer-dashboard-section-title">📚 Upcoming Deadlines</h2>
              <p className="lecturer-dashboard-deadline">Grade Submission: March 8th</p>
              <p className="lecturer-dashboard-deadline">Research Proposal: March 22nd</p>
            </div>
            <div className="lecturer-dashboard-section lecturer-dashboard-quick-links">
              <h2 className="lecturer-dashboard-section-title">🔗 Quick Links</h2>
              <ul>
                <li><a href="/faculty-resources">Faculty Resources</a></li>
                <li><a href="/academic-calendar">Academic Calendar</a></li>
                <li><a href="/grading-guidelines">Grading Guidelines</a></li>
                <li><a href="/support">Support</a></li>
              </ul>
            </div>

            {/* Academic Calendar Section */}
            <div className="lecturer-dashboard-section lecturer-dashboard-calendar" id="calendar-gig">
              <h2 className="lecturer-dashboard-section-title">📅 Academic Calendar</h2>
              <Calendar
                onChange={handleDateChange}
                value={date}
                tileContent={({ date }) => {
                  const eventsForDate = getEventsForDate(date);
                  return eventsForDate.length > 0 ? (
                    <div style={{ backgroundColor: "#ffcccb", borderRadius: "50%", padding: "5px" }}>
                      {eventsForDate.length}
                    </div>
                  ) : null;
                }}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  margin:"0px",
                }}
              />
              <div style={{ marginTop: "0px" }}>
                <h3>Events on {date.toDateString()}</h3>
                <ul>
                  {getEventsForDate(date).map((event, index) => (
                    <li key={index}>{event.event}</li>
                  ))}
                </ul>
                <input
                  type="text"
                  placeholder="Add a new event..."
                  value={newEvent}
                  onChange={(e) => setNewEvent(e.target.value)}
                  style={{ marginRight: "0px", padding: "5px", width: "70%" }}
                />
                <button onClick={handleAddEvent} style={{ padding: "5px 10px",margin:"0px",backgroundColor:"blue",color:"white",border:"0px",marginLeft:"10px"}}>
                  Add Event
                </button>
              </div>
            </div>
            {/* Quick Links Section */}
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default LecturerDashboard;