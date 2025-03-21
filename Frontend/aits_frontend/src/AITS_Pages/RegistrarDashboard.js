import React from 'react';
import RegistrarSidebar from '../components/RegistrarSidebar';
import './RegistrarDashboard.css';

const RegistrarDashboard = () => {
  return (
    <div className="registrar-dashboard-container">
      <RegistrarSidebar />
      <div className="registrar-dashboard-content">
        <div className="registrar-dashboard-header">
        <img src='/images/registrarlogo.png' alt="registrarlogo"/ >
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
              <img src="/images/student.gif" alt="Student Management" />
            </div>
          </div>
          <div className="registrar-dashboard-section registrar-dashboard-course-management">
            <div className="registrar-dashboard-section-content" >
              <h3 className="registrar-dashboard-section-heading">Course Management 🏢</h3>
              <p className="registrar-dashboard-section-text">Oversee course offerings, enrollments, and schedules.</p>
              <button className="registrar-dashboard-btn registrar-dashboard-btn-primary">Manage Courses</button>
            </div>
            <div className="registrar-dashboard-section-image">
              <img src="/images/courses.gif" alt="Course Management" />
            </div>
          </div>
          <div className="registrar-dashboard-section registrar-dashboard-reports" id='reports-section'>
            <div className="registrar-dashboard-reports-content">
              <h3 className="registrar-dashboard-section-heading">Reports & Analytics 📊</h3>
              <p className="registrar-dashboard-section-text">Generate and view reports on student performance and enrollment statistics.</p>
              <button className="registrar-dashboard-btn registrar-dashboard-btn-primary">View Reports</button>
            </div>
            <div className="registrar-dashboard-reports-image">
              <img src="/images/statistics.gif" alt="Reports and Analytics" />
            </div>
          </div>
          <div className="registrar-dashboard-section registrar-dashboard-notifications">
            <div className="registrar-dashboard-section-content">
              <h3 className="registrar-dashboard-section-heading">Notifications 🔔</h3>
              <p className="registrar-dashboard-section-text">Stay updated with important alerts and reminders.</p>
              <button className="registrar-dashboard-btn registrar-dashboard-btn-primary">View Notifications</button>
            </div>
            <div className="registrar-dashboard-section-image">
              <img src="/images/notifications.gif" alt="Notifications" />
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