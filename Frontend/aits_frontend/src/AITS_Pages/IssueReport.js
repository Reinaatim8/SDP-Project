import React, { useState } from 'react';
import './IssueReport.css'; // Ensure the CSS file is correctly imported

const IssueReport = () => {
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Issue Title:', issueTitle);
    console.log('Issue Description:', issueDescription);
    // Add API calls or further processing here
  };

  return (
    <div className="issue-report-container">
      <h1>Report an Issue</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="issueTitle">Issue Title</label>
          <input
            type="text"
            id="issueTitle"
            value={issueTitle}
            onChange={(e) => setIssueTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="issueDescription">Issue Description</label>
          <textarea
            id="issueDescription"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Issue</button>
      </form>
    </div>
  );
};

export default IssueReport;
