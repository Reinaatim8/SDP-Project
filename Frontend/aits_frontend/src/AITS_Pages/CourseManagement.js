import React, { useEffect, useState } from "react";
import apiClient from "../utils/axiosInstance";
import { toast } from "react-toastify";
import RegistrarSidebar from "../components/RegistrarSidebar";
import "./CourseManagement.css"; // Optional styling

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [lecturerName, setLecturerName] = useState([]);
 

  const fetchCourses = async () => {
    try {
      const res = await apiClient.get("/issues/api/courses/");
      setCourses(res.data.results);
    } catch (error) {
      toast.error("Failed to fetch courses.");
      console.error(error);
    }
  };


  const handleCourseCreate = async (e) => {
    e.preventDefault();
    try {
      const newCourse = {
        course_code: courseCode,
        course_name: courseName,
        description: description,
        lecturer_name: lecturerName || null,
      };
      await apiClient.post("/issues/api/courses/", newCourse);
      toast.success("Course created successfully!");
      // Reset form fields
      setCourseCode("");
      setCourseName("");
      setDescription("");
      setLecturerName("");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to create course.");
      console.error(error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchCourses();
   
  }, []);

  return (
    <div className="course-management-container">
      <RegistrarSidebar />
      <div className="course-management-content">
        <h2 style={{textAlign:'center', fontWeight:'boldER',textDecoration:'none',fontSize:'30px'}}>📘 COURSE MANAGEMENT</h2>

        <div className="course-form-group">
        <form className="course-form" onSubmit={handleCourseCreate}>
          <h3 style={{textAlign:'center', textDecoration:'underline'}}>ADD A NEW COURSE UNIT</h3>
        
          <label style={{fontWeight:'700'}}>Course Code:</label>
          <input
            type="text"
            placeholder="Enter the Course Code..."
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
          <label style={{fontWeight:'700'}}>Course Name:</label>
          <input
            type="text"
            placeholder="Enter the Course Name..."
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
          <label style={{fontWeight:'700'}}>Short Course Description:</label>
          <textarea className="course-description" rows={5}
            placeholder="Briefly enter a Course Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label style={{fontWeight:'700'}}>Lecturer In-Charge :</label>
          <input 
          type= 'text'
          placeholder="Enter Lecturer name...."
            value={lecturerName}
            onChange={(e) => setLecturerName(e.target.value)}
            required
          />
          
          <button type="submit">Create Course</button>
          
        </form>
        </div>
        <h3 style={{textAlign:'center', fontWeight:'900',textDecoration:'none'}}>📘 COURSE LIST</h3>
        

        <h3 style={{textAlign:'center', fontWeight:'900',textDecoration:'underline'}}>ALL COURSES/COURSE UNITS CREATED</h3>
        <table className="course-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.course_code}</td>
                <td>{course.course_name}</td>
                <td>{course.description }</td>
                
              </tr>
              
            ))}
          </tbody>
        </table>
        <div className="course-stats" style={{margin: '20px 0', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
  <h3 style={{textAlign:'center', marginBottom: '15px'}}>COURSE STATISTICS</h3>
  <div style={{display: 'flex', justifyContent: 'space-around'}}>
    <div className="stat-box">
      <p style={{fontSize: '24px', fontWeight: 'bold',textAlign:'center'}}>Total Courses <br></br>{courses.length}
      </p>
    </div>
    {/* You could add more statistics here if needed */}
  </div>
</div>
      </div>

    </div>

  );
};

export default CourseManagement;
