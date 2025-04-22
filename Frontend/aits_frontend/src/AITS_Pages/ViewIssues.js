import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import StudentHoverBar from './StudentHoverBar';

const ViewIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [filteredIssues, setFilteredIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        toast.error("You must be logged in to view issues");
        navigate('/login');
        return;
      }
      
      try {
        const response = await apiClient.get('issues/api/issues/');
        const allIssues = response.data.results;
        setIssues(allIssues);
        setFilteredIssues(allIssues);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching issues:", error.response?.data || error);
        toast.error("Failed to fetch issues");
        setLoading(false);
        if (error.response?.status === 401) {
          toast.warning("Session expired. Please login again.");
          navigate('/login');
        }
      }
    };
    
    fetchIssues();
  }, [navigate]);

  useEffect(() => {
    // Filter issues based on active tab
    if (activeTab === 'all') {
      setFilteredIssues(issues);
    } else {
      setFilteredIssues(issues.filter(issue => issue.status.toLowerCase() === activeTab));
    }
  }, [activeTab, issues]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const lowercaseStatus = status.toLowerCase();
    switch (lowercaseStatus) {
      case 'resolved':
        return 'history-status-badge history-status-resolved';
      case 'in progress':
        return 'history-status-badge history-status-unresolved';
      case 'open':
        return 'history-status-badge history-status-draft';
      default:
        return 'history-status-badge';
    }
  };

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    const priorityMapping = {
      'high': 'history-priority-badge history-priority-high',
      'medium': 'history-priority-badge history-priority-medium',
      'low': 'history-priority-badge history-priority-low'
    };
    
    return priorityMapping[priority.toLowerCase()] || 'history-priority-badge';
  };

  const renderTable = () => {
    if (loading) {
      return <div className="history-loading"><div className="history-spinner"></div></div>;
    }

    if (filteredIssues.length === 0) {
      return <div className="history-empty">No issues found</div>;
    }

    return (
      <div className="history-table-container">
        <StudentHoverBar/>
        <table className="history-table">
          <thead className="history-table-header">
            <tr>
              <th scope="col" className="history-table-th">Issue</th>
              <th scope="col" className="history-table-th">Category</th>
              <th scope="col" className="history-table-th">Date</th>
              <th scope="col" className="history-table-th">Status</th>
              <th scope="col" className="history-table-th">Priority</th>
              <th scope="col" className="history-table-th">Assigned To</th>
              <th scope="col" className="history-table-th">Actions</th>
            </tr>
          </thead>
          <tbody className="history-table-body">
            {filteredIssues.map((issue) => (
              <tr key={issue.id} className="history-table-row">
                <td className="history-table-cell">
                  <div className="history-issue-title">{issue.title}</div>
                  <div className="history-issue-id">ID: {issue.id}</div>
                </td>
                <td className="history-table-cell">
                  <div className="history-category">{issue.category}</div>
                </td>
                <td className="history-table-cell">
                  <div className="history-date">
                    Submitted: {formatDate(issue.created_at)}
                  </div>
                </td>
                <td className="history-table-cell">
                  <span className={getStatusBadge(issue.status)}>
                    {issue.status}
                  </span>
                </td>
                <td className="history-table-cell">
                  <span className={getPriorityBadge(issue.priority)}>
                    {issue.priority}
                  </span>
                </td>
                <td className="history-table-cell">
                  <div className="history-assignee">{issue.assigned_to_name || 'Unassigned'}</div>
                </td>
                <td className="history-table-cell history-actions-cell">
                  <button 
                    className="history-action-btn history-view-btn"
                    onClick={() => navigate(`/issues/${issue.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Count issues by status for tab badges
  const getStatusCounts = () => {
    const counts = {
      resolved: 0,
      'in progress': 0,
      open: 0
    };
    
    issues.forEach(issue => {
      const status = issue.status.toLowerCase();
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="view-issues-page">
      
      
      <div className="history-container">
        <div className="history-header">
          <h3 className="history-title">Issue History</h3>
          <p className="history-subtitle">
            View all your submitted issues
          </p>
        </div>
        
        {/* Tabs */}
        <div className="history-tabs-container">
          <nav className="history-tabs" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('all')}
              className={`history-tab ${activeTab === 'all' ? 'history-tab-active' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`history-tab ${activeTab === 'resolved' ? 'history-tab-active' : ''}`}
            >
              Resolved 
              <span className="history-tab-count">
                {statusCounts.resolved}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('in progress')}
              className={`history-tab ${activeTab === 'in progress' ? 'history-tab-active' : ''}`}
            >
              In Progress
              <span className="history-tab-count">
                {statusCounts['in progress']}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('open')}
              className={`history-tab ${activeTab === 'open' ? 'history-tab-active' : ''}`}
            >
              Open
              <span className="history-tab-count">
                {statusCounts.open}
              </span>
            </button>
          </nav>
        </div>
        
        <div className="history-content">
          {renderTable()}
        </div>
      </div>

      <style jsx>{`
        /* View Issues Page */
        .view-issues-page {
          display: flex;
        }
        
        /* Container styles */
        .history-container {
          background-color: white;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          overflow: hidden;
          margin: 40px;
          border-radius: 0.5rem;
          margin-bottom: 210px;
          flex-grow: 1;
        }
        
        /* Header styles */
        .history-header {
          padding: 1.25rem 1rem;
        }
        
        .history-title {
          font-size: 1.125rem;
          font-weight: 500;
          color: #111827;
        }
        
        .history-subtitle {
          margin-top: 0.25rem;
          font-size: 0.875rem;
          color: #6B7280;
        }
        
        /* Tabs styling */
        .history-tabs-container {
          border-bottom: 1px solid #E5E7EB;
        }
        
        .history-tabs {
          display: flex;
          padding: 0 1rem;
        }
        
        .history-tab {
          padding: 1rem;
          border-bottom: 2px solid transparent;
          font-size: 0.875rem;
          font-weight: 500;
          color: #6B7280;
          background: none;
          cursor: pointer;
          border: none;
        }
        
        .history-tab:hover {
          color: #374151;
          border-bottom-color: #D1D5DB;
        }
        
        .history-tab-active {
          border-bottom-color: #f0a500;
          color: #f0a500;
        }
        
        .history-tab-count {
          margin-left: 0.5rem;
          background-color: #F3F4F6;
          color: #4B5563;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        /* Content area */
        .history-content {
          padding: 1.25rem 1rem;
        }
        
        /* Loading state */
        .history-loading {
          display: flex;
          justify-content: center;
          padding: 2.5rem 0;
        }
        
        .history-spinner {
          animation: spin 1s linear infinite;
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 9999px;
          border: 2px solid #E5E7EB;
          border-top-color: #f0a500;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        /* Empty state */
        .history-empty {
          text-align: center;
          padding: 2.5rem 0;
          color: #6B7280;
        }
        
        /* Table styles */
        .history-table-container {
          overflow-x: auto;
        }
        
        .history-table {
          min-width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .history-table-header {
          background-color: #F9FAFB;
        }
        
        .history-table-th {
          padding: 0.75rem 1.5rem;
          text-align: left;
          font-size: 0.75rem;
          font-weight: 500;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .history-table-body {
          background-color: white;
        }
        
        .history-table-row {
          border-bottom: 1px solid #E5E7EB;
        }
        
        .history-table-row:hover {
          background-color: #F9FAFB;
        }
        
        .history-table-cell {
          padding: 1rem 1.5rem;
          white-space: nowrap;
        }
        
        .history-issue-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: #111827;
        }
        
        .history-issue-id {
          font-size: 0.75rem;
          color: #6B7280;
        }
        
        .history-category {
          font-size: 0.875rem;
          color: #111827;
        }
        
        .history-date {
          font-size: 0.875rem;
          color: #111827;
        }
        
        .history-assignee {
          font-size: 0.875rem;
          color: #111827;
        }
        
        /* Status badges */
        .history-status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-block;
        }
        
        .history-status-resolved {
          background-color: #D1FAE5;
          color: #065F46;
        }
        
        .history-status-unresolved {
          background-color: #FEF3C7;
          color: #92400E;
        }
        
        .history-status-draft {
          background-color: #F3F4F6;
          color: #4B5563;
        }
        
        /* Priority badges */
        .history-priority-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-block;
        }
        
        .history-priority-high {
          background-color: #FEE2E2;
          color: #991B1B;
        }
        
        .history-priority-medium {
          background-color: #DBEAFE;
          color: #1E40AF;
        }
        
        .history-priority-low {
          background-color: #D1FAE5;
          color: #065F46;
        }
        
        /* Action buttons */
        .history-actions-cell {
          text-align: right;
        }
        
        .history-action-btn {
          font-size: 0.875rem;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
        }
        
        .history-view-btn {
          color: #f0a500;
          margin-right: 0.75rem;
        }
        
        .history-view-btn:hover {
          color: #d09000;
        }
      `}</style>
    </div>
  );
};

export default ViewIssues;