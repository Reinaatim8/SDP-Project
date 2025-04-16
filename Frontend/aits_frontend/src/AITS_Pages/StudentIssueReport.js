import React, { useState } from "react";
//import axios from "axios";
import StudentSidebar from "../components/StudentSidebar";
import LecturerDropdown from "../components/LecturerDropdown";
import Categorydropdown from "../components/Categorydropdown";
import "./StudentIssueReport.css";
import { submitIssue} from "../utils/issues";
import {toast} from 'react-toastify';

const StudentIssueReport = () => {
  const [issueTitle, setIssueTitle] = useState("");
  const [category, setCategory] = useState("");
  const [courseUnitName,setCourseUnitName] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [file, setFile] = useState(null);
 
  const handleLecturerSelection = (lecturer) => {
    setSelectedLecturer(lecturer);
  };

  const handleFileChange = (event)  => {
    setFile(event.target.files[0]);
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();

    // Submit issue to API
    const formData =  new FormData();
    formData.append("title", issueTitle);
    formData.append("lecturer", selectedLecturer);
    formData.append("category", category);
    formData.append("course_unit_name",courseUnitName)
    formData.append("description", issueDescription);
  
    if (file) {
      formData.append("attachment", file);
    }
    console.log("Submitting issue...");
      try {
        const response = await submitIssue(formData);
        console.log("Issue submitted successfully:", response);
        toast.success("Issue submitted successfully!");
        // Handle success (e.g., show a success message, clear form fields, etc.)
        //resetFormFields();
        setIssueTitle("");
        setIssueDescription("");
        setCourseUnitName("");
        setCategory("");
        setSelectedLecturer("");
         toast.success("Issue submitted successfully!");
        // Clear form fields
        //navigate to the student dashboard
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Failed to submit issue:", error.response ? error.response.data : error);
        toast.error("Failed to submit issue. Please try again.");
      }
    };


  return (
    <div className="student-issue-report-container">
      <StudentSidebar />
      <div className="student-issue-report-content">
        <h1 className="student-issue-report-title">📩 REPORT AN ISSUE</h1>
        <p className="student-issue-report-description" style={{color:'white'}}>Select a lecturer, categorize your issue, and describe it below. You can also attach any relevant files.</p>
        <hr className="student-issue-report-divider" />

       {/*FORM FIELDS FOR THE ISSUE */}
        <form className="student-issue-report-form" onSubmit={handleIssueSubmit}>
        <p style={{fontWeight:"bolder", textDecoration:" underline darkgreen"}}>SUBMIT YOUR ISSUE.</p>

          {/* Issue Title */}
          <div className="student-issue-report-form-group">
            <label className="student-issue-report-label">Issue Title:</label>
            <input type="text"
             placeholder="Enter the Issue Title..." 
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
             required />
          </div>
          
          {/* Lecturer Selection */}
          <div className="student-issue-report-form-group">
            <label className="student-issue-report-label">Select Lecturer:</label>
            <LecturerDropdown onSelect={handleLecturerSelection}
            />
          </div>
         {/*Category dropdownn list*/}
         <div className="student-issue-report-form-group">
          <label className="student-issue-report-label">Issue category </label>
          <input type="text"
           placeholder="Enter an issue category e.g WRONG MARKS, MISSING MARKS, MARKING COMPLAINT, NON-ACADEMIC etc."
           value={category}
           onChange={(e) => setCategory(e.target.value)}
           required />
         </div>
  
          {/*Course Unit Name */}
           <div className="student-issue-report-form-group">
           <label className="student-issue-report-label">Course Unit Name:</label>
              <input 
                type="text"
                placeholder="Enter the Course Unit Name....."
                value={courseUnitName}
                onChange={(e) => setCourseUnitName(e.target.value)}
                required
              />
            </div>
         
          {/* Issue Description */}
          <div className="student-issue-report-form-group">
            <label className="student-issue-report-label">Issue Description:</label>
            <textarea
              className="student-issue-report-textarea"
              rows="5"
              placeholder="Describe your issue here..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              required
            />
          </div>
          <div>
              <label>Attachment (Optional)</label>
              <br></br>
              <div>
              <input  className='attachment'
              type="file"
              id="myFile"
               name="filename"
               onChange={handleFileChange}
               ></input>
              </div>
          </div>
          <br></br>
          <div>
          {/*Submit Button */}
          <button type="submit" className="student-issue-report-submit-button">Submit Issue</button>
          </div>
        </form>
        
      </div>
    </div>
  );
};
export default StudentIssueReport;  // Export the component