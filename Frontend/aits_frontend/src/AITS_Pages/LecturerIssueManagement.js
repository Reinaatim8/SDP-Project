// Add at the TOP of the file
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaFilter, FaSearch, FaComments, FaEdit } from "react-icons/fa";
import axios from "axios";
import "./LecturerIssueManagement.css";

const LecturerIssueManagement = () => {
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
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    
  );
};

export default LecturerIssueManagement;