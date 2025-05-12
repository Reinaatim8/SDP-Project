import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaGraduationCap, FaUsers, FaClock } from "react-icons/fa";
import LecturerSidebar from "../components/LecturerSidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./LecturerDashboard.css";

const LecturerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);

  // Sample data
  const announcements = [
    { id: 1, title: "Faculty Meeting", description: "March 15th, 2 PM in Room 301" },
    { id: 2, title: "New Course Materials Available", description: "Updated resources for CS301" },
    { id: 3, title: "Academic Conference", description: "Registration deadline approaching" }
  ];

  const issues = [
    { id: 1, status: "pending", text: "Grade Submission Pending", icon: "⚠️" },
    { id: 2, status: "completed", text: "Student Query Resolved", icon: "✅" },
    { id: 3, status: "processing", text: "Resource Request Processing", icon: "🔄" }
  ];

  const deadlines = [
    { id: 1, title: "Grade Submission", date: "March 8th" },
    { id: 2, title: "Research Proposal", date: "March 22nd" },
    { id: 3, title: "Department Review", date: "April 5th" }
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleReportIssue = () => navigate('/issue-report');
  
  const handleDateChange = (newDate) => setDate(newDate);
  
  const handleAddEvent = () => {
    if (newEvent.trim() === "") return;
    setEvents([...events, { date: date.toDateString(), event: newEvent }]);
    setNewEvent("");
  };

  const getEventsForDate = (selectedDate) => (
    events.filter(event => event.date === selectedDate.toDateString())
  );

  const filteredAnnouncements = announcements.filter(
    announcement => announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lecturer-dashboard-container">
      <LecturerSidebar />
      <div className="lecturer-dashboard-content">
        <div className="lecturer-dashboard-header">
          <div className="lecturer-dashboard-logo-container">
            <img src="/images/AITSLOGO.png" alt="AITS Logo" className="lecturer-dashboard-logo" />
          </div>
          <div className="lecturer-dashboard-welcome">
            <h1>{user ? `Welcome, ${user.username}` : "Welcome back!"}</h1>
            <p>Your academic control center</p>
          </div>
          <div className="lecturer-dashboard-user-profile" 
               onMouseEnter={() => setShowUserDetails(true)}
               onMouseLeave={() => setShowUserDetails(false)}>
            <FaUserCircle size={45} />
            {showUserDetails && user && (
              <div className="lecturer-dashboard-user-details">
                <p><strong>{user.username}</strong></p>
                <p>{user.email}</p>
                <p>{user.user_type}</p>
              </div>
            )}
          </div>
        </div>

        <div className="lecturer-dashboard-quick-actions">
          <button className="lecturer-dashboard-action-button">
            <FaGraduationCap className="lecturer-dashboard-action-icon" />
            <span>Submit Grade Report</span>
          </button>
          <button className="lecturer-dashboard-action-button">
            <FaUsers className="lecturer-dashboard-action-icon" />
            <span>View Student Roster</span>
          </button>
          <button className="lecturer-dashboard-action-button">
            <FaClock className="lecturer-dashboard-action-icon" />
            <span>Schedule Office Hours</span>
          </button>
        </div>

        <div className="lecturer-dashboard-grid">
          <div className="lecturer-dashboard-card lecturer-dashboard-announcements-card">
            <h2>📢 Announcements</h2>
            <div className="lecturer-dashboard-search">
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="lecturer-dashboard-announcements-list">
              {filteredAnnouncements.map(item => (
                <div key={item.id} className="lecturer-dashboard-announcement-item">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lecturer-dashboard-card lecturer-dashboard-issues-card">
            <h2>📌 Issue Tracker</h2>
            <div className="lecturer-dashboard-issues-list">
              {issues.map(issue => (
                <div key={issue.id} className={`lecturer-dashboard-issue-item lecturer-dashboard-${issue.status}`}>
                  <span className="lecturer-dashboard-issue-icon">{issue.icon}</span>
                  <span className="lecturer-dashboard-issue-text">{issue.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lecturer-dashboard-card lecturer-dashboard-deadlines-card">
            <h2>📚 Upcoming Deadlines</h2>
            <div className="lecturer-dashboard-deadlines-list">
              {deadlines.map(deadline => (
                <div key={deadline.id} className="lecturer-dashboard-deadline-item">
                  <div className="lecturer-dashboard-deadline-date">{deadline.date}</div>
                  <div className="lecturer-dashboard-deadline-title">{deadline.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lecturer-dashboard-card lecturer-dashboard-calendar-card">
            <h2>📅 Academic Calendar</h2>
            <div className="lecturer-dashboard-calendar-wrapper">
              <Calendar
                onChange={handleDateChange}
                value={date}
                tileContent={({ date }) => {
                  const eventCount = getEventsForDate(date).length;
                  return eventCount > 0 ? <div className="lecturer-dashboard-calendar-event-indicator">{eventCount}</div> : null;
                }}
              />
            </div>
            <div className="lecturer-dashboard-events-manager">
              <h3>Events: {date.toLocaleDateString()}</h3>
              <div className="lecturer-dashboard-events-list">
                {getEventsForDate(date).map((event, idx) => (
                  <div key={idx} className="lecturer-dashboard-event-item">{event.event}</div>
                ))}
              </div>
              <div className="lecturer-dashboard-add-event">
                <input
                  type="text"
                  placeholder="Add new event"
                  value={newEvent}
                  onChange={e => setNewEvent(e.target.value)}
                />
                <button onClick={handleAddEvent}>Add</button>
              </div>
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