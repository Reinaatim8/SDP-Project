import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentHoverBar from './StudentHoverBar';

// Common utility functions
import { formatDate, getStatusBadge, getPriorityBadge } from '../utils/formatters';

const API_BASE_URL = "https://kennedymutebi7.pythonanywhere.com";
const API_URL = `${API_BASE_URL}/issues/api/issues/`;

const History = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [issues, setIssues] = useState({
    resolved: [],
    unresolved: [],
    drafts: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newComment, setNewComment] = useState("");

  // Fetch issues from the API
  const fetchIssues = async () => {
    setIsLoading(true);
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
      
      // Filter issues based on student ownership
      const studentId = getUserIdFromToken(token);
      const studentIssues = response.data.results.filter(issue => issue.student === studentId);
      
      // Categorize issues
      const categorizedIssues = {
        resolved: studentIssues.filter(issue => issue.status === 'resolved' || issue.status === 'closed'),
        unresolved: studentIssues.filter(issue => issue.status === 'pending' || issue.status === 'in_progress'),
        drafts: studentIssues.filter(issue => issue.status === 'draft')
      };
      
      setIssues(categorizedIssues);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load issues. Please try again later.');
      setIsLoading(false);
      console.error('Error fetching issues:', err);
      
      // Redirect to login if unauthorized
      if (err.response && err.response.status === 401) {
        navigate('/login');
      }
    }
  };

  // Get user ID from token (placeholder - implement proper token decoding)
  const getUserIdFromToken = (token) => {
    // In a production environment, you would decode the token properly
    // For now, retrieve user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.id : null;
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Fetch a specific issue with all its details
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

  // Handle clicking on an issue to view details
  const handleIssueClick = (issueId) => {
    fetchIssueDetails(issueId);
  };

  // Add a comment to an issue
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('access');
      const user = JSON.parse(localStorage.getItem('user'));
      
      const commentData = {
        content: newComment,
        issue: selectedIssue.id,
        user: user.id
      };
      
      const response = await axios.post(
        `${API_BASE_URL}/issues/api/comments/`,
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

  // Return to the issues list
  const handleBackToList = () => {
    setSelectedIssue(null);
  };

  // Function to render appropriate table based on active tab
  const renderTable = () => {
    if (isLoading) {
      return <div>Loading issues...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    let dataToRender = [];
    
    // Determine which data to display based on active tab
    if (activeTab === 'all') {
      dataToRender = [
        ...issues.resolved.map(issue => ({ ...issue, status: issue.status })),
        ...issues.unresolved.map(issue => ({ ...issue, status: issue.status })),
        ...issues.drafts.map(issue => ({ ...issue, status: issue.status }))
      ];
    } else if (activeTab === 'resolved') {
      dataToRender = issues.resolved;
    } else if (activeTab === 'unresolved') {
      dataToRender = issues.unresolved;
    } else if (activeTab === 'drafts') {
      dataToRender = issues.drafts;
    }

    if (dataToRender.length === 0) {
      return <div>No issues found</div>;
    }

    return (
      <div>
        <StudentHoverBar />
        <table>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataToRender.map((issue) => (
              <tr key={issue.id}>
                <td>
                  <div>{issue.title}</div>
                  <div>ID: {issue.id}</div>
                </td>
                <td>
                  <div>{issue.category}</div>
                </td>
                <td>
                  <div>
                    Submitted: {formatDate(issue.created_at)}
                  </div>
                  {issue.status === 'resolved' && issue.updated_at && (
                    <div>
                      Resolved: {formatDate(issue.updated_at)}
                    </div>
                  )}
                </td>
                <td>
                  <span className={getStatusBadge(issue.status)}>
                    {issue.status.replace('_', ' ').charAt(0).toUpperCase() + issue.status.replace('_', ' ').slice(1)}
                  </span>
                </td>
                <td>
                  {issue.priority && (
                    <span className={getPriorityBadge(issue.priority)}>
                      {issue.priority}
                    </span>
                  )}
                </td>
                <td>
                  <button onClick={() => handleIssueClick(issue.id)}>View</button>
                  {issue.status === 'draft' && (
                    <button onClick={() => navigate(`/edit-issue/${issue.id}`)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render detailed issue view
  const renderIssueDetail = () => {
    if (!selectedIssue) return null;
    
    return (
      <div>
        <button onClick={handleBackToList}>Back to Issues</button>
        
        <div>
          <h2>{selectedIssue.title}</h2>
          <div>
            <span className={getStatusBadge(selectedIssue.status)}>
              {selectedIssue.status.replace('_', ' ').charAt(0).toUpperCase() + selectedIssue.status.replace('_', ' ').slice(1)}
            </span>
            {selectedIssue.priority && (
              <span className={getPriorityBadge(selectedIssue.priority)}>
                {selectedIssue.priority}
              </span>
            )}
          </div>
        </div>
        
        <div>
          <div>
            <p><strong>Issue ID:</strong> #{selectedIssue.id}</p>
            <p><strong>Category:</strong> {selectedIssue.category}</p>
            <p><strong>Created:</strong> {formatDate(selectedIssue.created_at)}</p>
            <p><strong>Last Updated:</strong> {formatDate(selectedIssue.updated_at)}</p>
            {selectedIssue.course_unit_name && (
              <p><strong>Course Unit:</strong> {selectedIssue.course_unit_name}</p>
            )}
            {selectedIssue.courseCode && (
              <p><strong>Course Code:</strong> {selectedIssue.courseCode}</p>
            )}
          </div>
          
          <div>
            <h3>Issue Description</h3>
            <p>{selectedIssue.description}</p>
          </div>
          
          <div>
            <h3>Comments ({selectedIssue.comments ? selectedIssue.comments.length : 0})</h3>
            
            <div>
              {selectedIssue.comments && selectedIssue.comments.length > 0 ? (
                selectedIssue.comments.map((comment) => (
                  <div key={comment.id}>
                    <div>
                      <span>
                        {comment.user_name || `User #${comment.user}`}
                      </span>
                      <span>{formatDate(comment.created_at)}</span>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
            
            <div>
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
    );
  };

  return (
    <div>
      <div>
        <h3>Issue History</h3>
        <p>View and manage all your submitted issues</p>
      </div>
      
      {!selectedIssue ? (
        <>
          {/* Tabs */}
          <div>
            <nav aria-label="Tabs">
              <button
                onClick={() => setActiveTab('all')}
                className={activeTab === 'all' ? 'active' : ''}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('resolved')}
                className={activeTab === 'resolved' ? 'active' : ''}
              >
                Resolved 
                <span>
                  {issues.resolved.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('unresolved')}
                className={activeTab === 'unresolved' ? 'active' : ''}
              >
                Unresolved
                <span>
                  {issues.unresolved.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('drafts')}
                className={activeTab === 'drafts' ? 'active' : ''}
              >
                Drafts
                <span>
                  {issues.drafts.length}
                </span>
              </button>
            </nav>
          </div>
          
          <div>
            <button onClick={fetchIssues}>Refresh</button>
            {renderTable()}
          </div>
        </>
      ) : (
        renderIssueDetail()
      )}
    </div>
  );
};

export default History;