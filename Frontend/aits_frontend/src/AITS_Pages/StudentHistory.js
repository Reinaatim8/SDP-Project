import React, { useState, useEffect } from 'react';

// Mock data - replace with API calls in the future
const mockIssues = {
  resolved: [
    { id: 1, title: 'Assignment submission error', category: 'Technical', dateSubmitted: '2025-03-15', dateResolved: '2025-03-17', priority: 'High' },
    { id: 2, title: 'Course material access issue', category: 'Access', dateSubmitted: '2025-03-10', dateResolved: '2025-03-12', priority: 'Medium' },
    { id: 3, title: 'Grade discrepancy in Math 101', category: 'Academic', dateSubmitted: '2025-02-28', dateResolved: '2025-03-05', priority: 'High' },
    { id: 4, title: 'Video playback not working', category: 'Technical', dateSubmitted: '2025-02-20', dateResolved: '2025-02-22', priority: 'Low' },
  ],
  unresolved: [
    { id: 5, title: 'Cannot access lab simulation', category: 'Technical', dateSubmitted: '2025-04-01', priority: 'High' },
    { id: 6, title: 'Missing feedback on project', category: 'Academic', dateSubmitted: '2025-03-25', priority: 'Medium' },
  ],
  drafts: [
    { id: 7, title: 'Question about final exam', category: 'Academic', lastEdited: '2025-04-10' },
    { id: 8, title: 'Request for extension', category: 'Administrative', lastEdited: '2025-04-08' },
  ]
};

const History = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [issues, setIssues] = useState({
    resolved: [],
    unresolved: [],
    drafts: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch actual data from API when available
  const fetchIssues = async () => {
    setIsLoading(true);
    try {
      // FUTURE API IMPLEMENTATION:
      // const response = await fetch('api/student/issues');
      // const data = await response.json();
      // setIssues(data);
      
      // Using mock data for now
      setIssues(mockIssues);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load issues. Please try again later.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // This will be replaced with real API call
    fetchIssues();
    
    // Optional: Clean-up function
    return () => {
      // Any clean-up code if needed
    };
  }, []);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get appropriate status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return 'history-status-badge history-status-resolved';
      case 'unresolved':
        return 'history-status-badge history-status-unresolved';
      case 'draft':
        return 'history-status-badge history-status-draft';
      default:
        return 'history-status-badge';
    }
  };

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'history-priority-badge history-priority-high';
      case 'Medium':
        return 'history-priority-badge history-priority-medium';
      case 'Low':
        return 'history-priority-badge history-priority-low';
      default:
        return 'history-priority-badge';
    }
  };

  // Function to render appropriate table based on active tab
  const renderTable = () => {
    if (isLoading) {
      return <div className="history-loading"><div className="history-spinner"></div></div>;
    }

    if (error) {
      return <div className="history-error">{error}</div>;
    }

    let dataToRender = [];
    
    // Determine which data to display based on active tab
    if (activeTab === 'all') {
      dataToRender = [
        ...issues.resolved.map(issue => ({ ...issue, status: 'resolved' })),
        ...issues.unresolved.map(issue => ({ ...issue, status: 'unresolved' })),
        ...issues.drafts.map(issue => ({ ...issue, status: 'draft' }))
      ];
    } else if (activeTab === 'resolved') {
      dataToRender = issues.resolved.map(issue => ({ ...issue, status: 'resolved' }));
    } else if (activeTab === 'unresolved') {
      dataToRender = issues.unresolved.map(issue => ({ ...issue, status: 'unresolved' }));
    } else if (activeTab === 'drafts') {
      dataToRender = issues.drafts.map(issue => ({ ...issue, status: 'draft' }));
    }

    if (dataToRender.length === 0) {
      return <div className="history-empty">No issues found</div>;
    }

    return (
      <div className="history-table-container">
        <table className="history-table">
          <thead className="history-table-header">
            <tr>
              <th scope="col" className="history-table-th">Issue</th>
              <th scope="col" className="history-table-th">Category</th>
              <th scope="col" className="history-table-th">Date</th>
              <th scope="col" className="history-table-th">Status</th>
              <th scope="col" className="history-table-th">Priority</th>
              <th scope="col" className="history-table-th">Actions</th>
            </tr>
          </thead>
          <tbody className="history-table-body">
            {dataToRender.map((issue) => (
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
                    {issue.status === 'draft' 
                      ? `Last edited: ${formatDate(issue.lastEdited)}` 
                      : `Submitted: ${formatDate(issue.dateSubmitted)}`}
                  </div>
                  {issue.dateResolved && (
                    <div className="history-date-secondary">
                      Resolved: {formatDate(issue.dateResolved)}
                    </div>
                  )}
                </td>
                <td className="history-table-cell">
                  <span className={getStatusBadge(issue.status)}>
                    {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                  </span>
                </td>
                <td className="history-table-cell">
                  {issue.priority && (
                    <span className={getPriorityBadge(issue.priority)}>
                      {issue.priority}
                    </span>
                  )}
                </td>
                <td className="history-table-cell history-actions-cell">
                  <button className="history-action-btn history-view-btn">View</button>
                  {issue.status === 'draft' && (
                    <button className="history-action-btn history-edit-btn">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h3 className="history-title">Issue History</h3>
        <p className="history-subtitle">
          View and manage all your submitted issues
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
              {issues.resolved.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('unresolved')}
            className={`history-tab ${activeTab === 'unresolved' ? 'history-tab-active' : ''}`}
          >
            Unresolved
            <span className="history-tab-count">
              {issues.unresolved.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`history-tab ${activeTab === 'drafts' ? 'history-tab-active' : ''}`}
          >
            Drafts
            <span className="history-tab-count">
              {issues.drafts.length}
            </span>
          </button>
        </nav>
      </div>
      
      <div className="history-content">
        {/* Filter and search options could be added here */}
        
        {/* Table */}
        {renderTable()}
      </div>

      {/* CSS for the component */}
      <style jsx>{`
        /* Container styles */
        .history-container {
          background-color: white;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          overflow: hidden;
          border-radius: 0.5rem;
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
        }
        
        .history-tab:hover {
          color: #374151;
          border-bottom-color: #D1D5DB;
        }
        
        .history-tab-active {
          border-bottom-color: #3B82F6;
          color: #3B82F6;
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
          border-top-color: #3B82F6;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        /* Error state */
        .history-error {
          background-color: #FEF2F2;
          padding: 1rem;
          border-radius: 0.375rem;
          color: #B91C1C;
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
          font-size: 0.875rem;
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
        
        .history-date-secondary {
          font-size: 0.875rem;
          color: #6B7280;
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
          color: #2563EB;
          margin-right: 0.75rem;
        }
        
        .history-view-btn:hover {
          color: #1D4ED8;
        }
        
        .history-edit-btn {
          color: #059669;
        }
        
        .history-edit-btn:hover {
          color: #047857;
        }
      `}</style>
    </div>
  );
};

export default History;