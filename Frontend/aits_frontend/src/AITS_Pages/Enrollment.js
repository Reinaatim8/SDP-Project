import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEnrollment } from "../utils/enrollments";
import { toast } from 'react-toastify';
import StudentHoverBar from "./StudentHoverBar";
import "./Enrollment.css";

const Enrollment = () => {
  const [formData, setFormData] = useState({
    student: "",
    course: "",
    semester: "",
    academicYear: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access')) {
      toast.error("Please login to enroll in a course.");
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    // Validate all required fields
    const { student, course, semester, academicYear } = formData;
    if (!student || !course || !semester || !academicYear) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Prepare data for API
    const enrollmentData = {
      student: student,
      course: course,
      semester: semester,
      academic_year: academicYear,
    };

    try {
      await createEnrollment(enrollmentData);
      toast.success("Enrollment submitted successfully!");
      
      // Reset form
      setFormData({
        student: "",
        course: "",
        semester: "",
        academicYear: ""
      });
      
      // Redirect after success
      setTimeout(() => navigate('/StudentDashboard'), 1500);
    } catch (error) {
      console.error("Failed to submit enrollment:", error);
      if (error.response?.status === 401) {
        toast.error("Your session has expired. Please login again.");
        navigate('/login');
      } else {
        toast.error("Failed to submit enrollment. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="enrollment-page">
      <StudentHoverBar />
      
      <div className="enrollment-container">
        <header className="enrollment-header">
          <div className="header-content">
            <div className="header-icon">📚</div>
            <h1>Course Enrollment</h1>
          </div>
          <p>Register for your academic courses for the upcoming term</p>
        </header>

        <div className="content-container">
          <div className="form-sidebar">
            <div className="sidebar-section">
              <h3>Enrollment Guidelines</h3>
              <ul>
                <li>Check course prerequisites</li>
                <li>Confirm your student ID is correct</li>
                <li>Verify course availability</li>
                <li>Note the correct semester format</li>
              </ul>
            </div>
            
            <div className="sidebar-section">
              <h3>Important Dates</h3>
              <ul>
                <li>Early enrollment: June 1-15</li>
                <li>Regular enrollment: June 16-30</li>
                <li>Late enrollment: July 1-7</li>
                <li>Add/drop period: First two weeks</li>
              </ul>
            </div>
          </div>
          
          <form className="enrollment-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Enrollment Details</h2>
              
              <div className="form-field">
                <label htmlFor="student">Student ID/Name <span className="required">*</span></label>
                <input 
                  type="text"
                  id="student"
                  name="student"
                  placeholder="Enter your student ID or full name" 
                  value={formData.student}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="course">Course <span className="required">*</span></label>
                <input 
                  type="text"
                  id="course"
                  name="course"
                  placeholder="Enter course name or code" 
                  value={formData.course}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="semester">Semester <span className="required">*</span></label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a semester</option>
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                  </select>
                </div>
                
                <div className="form-field">
                  <label htmlFor="academicYear">Academic Year <span className="required">*</span></label>
                  <input
                    type="text"
                    id="academicYear"
                    name="academicYear"
                    placeholder="E.g. 2024-2025"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    required
                  />
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
                {isSubmitting ? 'Processing...' : 'Enroll Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;