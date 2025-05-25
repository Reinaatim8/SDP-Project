import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaComments, FaEdit, FaFilter, FaBell, FaChartBar, FaTags, FaCalendarAlt } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
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
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [unresolvedCount, setUnresolvedCount] = useState(0);

  const API_BASE_URL = "https://kennedymutebi7.pythonanywhere.com";
  const API_URL = `${API_BASE_URL}/issues/api/issues/`;
  const COMMENTS_URL = `${API_BASE_URL}/issues/api/comments/`;
  
  const API_TOKEN = localStorage.getItem("access");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchIssues();
  }, []);

  useEffect(() => {
    if (issues.length > 0) {
      const unresolved = issues.filter(issue => 
        issue.status !== "resolved" && issue.status !== "closed"
      ).length;
      setUnresolvedCount(unresolved);
    }
  }, [issues]);

  const filteredIssues = useMemo(() => {
    let filtered = [...issues];
    
    // Apply tab filter
    if (activeTab === "unresolved") {
      filtered = filtered.filter(issue => issue.status !== "resolved" && issue.status !== "closed");
    } else if (activeTab === "pending") {
      filtered = filtered.filter(issue => issue.status === "pending");
    } else if (activeTab === "in_progress") {
      filtered = filtered.filter(issue => issue.status === "in_progress");
    } else if (activeTab === "resolved") {
      filtered = filtered.filter(issue => issue.status === "resolved" || issue.status === "closed");
    }
    
    // Apply other filters
    if (statusFilter !== "all") {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }
    if (priorityFilter !== "all") {
      filtered = filtered.filter(issue => issue.priority === priorityFilter);
    }
    if (categoryFilter !== "all") {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(term) || 
        issue.description.toLowerCase().includes(term) ||
        (issue.student_name && issue.student_name.toLowerCase().includes(term))
      );
    }
    
    return filtered;
  }, [issues, activeTab, statusFilter, priorityFilter, categoryFilter, searchTerm]);

  const issuesByCategory = useMemo(() => {
    const grouped = {};
    filteredIssues.forEach(issue => {
      if (!grouped[issue.category]) {
        grouped[issue.category] = [];
      }
      grouped[issue.category].push(issue);
    });
    return grouped;
  }, [filteredIssues]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    issues.forEach(issue => uniqueCategories.add(issue.category));
    return Array.from(uniqueCategories);
  }, [issues]);

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

      const response = await axios.post(
        COMMENTS_URL,
        commentData,
        {
          headers: {
            Authorization: `Token ${API_TOKEN}`,
          },
        }
      );
      
      const updatedIssue = {
        ...selectedIssue,
        comments: selectedIssue.comments ? [...selectedIssue.comments, response.data] : [response.data],
      };
      
      setSelectedIssue(updatedIssue);
      setIssues(issues.map(issue => issue.id === selectedIssue.id ? updatedIssue : issue));
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
        { status: newStatus },
        { headers: { Authorization: `Token ${API_TOKEN}` } }
      );
      
      const updatedIssue = { ...selectedIssue, status: newStatus };
      setSelectedIssue(updatedIssue);
      setIssues(issues.map(issue => issue.id === selectedIssue.id ? updatedIssue : issue));
      setUpdatingStatus(false);
      setNewStatus("");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again. Error: " + (err.response?.data?.detail || err.message));
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
      case "closed": return "#808080";
      default: return "#808080";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  const handleBackToOverview = () => {
    setSelectedIssue(null);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="lecturer-issue-management">
      <LecturerHoverBar />
      
      <div className="issue-management-header">
        <div className="header-left">
          <h1>Academic Issue Management</h1>
          <p>Track, respond to, and resolve student academic concerns</p>
        </div>
        <div className="header-right">
          <div className="notification-badge">
            <FaBell size={20} />
            {unresolvedCount > 0 && <span className="badge-count">{unresolvedCount}</span>}
          </div>
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
                placeholder="Search issues by title, description or student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="filter-toggle" onClick={toggleFilters}>
                <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
            
            {showFilters && (
              <div className="filter-controls expanded">
                <div className="filter-row">
                  <div className="filter-item">
                    <label>Status:</label>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Priority:</label>
                    <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                      <option value="all">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Category:</label>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="filter-actions">
                  <button className="clear-filters" onClick={() => {
                    setStatusFilter("all");
                    setPriorityFilter("all");
                    setCategoryFilter("all");
                  }}>
                    Clear All Filters
                  </button>
                  <button className="refresh-button" onClick={fetchIssues}>
                    Refresh
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="issues-tabs">
            <button 
              className={`tab-button ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Issues
            </button>
            <button 
              className={`tab-button ${activeTab === "unresolved" ? "active" : ""}`}
              onClick={() => setActiveTab("unresolved")}
            >
              Unresolved
              {unresolvedCount > 0 && <span className="tab-badge">{unresolvedCount}</span>}
            </button>
            <button 
              className={`tab-button ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button 
              className={`tab-button ${activeTab === "in_progress" ? "active" : ""}`}
              onClick={() => setActiveTab("in_progress")}
            >
              In Progress
            </button>
            <button 
              className={`tab-button ${activeTab === "resolved" ? "active" : ""}`}
              onClick={() => setActiveTab("resolved")}
            >
              Resolved
            </button>
            <button 
              className={`tab-button ${activeTab === "categories" ? "active" : ""}`}
              onClick={() => setActiveTab("categories")}
            >
              By Category
            </button>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading issues...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <div className="issues-summary">
                <div className="summary-card total">
                  <h3>Total Issues</h3>
                  <p>{issues.length}</p>
                </div>
                <div className="summary-card pending">
                  <h3>Pending</h3>
                  <p>{issues.filter(issue => issue.status === "pending").length}</p>
                </div>
                <div className="summary-card in-progress">
                  <h3>In Progress</h3>
                  <p>{issues.filter(issue => issue.status === "in_progress").length}</p>
                </div>
                <div className="summary-card resolved">
                  <h3>Resolved</h3>
                  <p>{issues.filter(issue => issue.status === "resolved" || issue.status === "closed").length}</p>
                </div>
                <div className="summary-card high-priority">
                  <h3>High Priority</h3>
                  <p>{issues.filter(issue => issue.priority === "high").length}</p>
                </div>
              </div>

              {activeTab === "categories" ? (
                // Category View
                <div className="category-view">
                  {Object.entries(issuesByCategory).map(([category, categoryIssues]) => (
                    <div key={category} className="category-group">
                      <h3 className="category-header">
                        <BiCategoryAlt /> {category} ({categoryIssues.length})
                      </h3>
                      <div className="category-issues">
                        {categoryIssues.map(issue => (
                          <IssueCard 
                            key={issue.id} 
                            issue={issue} 
                            onClick={() => handleIssueClick(issue)}
                            getPriorityColor={getPriorityColor}
                            getStatusColor={getStatusColor}
                            formatDate={formatDate}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Standard List View
                <div className="issue-list">
                  {filteredIssues.length === 0 ? (
                    <div className="no-issues">
                      <img src="/empty-state.svg" alt="No issues found" />
                      <h3>No issues match your criteria</h3>
                      <p>Try adjusting your filters or search term</p>
                    </div>
                  ) : (
                    filteredIssues.map(issue => (
                      <IssueCard 
                        key={issue.id} 
                        issue={issue} 
                        onClick={() => handleIssueClick(issue)}
                        getPriorityColor={getPriorityColor}
                        getStatusColor={getStatusColor}
                        formatDate={formatDate}
                      />
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        // Detailed Issue View
        <div className="issue-detail-container">
          <button className="back-button" onClick={handleBackToOverview}>
            ← Back to Issues
          </button>
          
          <div className="issue-detail-header">
            <h2>{selectedIssue.title}</h2>
            <div className="issue-meta-detail">
              <div 
                className="status-pill large" 
                style={{ backgroundColor: getStatusColor(selectedIssue.status) }}
              >
                {selectedIssue.status.replace("_", " ")}
              </div>
              <div 
                className="priority-indicator large" 
                style={{ backgroundColor: getPriorityColor(selectedIssue.priority) }}
              >
                {selectedIssue.priority}
              </div>
              {selectedIssue.category && (
                <div className="category-tag">
                  <BiCategoryAlt /> {selectedIssue.category}
                </div>
              )}
            </div>
          </div>
          
          <div className="issue-detail-content">
            <div className="issue-main-content">
              <div className="issue-metadata">
                <p><strong>Issue ID:</strong> #{selectedIssue.id}</p>
                {selectedIssue.student_name && (
                  <p><strong>Student:</strong> {selectedIssue.student_name}</p>
                )}
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
              <h3>Discussion ({selectedIssue.comments ? selectedIssue.comments.length : 0})</h3>
              
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
                  <p className="no-comments">No comments yet. Start the discussion!</p>
                )}
              </div>
              
              <div className="add-comment">
                <textarea
                  placeholder="Add your response or request more information..."
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

// Reusable Issue Card Component
const IssueCard = ({ issue, onClick, getPriorityColor, getStatusColor, formatDate }) => (
  <div className="issue-card" onClick={onClick}>
    <div className="issue-header">
      <h3>{issue.title}</h3>
      <div 
        className="priority-indicator" 
        style={{ backgroundColor: getPriorityColor(issue.priority) }}
      >
        {issue.priority}
      </div>
    </div>
    
    {issue.category && (
      <div className="issue-category">
        <BiCategoryAlt /> {issue.category}
      </div>
    )}
    
    <p className="issue-description">{issue.description}</p>
    
    <div className="issue-meta">
      <div className="status-pill" style={{ backgroundColor: getStatusColor(issue.status) }}>
        {issue.status.replace("_", " ")}
      </div>
      <div className="meta-group">
        <span className="comment-count">
          <FaComments /> {issue.comments ? issue.comments.length : 0}
        </span>
        {issue.student_name && (
          <span className="student-name">
            <FaUserCircle /> {issue.student_name}
          </span>
        )}
      </div>
      <span className="date-created">
        <FaCalendarAlt /> {formatDate(issue.created_at)}
      </span>
    </div>
  </div>
);

export default LecturerIssueManagement;
