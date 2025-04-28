import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LecturerDropdown from "../components/LecturerDropdown";
import Categorydropdown from "../components/Categorydropdown";
import { submitIssue } from "../utils/issues";
import { toast } from 'react-toastify';
import StudentHoverBar from "./StudentHoverBar";
import axios from "axios";
import "./StudentIssueReport.css";


const StudentIssueReport = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    courseCode: "",
    courseUnitName: "",
    description: "",
    lecturer: "",
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access')) {
      toast.error("Please login to submit an issue");
      navigate('/login');
    }
  }, [navigate]);

  // Handle all text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle dropdown selections
  const handleLecturerSelection = (lecturer) => {
    setFormData(prev => ({ ...prev, lecturer }));
  };

  const handleCategorySelection = (category) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    // Validate all required fields
    const { title, category, courseUnitName, courseCode, description, lecturer } = formData;
    if (!title || !category || !courseUnitName || !courseCode || !description || !lecturer) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Create form data for submission
    const submitFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitFormData.append(key, value);
    });
    
    if (file) {
      submitFormData.append("attachment", file);
    }

    try {
      await submitIssue(submitFormData);
      toast.success("Issue submitted successfully!");
          // 2. Now trigger the GET request to send the email
    await axios.get('https://kennedymutebi7.pythonanywhere.com//issues/api/notifications/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('access')}`, // if needed
      },
    });
    toast.success("Email notification sent!");
      
      // Reset form
      setFormData({
        title: "",
        category: "",
        courseCode: "",
        courseUnitName: "",
        description: "",
        lecturer: "",
      });
      setFile(null);
      
      // Redirect after success
      setTimeout(() => navigate('/StudentDashboard'), 1500);
    } catch (error) {
      console.error("Failed to submit issue:", error);
      if (error.response?.status === 401) {
        toast.error("Your session has expired. Please login again.");
        navigate('/login');
      } else {
        toast.error("Failed to submit issue. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="issue-report-page">
      <StudentHoverBar />
      
      <div className="issue-report-container">
        <header className="student-issue-header">
          <div className="header-content">
            <div className="header-icon">📩</div>
            <h1>Report an Issue</h1>
          </div>
          <p>Submit your academic concerns directly to faculty members</p>
        </header>

        <div className="content-container">
          <div className="form-sidebar">
            <div className="sidebar-section">
              <h3>Submission Guidelines</h3>
              <ul>
                <li>Be specific about your issue</li>
                <li>Include relevant course details</li>
                <li>Attach supporting documents if needed</li>
                <li>Write clear and concise descriptions</li>
              </ul>
            </div>
            
            <div className="sidebar-section">
              <h3>Issue Categories</h3>
              <ul>
                <li>Academic Concerns</li>
                <li>Assignment Problems</li>
                <li>Grading Questions</li>
                <li>Technical Issues</li>
                <li>Administrative Requests</li>
              </ul>
            </div>
          </div>
          
          <form className="issue-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Issue Details</h2>
              
              <div className="form-field">
                <label htmlFor="title">Issue Subject <span className="required">*</span></label>
                <input 
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter a concise subject line" 
                  value={formData.title}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="lecturer">Lecturer <span className="required">*</span></label>
                  <LecturerDropdown onSelect={handleLecturerSelection} />
                </div>
              
                <div className="form-field">
                  <label htmlFor="category">Category <span className="required">*</span></label>
                  <Categorydropdown 
                    onSelect={handleCategorySelection}
                    value={formData.category}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="courseUnitName">Course Unit Name <span className="required">*</span></label>
                  <input 
                    type="text"
                    id="courseUnitName"
                    name="courseUnitName"
                    placeholder="E.g. Introduction to Computer Science"
                    value={formData.courseUnitName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="courseCode">Course Code <span className="required">*</span></label>
                  <input
                    type="text"
                    id="courseCode"
                    name="courseCode"
                    placeholder="E.g. CS101"
                    value={formData.courseCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label htmlFor="description">Issue Description <span className="required">*</span></label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  placeholder="Provide a detailed explanation of your issue..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-field file-upload">
                <label htmlFor="attachment">
                  <div className="upload-container">
                    <i className="upload-icon">📎</i>
                    <span>Attachment (Optional)</span>
                  </div>
                </label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleFileChange}
                />
                <div className="file-info">
                  {file ? (
                    <span className="file-name">{file.name}</span>
                  ) : (
                    <span className="file-help">Drag & drop or click to upload (PDF, DOCX, JPG, PNG - Max 5MB)</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => navigate('/StudentDashboard')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Issue'}
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentIssueReport;