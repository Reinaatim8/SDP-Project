import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/axiosInstance';
import './ViewIssues.css'; // Optional styling file
import { toast } from 'react-toastify';
import StudentSidebar from '../components/StudentSidebar';

const ViewIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
   
  //const user = JSON.parse(localStorage.getItem("user"));
  //const id = user?.id;


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

  if (loading) return <p>Loading issues...</p>;

  return (
    <div className="view-issues-container">
      <StudentSidebar/>
      <h1 style={{textAlign:"center", backgroundColor:"white"}}>📋 SUBMITTED ISSUES</h1>

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
              <td>{issue.title}</td>
              <td>{issue.description}</td>
              <td>{issue.category}</td>
              <td>{issue.status}</td>
              <td>{issue.priority}</td>
              <td>{issue.assigned_to_name}</td>
              <td>{new Date(issue.created_at).toLocaleString()}</td>
            </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewIssues;
