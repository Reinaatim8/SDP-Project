import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaFilter, FaSearch, FaComments, FaEdit, FaCheck } from "react-icons/fa";
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
  );
};

export default LecturerIssueManagement;