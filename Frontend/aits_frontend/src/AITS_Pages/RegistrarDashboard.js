import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrarSidebar from '../components/RegistrarSidebar';
import './RegistrarDashboard.css';

const RegistrarDashboard = () => {
  const [courses, setCourses] = useState([]); // State to store courses
  const [auditLogs, setAuditLogs] = useState([]); // State to store audit logs
  const [newCourse, setNewCourse] = useState({ course_code: '', course_name: '', description: '' }); // State for new course
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [showModal, setShowModal] = useState(false); // Modal visibility

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError('');
      try {
        // Manually provide the token here
        const token = '95fc7712c213c978a249fe1447dd50921384cfd5'; // Replace with your actual access token

        console.log('Fetching courses with token:', token); // Debugging

        const response = await axios.get(
          'https://kennedymutebi7.pythonanywhere.com/api/courses/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Courses fetched successfully:', response.data); // Debugging
        setCourses(response.data.results); // Assuming the API returns a `results` array
      } catch (err) {
        console.error('Error fetching courses:', err);

        // Log the error response for debugging
        if (err.response) {
          console.error('Response error:', err.response.data);
          if (err.response.status === 401) {
            setError('Unauthorized. Please log in again.');
          } else if (err.response.status === 403) {
            setError('You do not have permission to view courses.');
          } else if (err.response.status === 404) {
            setError('Courses endpoint not found.');
          } else {
            setError('Failed to fetch courses. Please try again later.');
          }
        } else {
          setError('Network error. Please check your connection.');
        }
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  // Fetch audit logs on component mount
  useEffect(() => {
    const fetchAuditLogs = async () => {
      setLoading(true);
      setError('');
      try {
        // Manually provide the token here
        const token = 'your_access_token_here'; // Replace with your actual access token

        console.log('Fetching audit logs with token:', token); // Debugging

        const response = await axios.get(
          'https://kennedymutebi7.pythonanywhere.com/issues/api/audit-logs/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Audit logs fetched successfully:', response.data); // Debugging
        setAuditLogs(response.data.results); // Assuming the API returns a `results` array
      } catch (err) {
        console.error('Error fetching audit logs:', err);

        // Log the error response for debugging
        if (err.response) {
          console.error('Response error:', err.response.data);
          if (err.response.status === 401) {
            setError('Unauthorized. Please log in again.');
          } else if (err.response.status === 403) {
            setError('You do not have permission to view audit logs.');
          } else if (err.response.status === 404) {
            setError('Audit logs endpoint not found.');
          } else {
            setError('Failed to fetch audit logs. Please try again later.');
          }
        } else {
          setError('Network error. Please check your connection.');
        }
      }
      setLoading(false);
    };

    fetchAuditLogs();
  }, []);

  // Handle course creation
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const payload = {
        course_code: newCourse.course_code,
        course_name: newCourse.course_name,
        description: newCourse.description,
      };

      console.log('Sending request to /api/courses/');
      console.log('Token:', token);
      console.log('Payload:', payload);

      const response = await axios.post(
        'https://kennedymutebi7.pythonanywhere.com/api/courses/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Course created successfully:', response.data);
      setCourses([...courses, response.data]); // Add the new course to the list
      setShowModal(false); // Close the modal
      setNewCourse({ course_code: '', course_name: '', description: '' }); // Reset the form
    } catch (err) {
      console.error('Error creating course:', err);

      if (err.response) {
        console.error('Response error:', err.response.data);
        if (err.response.status === 404) {
          setError('Courses endpoint not found.');
        } else {
          setError('Failed to create course. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="registrar-dashboard-container">
      <RegistrarSidebar />
      <div className="registrar-dashboard-content">
        <div className="registrar-dashboard-header">
          <img src="/images/registrarlogo.png" alt="registrarlogo" />
          <h2 className="registrar-dashboard-title">Registrar Dashboard</h2>
          <p className="registrar-dashboard-subtitle">
            Welcome! Manage student records and administrative tasks.
          </p>
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
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <ul>
                {courses.map((course) => (
                  <li key={course.id}>
                    {course.name} - {course.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Display Audit Logs */}
          <div className="registrar-dashboard-section">
            <h3>Audit Logs</h3>
            {loading ? (
              <p>Loading audit logs...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <ul>
                {auditLogs.map((log) => (
                  <li key={log.id}>
                    <strong>Action:</strong> {log.action} <br />
                    <strong>User:</strong> {log.user_name} <br />
                    <strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()} <br />
                    <strong>Details:</strong> {log.old_value} → {log.new_value}
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
            <form onSubmit={handleCreateCourse}>
              <label>
                Course Code:
                <input
                  type="text"
                  value={newCourse.course_code}
                  onChange={(e) => setNewCourse({ ...newCourse, course_code: e.target.value })}
                  required
                />
              </label>
              <label>
                Course Name:
                <input
                  type="text"
                  value={newCourse.course_name}
                  onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
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