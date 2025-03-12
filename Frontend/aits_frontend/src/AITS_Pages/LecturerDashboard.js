import React from "react";
import "./LecturerDashboard.css";
import { FaHome, FaEnvelope, FaCalendar, FaCog, FaBell, FaUser } from "react-icons/fa";

const LecturerDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
      {/*{!isMinimized && <h2>AITS</h2>}
      <button className="minimize-btn" onClick={toggleMinimize}>
          {isMinimized ? '➜' : '⬅'}
        </button>*/}
        <button type="button" className="minimize-btn">⬅</button>
        <div className="logo">Lecturer Portal</div>
        <nav className="nav-menu">
          <a href="#" className="active"><FaHome /> Home</a>
          <a href="#"><FaEnvelope /> Messages</a>
          <a href="#"><FaCalendar /> Calendar</a>
          <a href="#"><FaCog /> Settings</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div className="notifications">
            <FaBell /><span className="notification-count">2</span>
          </div>
          <div className="profile">
            <FaUser /> <span>@username</span> <span className="role">Lecturer</span>
          </div>
        </header>
        <div className="lecturerPanel">

        <section className="issue-summary">
          <div className="issue-card assigned">All Assigned Issues -----</div>
          <div className="issue-card in-progress">In-Progress Issues -----</div>
          <div className="issue-card resolved">Resolved Issues -----</div>
        </section>

        <section className="recent-issues">
          <h2>Recent Student Issues</h2>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Issue Submit Date</th>
                <th>Student Number</th>
                <th>College</th>
                <th>Study Year</th>
                <th>Issue Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jerry Mattedi</td>
                <td>19 May, 2021 : 10:10 AM</td>
                <td>251-661-5362</td>
                <td>----</td>
                <td>----</td>
                <td><a href="#">Options</a> | <a href="#">Details</a></td>
              </tr>
              <tr>
                <td>Elianora Vasilov</td>
                <td>18 May, 2021 : 3:12 PM</td>
                <td>171-534-1262</td>
                <td>----</td>
                <td>----</td>
                <td><a href="#">Options</a> | <a href="#">Details</a></td>
              </tr>
              <tr>
                <td>Alvis Daen</td>
                <td>17 May, 2021 : 2:15 PM</td>
                <td>974-661-5110</td>
                <td>----</td>
                <td>----</td>
                <td><a href="#">Options</a> | <a href="#">Details</a></td>
              </tr>
              <tr>
                <td>Lissa Shipsey</td>
                <td>23 Apr, 2021 : 1:15 PM</td>
                <td>541-661-3042</td>
                <td>----</td>
                <td>----</td>
                <td><a href="#">Options</a> | <a href="#">Details</a></td>
              </tr>
            </tbody>
          </table>
        </section>
        </div>
      </main>
    </div>
  );
};

export default LecturerDashboard;

