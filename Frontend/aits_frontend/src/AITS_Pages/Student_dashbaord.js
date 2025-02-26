import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import "./Student_dashboard.css";

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <span className="logo">@ AITS student dashboard</span>
        <nav>
            <Link to="/Student_dashboard"><AiFillHome className="icon" /> Home</Link>
            <Link to="/messages"><BiMessageDetail className="icon" /> Messages</Link>
            <Link to="/settings"><FiSettings className="icon" /> Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <span className="notifications">
            <IoMdNotifications className="icon" /> <sup>2</sup>
          </span>
          <span className="profile">
            <FaUserCircle className="icon" /> @username (student)
          </span>
        </header>

        {/* Welcome Card */}
        <div className="welcome_card ">
        <div>
        <h2>Welcome back, Student!</h2>
        <p>We're glad to have you here.</p>
        </div>
        <FaUserGraduate className="icon"/>
        </div>

        {/* Dashboard Buttons */}
        <div className="dashboard-buttons">
          <button className="btn">🔄 Track progress of Issue</button>
          <button className="btn">📎 Pending supportive documents</button>
          <button className="btn">✅ Resolved Issues</button>
        </div>

        {/* Submit New Issue */}
        <div className="submit-section">
          <h2>SUBMIT A NEW ISSUE</h2>
          <Link to="/student/submit-issue">
            <button className="btn">Submit a New Issue</button>
          </Link>
        </div>

        {/* Recent Issues Table */}
        <div className="issues-table">
          <h3>Recent Issues Submitted</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Issue Submit Date</th>
                <th>Student Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>19 May, 2021 : 10:10 AM</td>
                <td>251-661-5362</td>
                <td>-----</td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>18 May, 2021 : 3:12 PM</td>
                <td>171-534-1262</td>
                <td>-----</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
