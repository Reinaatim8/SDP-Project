// Add at the TOP of the file
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaFilter, FaSearch, FaComments, FaEdit } from "react-icons/fa";
import axios from "axios";
import "./LecturerIssueManagement.css";

const LecturerIssueManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const API_URL = "https://kennedymutebi7.pythonanywhere.com/issues/api/issues/";
  const API_TOKEN = "b0377bfb90173aac2ebd1b106a93dec811de90ab";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Token ${API_TOKEN}`,
        },
      });
      setIssues(response.data.results);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch issues. Please try again later.");
      setLoading(false);
      console.error("Error fetching issues:", err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#FF4D4D";
      case "medium": return "#FFA64D";
      case "low": return "#4DA6FF";
      default: return "#808080";
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#FFA64D";
      case "in_progress": return "#4D94FF";
      case "resolved": return "#4DFF88";
      default: return "#808080";
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  return (
    <div className="lecturer-issue-management">
      <div className="issue-management-header">
  <div className="header-left">
    <h1>Academic Issue Management</h1>
    <p>Track, respond to, and resolve student academic concerns</p>
  </div>
  <div className="header-right">
    <div
      className="user-profile"
      onMouseEnter={() => setShowUserDetails(true)}
      onMouseLeave={() => setShowUserDetails(false)}
    >
      <FaUserCircle size={40} />
      <span>{user?.username || "Lecturer"}</span>
      {showUserDetails && user && (
        <div className="user-details-popup">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.user_type || "Lecturer"}</p>
        </div>
      )}
    </div>
    <button className="back-button" onClick={() => navigate('/lecturer-dashboard')}>
      Back to Dashboard
    </button>
  </div>
</div>

      <div className="issues-container">
      <div className="issues-toolbar">
  <div className="search-bar">
    <FaSearch />
    <input
      type="text"
      placeholder="Search issues..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  <div className="filter-controls">
    <div className="filter-item">
      <label>Status:</label>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
    <div className="filter-item">
      <label>Priority:</label>
      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    <button className="refresh-button" onClick={fetchIssues}>
      Refresh
    </button>
  </div>
</div>
        {loading ? (
          <div className="loading-spinner">Loading issues...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="issue-list">
{issues.map((issue) => (
  <div key={issue.id} className="issue-card">
    <div className="issue-header">
      <h3>{issue.title}</h3>
      <div 
        className="priority-indicator" 
        style={{ backgroundColor: getPriorityColor(issue.priority) }}
      >
        {issue.priority}
      </div>
    </div>
    <p className="issue-description">{issue.description}</p>
    <div className="issue-meta">
      <div className="status-pill" style={{ backgroundColor: getStatusColor(issue.status) }}>
        {issue.status}
      </div>
      <span className="comment-count">
        <FaComments /> {issue.comments ? issue.comments.length : 0}
      </span>
      <span className="date-created">Created: {formatDate(issue.created_at)}</span>
    </div>
  </div>
))}          </div>
        )}
      </div>
    </div>
    
  );
};

export default LecturerIssueManagement;