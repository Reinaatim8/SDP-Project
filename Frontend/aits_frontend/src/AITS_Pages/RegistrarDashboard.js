import React from 'react';
import RegistrarSidebar from '../components/RegistrarSidebar';
import './RegistrarDashboard.css';

const RegistrarDashboard = () => {
  return (
    <div className="registrar-dashboard-container">
      <RegistrarSidebar />
      <div className="registrar-dashboard-content">
        <div className="dashboard-header">
          <h2>Registrar Dashboard</h2>
          <p className="subtitle">Welcome! Manage student records and administrative tasks.</p>
        </div>
        <div className="dashboard-sections">
          <div className="section student-management">
            <h3>Student Management</h3>
            <p>View and manage student records, enrollments, and academic performance.</p>
            <button className="btn btn-primary">View Students</button>
          </div>
          <div className="section course-management">
            <h3>Course Management</h3>
            <p>Oversee course offerings, enrollments, and schedules.</p>
            <button className="btn btn-primary">Manage Courses</button>
          </div>
          <div className="section reports">
            <h3>Reports & Analytics</h3>
            <p>Generate and view reports on student performance and enrollment statistics.</p>
            <button className="btn btn-primary">View Reports</button>
          </div>
          <div className="section notifications">
            <h3>Notifications</h3>
            <p>Stay updated with important alerts and reminders.</p>
            <button className="btn btn-primary">View Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarDashboard;
