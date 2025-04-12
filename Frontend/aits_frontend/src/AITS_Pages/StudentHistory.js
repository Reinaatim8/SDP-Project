import React, { useState, useEffect } from 'react';
import './StudentHistory.css';

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
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'unresolved':
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'draft':
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
    }
  };

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'Low':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
    }
  };

  // Function to render appropriate table based on active tab
  const renderTable = () => {
    if (isLoading) {
      return <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div></div>;
    }

    if (error) {
      return <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>;
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
      return <div className="text-center py-10 text-gray-500">No issues found</div>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataToRender.map((issue) => (
              <tr key={issue.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                  <div className="text-sm text-gray-500">ID: {issue.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{issue.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {issue.status === 'draft' 
                      ? `Last edited: ${formatDate(issue.lastEdited)}` 
                      : `Submitted: ${formatDate(issue.dateSubmitted)}`}
                  </div>
                  {issue.dateResolved && (
                    <div className="text-sm text-gray-500">
                      Resolved: {formatDate(issue.dateResolved)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(issue.status)}>
                    {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {issue.priority && (
                    <span className={getPriorityBadge(issue.priority)}>
                      {issue.priority}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  {issue.status === 'draft' && (
                    <button className="text-green-600 hover:text-green-900">Edit</button>
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
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Issue History</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          View and manage all your submitted issues
        </p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex px-4 -mb-px" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('all')}
            className={`${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('resolved')}
            className={`${
              activeTab === 'resolved'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
          >
            Resolved 
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {issues.resolved.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('unresolved')}
            className={`${
              activeTab === 'unresolved'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
          >
            Unresolved
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {issues.unresolved.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`${
              activeTab === 'drafts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
          >
            Drafts
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {issues.drafts.length}
            </span>
          </button>
        </nav>
      </div>
      
      <div className="px-4 py-5 sm:px-6">
        {/* Filter and search options could be added here */}
        
        {/* Table */}
        {renderTable()}
      </div>
    </div>
  );
};

export default History;