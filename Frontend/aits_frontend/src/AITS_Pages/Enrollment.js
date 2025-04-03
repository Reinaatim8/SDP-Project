import React, { useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import "./Enrollment.css"; // for styling
import  { createEnrollment as createEnrollmentApi } from "../utils/enrollments";

const Enrollment = () => {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  

  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();

    const enrollmentData = {
      student: studentId,
      course: courseId,
      semester: semester,
      academic_year: academicYear,
    };

    try {
      const response = await createEnrollmentApi(enrollmentData);
      alert("Enrollment submitted successfully!");
      console.log("API Response:", response.data);
      setStudentId("");
      setCourseId("");
      setSemester("");
      setAcademicYear("");
    } catch (error) {
      console.error("Failed to submit enrollment:", error.response ? error.response.data : error);
      alert("Failed to submit enrollment. Please try again.");
    }
  };

  return (
    <div className="enrollment-container">
      <div className="enrollment-container2">
      <StudentSidebar />
      <div className="enrollment-card">
        <h2>ENROLLING IN A COURSE </h2>
        {alert && (
          <div className="alert">
            {alert}
          </div>
        )}
        <form className="enrollment-form" onSubmit={handleEnrollmentSubmit}>
          <div className="enrollment-form-group">
            <label className="enrollment-label">Student:</label>
            <input
              type="text"
              value={studentId}
              placeholder="Enter your student name..."
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <div className="enrollment-form-group">
            <label className="enrollment-label">Course :</label>
            <input
              type="text"
              value={courseId}
              placeholder="Enter the course ..."
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </div>
          <div className="enrollment-form-group">
            <label className="enrollment-label">Semester:</label>
            <input
              type="text"
              value={semester}
              placeholder="Enter the current semester..."
              onChange={(e) => setSemester(e.target.value)}
              required
            />
          </div>
          <div className="enrollment-form-group">
            <label className="enrollment-label">Academic Year:</label>
            <input
              type="text"
              value={academicYear}
              placeholder="Enter your academic year..."
              onChange={(e) => setAcademicYear(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="enrollment-submit-button">
            Enroll
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Enrollment;
