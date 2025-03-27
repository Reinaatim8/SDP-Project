import React, { useState, useEffect } from 'react';
import RegistrarSidebar from '../components/RegistrarSidebar';
import { getCourses, createCourse, deleteCourse } from '../utils/api';
import './RegistrarDashboard.css';

const RegistrarDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', description: '' });

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCreateCourse = async () => {
    try {
      const createdCourse = await createCourse(newCourse);
      setCourses([...courses, createdCourse]);
      setShowModal(false); // Close the modal
      setNewCourse({ name: '', description: '' }); // Reset the form
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="registrar-dashboard-container">
      <RegistrarSidebar />
      <div className="registrar-dashboard-content">
        <div className="registrar-dashboard-header">
          <img src='/images/registrarlogo.png' alt="registrarlogo" />
          <h2 className="registrar-dashboard-title">Registrar Dashboard</h2>
          <p className="registrar-dashboard-subtitle">Welcome! Manage student records and administrative tasks.</p>
        </div>
        <div className="registrar-dashboard-sections">
          <div className="registrar-dashboard-section registrar-dashboard-student-management">
            <div className="registrar-dashboard-section-content">
              <h3 className="registrar-dashboard-section-heading">Student Management 👩‍🎓</h3>
              <p className="registrar-dashboard-section-text">View and manage student records, enrollments, and academic performance.</p>
              <button className="registrar-dashboard-btn registrar-dashboard-btn-primary">View Students</button>
            </div>
            <div className="registrar-dashboard-section-image">
              <img src="/images/student.gif" alt="Student Management" className='gif' />
            </div>
          </div>
          <div className="registrar-dashboard-section registrar-dashboard-course-management">
            <div className="registrar-dashboard-section-content" >
              <h3 className="registrar-dashboard-section-heading">Course Management 🏢</h3>
              <p className="registrar-dashboard-section-text">Oversee course offerings, enrollments, and schedules.</p>
              <button
                className="registrar-dashboard-btn registrar-dashboard-btn-primary"
                onClick={() => setShowModal(true)} // Open the modal
              >
                Add New Course
              </button>
            </div>
            <div className="registrar-dashboard-section-image">
              <img src="/images/courses.gif" alt="Course Management" className='gif' />
            </div>
          </div>

          {/* Display Courses */}
          <div className="registrar-dashboard-section">
            <h3>Available Courses</h3>
            {loading ? (
              <p>Loading courses...</p>
            ) : (
              <ul>
                {courses.map((course) => (
                  <li key={course.id}>
                    {course.name} - {course.description}
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="registrar-dashboard-btn registrar-dashboard-btn-danger"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="registrar-dashboard-section registrar-dashboard-reports" id='reports-section'>
            <div className="registrar-dashboard-reports-content">
              <h3 className="registrar-dashboard-section-heading">Reports & Analytics 📊</h3>
              <p className="registrar-dashboard-section-text">Generate and view reports on student performance and enrollment statistics.</p>
              <button className="registrar-dashboard-btn registrar-dashboard-btn-primary">View Reports</button>
            </div>
            <div className="registrar-dashboard-reports-image">
              <img src="/images/statistics.gif" alt="Reports and Analytics" className='gif' />
            </div>
          </div>
          <div className="registrar-dashboard-section registrar-dashboard-notifications">
            <div className="registrar-dashboard-section-content">
              <h3 className="registrar-dashboard-section-heading">Notifications 🔔</h3>
              <p className="registrar-dashboard-section-text">Stay updated with important alerts and reminders.</p>
              <button className="registrar-dashboard-btn registrar-dashboard-btn-primary">View Notifications</button>
            </div>
            <div className="registrar-dashboard-section-image">
              <img src="/images/notifications.gif" alt="Notifications" className='gif'/>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding a New Course */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Course</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateCourse();
              }}
            >
              <label>
                Course Name:
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  required
                />
              </label>
              <button type="submit" className="registrar-dashboard-btn registrar-dashboard-btn-primary">
                Save
              </button>
              <button
                type="button"
                className="registrar-dashboard-btn registrar-dashboard-btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="registrar-dashboard-footer">
        <p>&copy; 2025 AITS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RegistrarDashboard;