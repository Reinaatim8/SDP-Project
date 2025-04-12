import React, { useState } from "react";
//import axios from "axios";
import StudentSidebar from "../components/StudentSidebar";
import LecturerDropdown from "../components/LecturerDropdown";
import "./StudentIssueReport.css";
import { submitIssue} from "../utils/issues";
import { createCategory  as createCategoryApi} from "../utils/categories";
import { createCourse as createCourseApi } from "../utils/courses";
import {toast} from 'react-toastify';
import StudentHoverBar from "./StudentHoverBar";

const StudentIssueReport = () => {
  const [step, setStep] = useState(1); // to track issue submission steps
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [courseName, setCourseName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [courseId, setCourseId] = useState(null);
 


  const handleLecturerSelection = (lecturer) => {
    setSelectedLecturer(lecturer);
  };

  const handleCourseCodeSelection = (courseCode) => {
    setSelectedCourseCode(courseCode);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const categoryResponse = await createCategoryApi({ name: categoryName, description: categoryDescription});
      const categoryId = categoryResponse.id;
      setCategoryId(categoryId);
      toast.success(`Category created successfully!`);
      //setTimeout(() => alert(""), 9000); // Clear alert after 9 seconds
    } catch (error) {
      console.error("Failed to create category:", error);
     toast.error("Failed to create category. Please try again.");
    }
  };
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const courseResponse = await createCourseApi({ course_name: courseName, course_code: selectedCourseCode });
      const courseId = courseResponse.id;
      setCourseId(courseId);
      toast.success(`Course created successfully! `);
      //setTimeout(() => toast.success(""), 9000); // Clear alert after 9 seconds
      setStep(2); // Move to the next step
    } catch (error) {
      console.error("Failed to create course:", error);
      toast.error("Failed to create course. Please try again.");
    }
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
    formData.append("category", categoryId);
    formData.append("description", issueDescription);
    formData.append("Course", selectedCourseCode);
    formData.append("student", selectedStudent? parseInt(selectedStudent): null);
    formData.append("course", courseId);
    if (file) {
      formData.append("attachment", file);
    }
    console.log("Submitting issue...");
      try {
        const response = await submitIssue(formData);
        console.log("Issue submitted successfully:", response);
        // Handle success (e.g., show a success message, clear form fields, etc.)
        //resetFormFields();
        setIssueTitle("");
        setIssueDescription("");
        setSelectedCourseCode("");
        setSelectedLecturer("");
        setSelectedStudent("");
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
      <StudentHoverBar />
      <div className="student-issue-report-content">
        <h1 className="student-issue-report-title">📩 REPORT AN ISSUE</h1>
        <p className="student-issue-report-description" style={{color:'white'}}>Select a lecturer, categorize your issue, and describe it below. You can also attach any relevant files.</p>
        <hr className="student-issue-report-divider" />
        {alert && (
          <div className="alert">
            {alert}
          </div>
        )}
        {step === 1 && (
          <div>
            
        <form className="student-issue-report-form2" onSubmit={handleCreateCategory}>
        <p><strong>Step 1:</strong> Create a Category.</p>
        {/* Category and Course Fields */}
         <div className="student-issue-report-form-group">
            <label className="student-issue-report-label">Issue Category Name:</label>
            <input
              type="text"
              value={categoryName}
              placeholder="Enter the Issue Category Name..."
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <label className="student-issue-report-label">Issue Category Description:</label>
            <input
              type="text"
              value={categoryDescription}
              placeholder="Enter a short Category Description of the issue..."
              onChange={(e) => setCategoryDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="student-issue-report-submit-button">Create an Issue Category</button>
          </form>
          <form className="student-issue-report-form2" onSubmit={handleCreateCourse}>
            <p><strong>Step 2:</strong>Fill in  Course Unit Details for the Issue</p>
          <div className="student-issue-report-form-group">
            <label className="student-issue-report-label">Course Unit Name:</label>
            <input
              type="text"
              value={courseName}
              placeholder="Enter the Course Unit Name..."
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
            <label className="student-issue-report-label">Course Unit Code:</label>
            <input
              type="text"
              value={selectedCourseCode}
              placeholder="Enter the Course Code..."
              onChange={(e) => setSelectedCourseCode(e.target.value)}
              required
            />
            <div>
             <button type="submit" className="student-issue-report-submit-button">
              Create a Course for the Issue
            </button>
            </div>
          </div>
          </form>
          </div>  
          
          
        )}
        {step === 2 && (
        <form className="student-issue-report-form" onSubmit={handleIssueSubmit}>
        <p><strong style={{fontWeight:"bolder", textDecoration:" underline darkgreen"}}>Step 2:</strong> Submit your issue using the Category and Course IDs obtained.</p>

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

  
          {/*Course Code */}
           <div>
           <label className="student-issue-report-label">Course Code:</label>
              <input 
                type="text"
                placeholder="Enter the Course Code....."
                value={selectedCourseCode}
                onChange={(e) => {
                  handleCourseCodeSelection(e.target.value);
                  
                }}
                className="student-issue-report-custom-tag-input"
                required
              />
            </div>
         
          
          
          {/* Student Selection */}
          <div className="student-issue-report-form-group">
            <label className="student-issue-report-label">Student ID:</label>
            <input
              type="text"
              placeholder="Enter Student ID (system given)..Please enter NO. 2..."
              value={selectedStudent || ""}
              onChange={(event) => setSelectedStudent(event.target.value)}
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
        )}
      </div>
    </div>
  );
};
export default StudentIssueReport;  // Export the component