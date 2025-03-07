import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import LecturerDropdown from "../components/LecturerDropdown";
import "./StudentIssueReport.css";

const StudentIssueReport = () => {
  const [selectedTag, setSelectedTag] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const tags = ["Missing Marks", "Wrong Grades", "Timetable Issues", "Exam Issues"];

  const handleTagSelection = (tag) => {
    setSelectedTag(tag);
    setCustomTag("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Issue submitted:\nLecturer: [Selected Lecturer]\nTag: ${selectedTag || customTag}\nDescription: ${issueDescription}`);
  };

  return (
    <div className="issue-report-container">
      <Sidebar />
      <div className="issue-report-content">
        <h1>📩 Report an Issue</h1>
        <p>Select a lecturer, categorize your issue, and describe it below.</p>

        <form className="issue-form" onSubmit={handleSubmit}>
          {/* Lecturer Selection */}
          <div className="form-group">
            <label>Select Lecturer:</label>
            <LecturerDropdown />
          </div>

          {/* Issue Tags */}
          <div className="form-group">
            <label>Issue Category:</label>
            <div className="tags-container">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`tag-button ${selectedTag === tag ? "selected" : ""}`}
                  onClick={() => handleTagSelection(tag)}
                >
                  {tag}
                </button>
              ))}
              <input
                type="text"
                placeholder="Custom tag..."
                value={customTag}
                onChange={(e) => {
                  setCustomTag(e.target.value);
                  setSelectedTag(""); // Clear predefined tags when custom is typed
                }}
                className="custom-tag-input"
              />
            </div>
          </div>

          {/* Issue Description */}
          <div className="form-group">
            <label>Issue Description:</label>
            <textarea
              rows="5"
              placeholder="Describe your issue..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">Submit Issue</button>
        </form>
      </div>
    </div>
  );
};

export default StudentIssueReport;
