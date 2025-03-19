import React, { useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
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
    <div className="student-issue-report-container">
      <StudentSidebar />
      <div className="student-issue-report-content">
        <h1 className="student-issue-report-title">📩 Report an Issue</h1>
        <p className="student-issue-report-description">Select a lecturer, categorize your issue, and describe it below.</p>

        <form className="student-issue-report-form" onSubmit={handleSubmit}>
          {/* Lecturer Selection */}
          <div className="student-issue-report-form-group">
            <label className="student-issue-report-label">Select Lecturer:</label>
            <LecturerDropdown />
          </div>

          {/* Issue Tags */}
          <div className="student-issue-report-form-group">
            <label className="student-issue-report-label">Issue Category:</label>
            <div className="student-issue-report-tags-container">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`student-issue-report-tag-button ${selectedTag === tag ? "selected" : ""}`}
                  onClick={() => handleTagSelection(tag)}
                >
                  {tag}
                </button>
              ))}
              <div>
              <label>Course Code:</label>
              <input className="coursecode-input"
                type="text"
                placeholder="Enter the Course Code..."
                value={customTag}
                onChange={(e) => {
                  setCustomTag(e.target.value);
                  setSelectedTag(""); // Clear predefined tags when custom is typed
                }}
                className="student-issue-report-custom-tag-input"
              />
            </div>
          </div>
          </div>

          {/* Issue Description */}
          <div className="student-issue-report-form-group">
            <label className="student-issue-report-label">Issue Description:</label>
            <textarea
              rows="5"
              placeholder="Describe your issue..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              required
            />
          </div>
          <div>
              <label>Attachment (Optional)</label>
              <br></br>
              <div>
              <input  className='attachment'type="file" id="myFile" name="filename"></input>
              </div>
          </div>
          <br></br>
          <div>
          {/* Submit Button */}
          <button type="submit" className="student-issue-report-submit-button">Submit Issue</button>
        </form>
      </div>
      
    </div>
  );
};

export default StudentIssueReport;