import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrarSidebar from '../components/RegistrarSidebar';
import './RegistrarDashboard.css';

const RegistrarDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newEnrollment, setNewEnrollment] = useState({
    student: '',
    course: '',
    semester: '',
    academic_year: '',
    current_grade: ''
  });

  const fetchEnrollments = async () => {
    setLoading(true);
    setError('');

    try {
      let accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await axios.get(
        'https://kennedymutebi7.pythonanywhere.com/issues/api/enrollments/',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data && response.data.results) {
        setEnrollments(response.data.results);
      } else {
        setEnrollments([]);
      }
    } catch (err) {
      console.error('Error fetching enrollments:', err);

      if (err.response && err.response.status === 401) {
        await refreshAccessToken();
        fetchEnrollments();
      } else {
        setError('Failed to fetch enrollments. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      throw new Error('No refresh token found. Please log in again.');
    }

    try {
      const response = await axios.post(
        'https://kennedymutebi7.pythonanywhere.com/auth/refresh',
        { refresh: refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
      } else {
        throw new Error('No access token in refresh response.');
      }
    } catch (err) {
      console.error('Error refreshing access token:', err);
      setError('Failed to refresh access token. Please log in again.');
    }
  };

  const addEnrollment = async () => {
    setLoading(true);
    setError('');

    try {
      let accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await axios.post(
        'https://kennedymutebi7.pythonanywhere.com/issues/api/enrollments/',
        newEnrollment,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) {
        setEnrollments([...enrollments, response.data]);
        setNewEnrollment({
          student: '',
          course: '',
          semester: '',
          academic_year: '',
          current_grade: ''
        });
      }
    } catch (err) {
      console.error('Error adding enrollment:', err);
      setError('Failed to add enrollment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleRefreshEnrollments = () => {
    fetchEnrollments();
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
          <div className="registrar-dashboard-section">
            <div className="section-header">
              <h3>Enrollments</h3>
              <button
                onClick={handleRefreshEnrollments}
                className="refresh-button"
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            {loading ? (
              <p>Loading enrollments...</p>
            ) : error ? (
              <div>
                <p style={{ color: 'red' }}>{error}</p>
                <button
                  onClick={handleRefreshEnrollments}
                  className="retry-button"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <ul className="enrollments-list">
                {enrollments.map((enrollment) => (
                  <li key={enrollment.id} className="enrollment-item">
                    <strong>Student:</strong> {enrollment.student_name || `Student ID: ${enrollment.student}`} <br />
                    <strong>Course:</strong> {enrollment.course_name} ({enrollment.course_code}) <br />
                    <strong>Semester:</strong> {enrollment.semester} <br />
                    <strong>Academic Year:</strong> {enrollment.academic_year} <br />
                    <strong>Current Grade:</strong> {enrollment.current_grade}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="registrar-dashboard-section">
            <h3>Add New Enrollment</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addEnrollment();
              }}
            >
              <input
                type="text"
                placeholder="Student ID"
                value={newEnrollment.student}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, student: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Course Code"
                value={newEnrollment.course}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, course: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Semester"
                value={newEnrollment.semester}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, semester: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Academic Year"
                value={newEnrollment.academic_year}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, academic_year: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Current Grade"
                value={newEnrollment.current_grade}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, current_grade: e.target.value })}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Enrollment'}
              </button>
            </form>
          </div>

          <div className="registrar-dashboard-section registrar-dashboard-student-management">
            <div className="registrar-dashboard-section-content">
              <h3 className="registrar-dashboard-section-heading">Student Management 👩‍🎓</h3>
              <p className="registrar-dashboard-section-text">View and manage student records, enrollments, and academic performance.</p>
              <button className="registrar-dashboard-btn registrar-dashboard-btn-primary">View Students</button>
            </div>
            <div className="registrar-dashboard-section-image">
              <img src="/images/student.gif" alt="Student Management" className="gif" />
            </div>
          </div>
        </div>
      </div>

      <footer className="registrar-dashboard-footer">
        <p>&copy; 2025 AITS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RegistrarDashboard;
