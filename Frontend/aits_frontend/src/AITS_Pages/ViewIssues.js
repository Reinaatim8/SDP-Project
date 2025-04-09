import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../components/ToastContainer";
import { toast } from "react-toastify";
import StudentSidebar from "../components/StudentSidebar"; 
import "./ViewIssues.css"; // for styles

const ViewIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      const response = await axios.get("http://kennedymutebi7.pythonanywhere.com//issues/api/issues/"); 
      setIssues(response.data);
      toast.success("Issues loaded successfully!");
    } catch (error) {
      console.error("Error fetching issues:", error);
      toast.error("Failed to load issues. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="view-issues-container">
      <StudentSidebar />
      <div className="view-issues-content">
        <h2 className="view-issues-title">📄 REPORTED ISSUES</h2>
        {loading ? (
          <p>Loading issues...</p>
        ) : (
          <table className="issues-table">
            <thead>
              <tr>
                <th>Issue Title</th>
                <th>Issue Description</th>
                <th>Course Code</th>
                <th>Status</th>
                <th>Date</th>
                <th>Attachment</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.title}</td>
                  <td>{issue.lecturer_name || issue.lecturer}</td>
                  <td>{issue.course_name || issue.course}</td>
                  <td>{issue.status}</td>
                  <td>{new Date(issue.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Toast/>
      </div>
    </div>
  );
};

export default ViewIssues;
