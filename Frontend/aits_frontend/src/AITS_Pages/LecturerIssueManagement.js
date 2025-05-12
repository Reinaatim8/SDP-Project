import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaComments, FaEdit } from "react-icons/fa";
import axios from "axios";
import LecturerHoverBar from "../components/LecturerHoverBar";
import "./LecturerIssueManagement.css";

const LecturerIssueManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const API_BASE_URL = "https://kennedymutebi7.pythonanywhere.com";
  const API_URL = `${API_BASE_URL}/issues/api/issues/`;
  const COMMENTS_URL = `${API_BASE_URL}/issues/api/comments/`;
  
  const API_TOKEN = localStorage.getItem("access");
  console.log("API_TOKEN:", API_TOKEN);

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

  const handleIssueClick = (issue) => {
    // Fetch the issue with all comments if they're not already loaded
    if (!issue.comments || issue.comments.length === 0) {
      fetchIssueDetails(issue.id);
    } else {
      setSelectedIssue(issue);
    }
  };

  const fetchIssueDetails = async (issueId) => {
    try {
      const response = await axios.get(`${API_URL}${issueId}/`, {
        headers: {
          Authorization: `Token ${API_TOKEN}`,
        },
      });
      setSelectedIssue(response.data);
    } catch (err) {
      console.error("Error fetching issue details:", err);
      alert("Failed to fetch issue details. Please try again.");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const commentData = {
        content: newComment,
        issue: selectedIssue.id,
        user: user.id,
      };

      console.log("Posting comment with data:", commentData);
      
      const response = await axios.post(
        COMMENTS_URL,
        commentData,
        {
          headers: {
            Authorization: `Token ${API_TOKEN}`,
            //'Content-Type': 'application/json',
          },
        }
      );
      
      console.log("Comment post response:", response.data);
      
      // Update the local state with the new comment
      const updatedIssue = {
        ...selectedIssue,
        comments: selectedIssue.comments ? [...selectedIssue.comments, response.data] : [response.data],
      };
      
      setSelectedIssue(updatedIssue);
      
      // Update the issues list with the updated issue
      setIssues(
        issues.map((issue) =>
          issue.id === selectedIssue.id ? updatedIssue : issue
        )
      );
      
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err.response || err);
      alert("Failed to add comment. Please try again. Error: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleUpdateStatus = async () => {
    if (!newStatus) return;
    
    try {
      const response = await axios.patch(
        `${API_URL}${selectedIssue.id}/`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Token ${API_TOKEN}`,
          },
        }
      );
      
      // Update the local state with the updated issue
      const updatedIssue = {
        ...selectedIssue,
        status: newStatus,
      };
      
      setSelectedIssue(updatedIssue);
      
      // Update the issues list with the updated issue
      setIssues(
        issues.map((issue) =>
          issue.id === selectedIssue.id ? updatedIssue : issue
        )
      );
      
      setUpdatingStatus(false);
      setNewStatus("");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again. Error: " + (err.response?.data?.detail || err.message));
    }
  };

  // Filter issues based on status and priority filters and search term
  const filteredIssues = issues.filter((issue) => {
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || issue.priority === priorityFilter;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });
  
  // Get priority color based on priority level
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#FF4D4D";
      case "medium":
        return "#FFA64D";
      case "low":
        return "#4DA6FF";
      default:
        return "#808080";
    }
  };

  // Get status color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#FFA64D";
      case "in_progress":
        return "#4D94FF";
      case "resolved":
        return "#4DFF88";
      case "closed":
        return "#808080";
      default:
        return "#808080";
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  const handleBackToOverview = () => {
    setSelectedIssue(null);
  };

  return (
    <div className="lecturer-issue-management">
      <div>
      <LecturerHoverBar style={{marginLeft:"0px"}}/>
      </div>
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

      {!selectedIssue ? (
        // Issues Overview
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
                  <option value="closed">Closed</option>
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
            <>
              <div className="issues-summary">
                <div className="summary-card">
                  <h3>Total Issues</h3>
                  <p>{issues.length}</p>
                </div>
                <div className="summary-card">
                  <h3>Pending</h3>
                  <p>{issues.filter(issue => issue.status === "pending").length}</p>
                </div>
                <div className="summary-card">
                  <h3>In Progress</h3>
                  <p>{issues.filter(issue => issue.status === "in_progress").length}</p>
                </div>
                <div className="summary-card">
                  <h3>Resolved</h3>
                  <p>{issues.filter(issue => issue.status === "resolved").length}</p>
                </div>
              </div>

              <div className="issue-list">
                {filteredIssues.length === 0 ? (
                  <div className="no-issues">No issues match your criteria</div>
                ) : (
                  filteredIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="issue-card"
                      onClick={() => handleIssueClick(issue)}
                    >
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
                  ))
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        // Detailed Issue View
        <div className="issue-detail-container">
          <button className="back-button" onClick={handleBackToOverview}>
            Back to Issues
          </button>
          
          <div className="issue-detail-header">
            <h2>{selectedIssue.title}</h2>
            <div className="issue-meta-detail">
              <div 
                className="status-pill large" 
                style={{ backgroundColor: getStatusColor(selectedIssue.status) }}
              >
                {selectedIssue.status}
              </div>
              <div 
                className="priority-indicator large" 
                style={{ backgroundColor: getPriorityColor(selectedIssue.priority) }}
              >
                {selectedIssue.priority}
              </div>
            </div>
          </div>
          
          <div className="issue-detail-content">
            <div className="issue-main-content">
              <div className="issue-metadata">
                <p><strong>Issue ID:</strong> #{selectedIssue.id}</p>
                <p><strong>Category:</strong> {selectedIssue.category}</p>
                <p><strong>Created:</strong> {formatDate(selectedIssue.created_at)}</p>
                <p><strong>Last Updated:</strong> {formatDate(selectedIssue.updated_at)}</p>
                {selectedIssue.current_grade && (
                  <p><strong>Current Grade:</strong> {selectedIssue.current_grade}</p>
                )}
                {selectedIssue.expected_grade && (
                  <p><strong>Expected Grade:</strong> {selectedIssue.expected_grade}</p>
                )}
              </div>
              
              <div className="issue-description-box">
                <h3>Issue Description</h3>
                <p>{selectedIssue.description}</p>
              </div>
              
              <div className="action-buttons">
                {updatingStatus ? (
                  <div className="status-update-form">
                    <select 
                      value={newStatus} 
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button 
                      className="action-button update" 
                      onClick={handleUpdateStatus}
                    >
                      Update
                    </button>
                    <button 
                      className="action-button cancel" 
                      onClick={() => setUpdatingStatus(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    className="action-button" 
                    onClick={() => setUpdatingStatus(true)}
                  >
                    <FaEdit /> Change Status
                  </button>
                )}
              </div>
            </div>
            
            <div className="issue-comments">
              <h3>Comments ({selectedIssue.comments ? selectedIssue.comments.length : 0})</h3>
              
              <div className="comments-list">
                {selectedIssue.comments && selectedIssue.comments.length > 0 ? (
                  selectedIssue.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <span className="comment-author">
                          <FaUserCircle /> {comment.user_name || `User #${comment.user}`}
                        </span>
                        <span className="comment-date">{formatDate(comment.created_at)}</span>
                      </div>
                      <p className="comment-content">{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-comments">No comments yet</p>
                )}
              </div>
              
              <div className="add-comment">
                <textarea
                  placeholder="Add your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Post Comment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerIssueManagement;