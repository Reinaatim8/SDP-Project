import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/axiosInstance';
import './ViewIssuesAdmin.css'; // Optional styling file
import { toast } from 'react-toastify';
import RegistrarSidebar from '../components/RegistrarSidebar';

const ViewIssuesAdmin = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
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
        
        // Filter only issues created by this user
       // const userIssues = allIssues.filter(issue => issue.created_by === id);

        setIssues(allIssues);
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

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );


  
  return (
    <div className="view-issues-container">
      <RegistrarSidebar/>
      <h1 style={{textAlign:"center", backgroundColor:"white"}}>📋 ALL STUDENT SUBMITTED ISSUES</h1>

      {issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <table className="issues-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td data-label="Title">{issue.title}</td>
              <td data-label="Description">{issue.description}</td>
              <td>{issue.category}</td>
              <td className={`status-${issue.status.toLowerCase()}`}>{issue.status}</td>
              <td className={`priority-${issue.priority.toLowerCase()}`}>{issue.priority}</td>
              <td>{issue.assigned_to_name}</td>
              <td>{new Date(issue.created_at).toLocaleString()}</td>
            </tr>
            ))}
          </tbody>
        </table>
         )}
          <div className="course-stats" style={{margin: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px',width:'815px', marginLeft:'300px'}}>
           <h3 style={{textAlign:'center', marginBottom: '15px'}}>ISSUSE STATISTICS</h3>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                  <div className="stat-box">
                    <p style={{fontSize: '24px', fontWeight: 'bold',textAlign:'center'}}>Total Issues Submitted<br></br>{issues.length}
                    </p>
                  </div>
          </div>
         </div>
                   
      
    </div>
  );
};

export default ViewIssuesAdmin;
