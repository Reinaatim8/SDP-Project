import React from 'react';
import RegistrarSidebar from '../components/RegistrarSidebar';
import './RegistrarDashboard.css';

const RegistrarDashboard = () => {
  return (
    <div className="registrar-dashboard-container">
      <RegistrarSidebar />
      <div className="registrar-dashboard-content">
        <div className="dashboard-header">
        <img src='/images/registrarlogo.png' alt='registrarlogo'/ >
          <h2>Registrar Dashboard</h2>
          <p className="subtitle">Welcome! Manage student records and administrative tasks.</p>
        </div>
        <div className="dashboard-sections">
          <div className="section student-management">
            <div className="section-content">
              <h3>Student Management 👩‍🎓</h3>
              <p>View and manage student records, enrollments, and academic performance.</p>
              <button className="btn btn-primary">View Students</button>
            </div>
            <div className="section-image">
              <img src="/images/students.jpg" alt="Student Management" />
            </div>
          </div>
          <div className="section course-management">
            <div className="section-content">
              <h3>Course Management 🏢</h3>
              <p>Oversee course offerings, enrollments, and schedules.</p>
              <button className="btn btn-primary">Manage Courses</button>
            </div>
            <div className="section-image">
              <img src="/images/courses.jpg" alt="Course Management" />
            </div>
          </div>
          <div className="section reports" id='reports-section'>
            <div className="reports-content">
              <h3>Reports & Analytics 📊</h3>
              <p>Generate and view reports on student performance and enrollment statistics.</p>
              <button className="btn btn-primary">View Reports</button>
            </div>
            <div className="reports-image">
              <img src="/images/analytics.jpg" alt="Reports and Analytics" />
            </div>
          </div>
          <div className="section notifications">
            <div className="section-content">
              <h3>Notifications 🔔</h3>
              <p>Stay updated with important alerts and reminders.</p>
              <button className="btn btn-primary">View Notifications</button>
            </div>
            <div className="section-image">
              <img src="/images/notifications.jpg" alt="Notifications" />
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2025 AITS. All rights reserved.</p>
      </footer>
    </div>

  );
};

export default RegistrarDashboard;