import React, { useState } from "react";
import axios from "axios";
import StudentSidebar from "../components/StudentSidebar";
import LecturerDropdown from "../components/LecturerDropdown";
import "./StudentIssueReport.css";

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
 


  //API key or token
   const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNTY4NDc1LCJpYXQiOjE3NDM1NjQ4NzUsImp0aSI6IjUyMDllNTI2NDdiYTQ2OWZiZWJlNDUxMDI3NTVmMTg3IiwidXNlcl9pZCI6Mn0.852mmhnbMlHc2QL6GTnCF8xxQ9K6QK3qUVhtgDz3zxM";
  


  const handleLecturerSelection = (lecturer) => {
    setSelectedLecturer(lecturer);
  };

  const handleCourseCodeSelection = (courseCode) => {
    setSelectedCourseCode(courseCode);
  };

  const createCategory = async () => {
    try {
      const response = await axios.post(
        "https://kennedymutebi7.pythonanywhere.com//issues/api/categories/",
        { name: categoryName, description: categoryDescription},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiToken}`,
          },
        }
      );
      const categoryId = response.data.id;
      setCategoryId(categoryId);
      alert(`Category created successfully! ID: ${categoryId}. Please copy this ID for the next step.`);
      setTimeout(() => alert(""), 9000); // Clear alert after 9 seconds
    } catch (error) {
      console.error("Failed to create category:", error);
     alert("Failed to create category. Please try again.");
    }
  };
  const createCourse = async () => {
    try {
      const response = await axios.post(
        "https://kennedymutebi7.pythonanywhere.com/issues/api/courses/",
        { course_name: courseName, course_code: selectedCourseCode },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiToken}`,
          },
        }
      );
      const courseId = response.data.id;
      setCourseId(courseId);
      alert(`Course created successfully! ID: ${courseId}. Please copy this ID for the next step.`);
      setTimeout(() => alert(""), 9000); // Clear alert after 9 seconds
      setStep(2); // Move to the next step
    } catch (error) {
      console.error("Failed to create course:", error);
      alert("Failed to create course. Please try again.");
    }
  };

  const handleCategoryAndCourseCreation = async (e) => {
    e.preventDefault();
    await createCategory();
    await createCourse();
  };

  const handleFileChange = (event)  => {
    setFile(event.target.files[0]);
  };


  const handleIssueSubmit = async (e) => {
    e.preventDefault();

    // Validate issue details
  // alert(`ISSUE SUMMARY:
   // \nIssue Title: ${issueTitle}
    //\nLecturer: ${selectedLecturer}
   // \nCategory: ${categoryName}
   // \nCourseCode: ${selectedCourseCode}
  //  \nIssue Description: ${issueDescription}
  //  \nStudent_ID: ${selectedStudent}
   // \nCourse_ID: ${selectedCourse}
   // \nAttachment: ${file ? file.name : "None"}`);

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
        const response = await axios.post(
          "https://kennedymutebi7.pythonanywhere.com//issues/api/issues/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${apiToken}`,
            },
          }
        );
        alert("Issue submitted successfully!");
        // Clear form fields
        //navigate to the student dashboard

        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Failed to submit issue:", error.response ? error.response.data : error);
        alert("Failed to submit issue. Please try again.");
      }
    };


  return (
    <div className="student-issue-report-container">
      <StudentSidebar />
      <div className="student-issue-report-content">
        <h1 className="student-issue-report-title">📩 REPORT AN ISSUE</h1>
        <p className="student-issue-report-description">Select a lecturer, categorize your issue, and describe it below. You can also attach any relevant files.</p>
        <hr className="student-issue-report-divider" />
        {alert && (
          <div className="alert">
            {alert}
          </div>
        )}
        {step === 1 && (
        <form className="student-issue-report-form" onSubmit={handleCategoryAndCourseCreation }>
        <p><strong>Step 1:</strong> Please categorize your issue by creating a category and course.</p>
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
          <div className="student-issue-report-form-group">
            <label className="student-issue-report-label">Course Name:</label>
            <input
              type="text"
              value={courseName}
              placeholder="Enter the Course Name..."
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
            <label className="student-issue-report-label">Course Code:</label>
            <input
              type="text"
              value={selectedCourseCode}
              placeholder="Enter the Course Code..."
              onChange={(e) => setSelectedCourseCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="student-issue-report-submit-button">
              Create Category and Course
            </button>
          </form>
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
              placeholder="Enter Student ID (system given)..Please enter 1 or 2..."
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