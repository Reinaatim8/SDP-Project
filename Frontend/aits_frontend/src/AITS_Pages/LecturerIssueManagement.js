import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaComments, FaEdit } from "react-icons/fa";
import axios from "axios";
import LecturerHoverBar from "../components/LecturerHoverBar";
import { StatusBadge } from "../components/StatusBadge.js";
import { PriorityBadge } from "../components/PriorityBadge.js";
import { formatDate } from "../utils/formatters.js";
import ConfirmationDialog from "../components/ConfirmationDialogue.js";

const API_BASE_URL = "https://kennedymutebi7.pythonanywhere.com";
const API_URL = `${API_BASE_URL}/issues/api/issues/`;
const COMMENTS_URL = `${API_BASE_URL}/issues/api/comments/`;

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
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user found
      navigate('/login');
      return;
    }
    fetchIssues();
  }, [navigate]);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      
      // Filter issues related to this lecturer
      const lecturerIssues = response.data.results.filter(
        issue => issue.lecturer === user?.id
      );
      
      setIssues(lecturerIssues);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch issues. Please try again later.");
      setLoading(false);
      console.error("Error fetching issues:", err);
      if (err.response && err.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const fetchIssueDetails = async (issueId) => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${API_URL}${issueId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSelectedIssue(response.data);
    } catch (err) {
      console.error('Error fetching issue details:', err);
      setError('Failed to fetch issue details');
    }
  };

  const handleIssueClick = (issueId) => {
    fetchIssueDetails(issueId);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('access');
      
      const commentData = {
        content: newComment,
        issue: selectedIssue.id,
        user: user.id
      };
      
      const response = await axios.post(
        COMMENTS_URL,
        commentData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      // Update the selected issue with the new comment
      const updatedIssue = {
        ...selectedIssue,
        comments: [...(selectedIssue.comments || []), response.data],
      };
      
      setSelectedIssue(updatedIssue);
      setNewComment("");
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment. Please try again.');
    }
  };

  const handleBackToList = () => {
    setSelectedIssue(null);
    fetchIssues(); // Refresh issues list when returning
  };

  const handleUpdateStatus = async () => {
    try {
      const token = localStorage.getItem('access');
      
      await axios.patch(
        `${API_URL}${selectedIssue.id}/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      // Update the selected issue with the new status
      setSelectedIssue({
        ...selectedIssue,
        status: newStatus
      });
      
      setUpdatingStatus(false);
      setShowConfirmation(false);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const confirmStatusUpdate = () => {
    setShowConfirmation(true);
  };

  const handleStatusChange = (status) => {
    setNewStatus(status);
  };

  const handleToggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  // Filter issues based on status, priority, and search term
  const filteredIssues = issues.filter(issue => {
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter;
    const matchesSearch = searchTerm === '' || 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toString().includes(searchTerm);
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const renderFilters = () => (
    <div className="filters">
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="filter-group">
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
      
      <div className="filter-group">
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
      
      <button onClick={fetchIssues}>Refresh</button>
    </div>
  );

  const renderTable = () => {
    if (loading) {
      return <div className="loading">Loading issues...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    if (filteredIssues.length === 0) {
      return <div className="no-issues">No issues found</div>;
    }

    return (
      <table className="issues-table">
        <thead>
          <tr>
            <th>Issue</th>
            <th>Student</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map((issue) => (
            <tr key={issue.id}>
              <td>
                <div className="issue-title">{issue.title}</div>
                <div className="issue-id">ID: {issue.id}</div>
              </td>
              <td>
                <div className="student-name">
                  {issue.student_name || `Student #${issue.student}`}
                </div>
              </td>
              <td>
                <div>{issue.category}</div>
                {issue.course_unit_name && (
                  <div className="course-unit">{issue.course_unit_name}</div>
                )}
              </td>
              <td>
                <div>
                  Submitted: {formatDate(issue.created_at)}
                </div>
                {issue.updated_at && issue.updated_at !== issue.created_at && (
                  <div>
                    Updated: {formatDate(issue.updated_at)}
                  </div>
                )}
              </td>
              <td>
                <StatusBadge status={issue.status} />
              </td>
              <td>
                {issue.priority && (
                  <PriorityBadge priority={issue.priority} />
                )}
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="view-button"
                    onClick={() => handleIssueClick(issue.id)}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderIssueDetail = () => {
    if (!selectedIssue) return null;
    
    return (
      <div className="issue-detail">
        <div className="issue-detail-header">
          <button 
            className="back-button"
            onClick={handleBackToList}
          >
            Back to Issues
          </button>
          
          <h2>{selectedIssue.title}</h2>
          
          <div className="issue-badges">
            <StatusBadge status={selectedIssue.status} />
            {selectedIssue.priority && (
              <PriorityBadge priority={selectedIssue.priority} />
            )}
          </div>
        </div>
        
        <div className="issue-detail-content">
          <div className="issue-metadata">
            <p><strong>Issue ID:</strong> #{selectedIssue.id}</p>
            <p><strong>Category:</strong> {selectedIssue.category}</p>
            <p><strong>Created:</strong> {formatDate(selectedIssue.created_at)}</p>
            <p><strong>Last Updated:</strong> {formatDate(selectedIssue.updated_at)}</p>
            
            <div className="student-info">
              <div className="student-header" onClick={handleToggleUserDetails}>
                <FaUserCircle /> 
                <h4>{selectedIssue.student_name || `Student #${selectedIssue.student}`}</h4>
              </div>
              
              {showUserDetails && (
                <div className="student-details">
                  <p><strong>Student ID:</strong> {selectedIssue.student}</p>
                  {selectedIssue.student_email && (
                    <p><strong>Email:</strong> {selectedIssue.student_email}</p>
                  )}
                  {selectedIssue.student_program && (
                    <p><strong>Program:</strong> {selectedIssue.student_program}</p>
                  )}
                </div>
              )}
            </div>
            
            {selectedIssue.course_unit_name && (
              <p><strong>Course Unit:</strong> {selectedIssue.course_unit_name}</p>
            )}
            {selectedIssue.courseCode && (
              <p><strong>Course Code:</strong> {selectedIssue.courseCode}</p>
            )}
            
            <div className="status-management">
              <h4>Manage Status</h4>
              {!updatingStatus ? (
                <button onClick={() => setUpdatingStatus(true)}>
                  <FaEdit /> Update Status
                </button>
              ) : (
                <div className="status-selector">
                  <select
                    value={newStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <div className="status-buttons">
                    <button onClick={() => setUpdatingStatus(false)}>Cancel</button>
                    <button 
                      onClick={confirmStatusUpdate}
                      disabled={!newStatus}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="issue-description">
            <h3>Issue Description</h3>
            <p>{selectedIssue.description}</p>
          </div>
          
          <div className="issue-comments">
            <h3>
              <FaComments /> Comments ({selectedIssue.comments ? selectedIssue.comments.length : 0})
            </h3>
            
            <div className="comments-list">
              {selectedIssue.comments && selectedIssue.comments.length > 0 ? (
                selectedIssue.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <div className="comment-header">
                      <span className="comment-author">
                        <FaUserCircle />
                        {comment.user_name || `User #${comment.user}`}
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
                rows={4}
              />
              <button 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="lecturer-issue-management">
      <LecturerHoverBar />
      
      <div className="page-header">
        <h1>Issue Management</h1>
        <p>Review and resolve student issues</p>
      </div>
      
      {!selectedIssue ? (
        <div className="issues-container">
          {renderFilters()}
          {renderTable()}
        </div>
      ) : (
        renderIssueDetail()
      )}
      
      {showConfirmation && (
        <ConfirmationDialog
          title="Update Status"
          message={`Are you sure you want to change the status to ${newStatus.replace('_', ' ')}?`}
          onConfirm={handleUpdateStatus}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default LecturerIssueManagement;