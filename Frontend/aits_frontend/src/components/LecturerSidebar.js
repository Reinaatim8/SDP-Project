import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Modal from "react-modal"; // Modal library
import Select from "react-select"; // Dropdown library
import { FaHome, FaUser, FaSignOutAlt, FaUsers, FaPhone, FaSearch, FaReply, FaFilter } from 'react-icons/fa'; // Import icons
import axios from "axios"; // For API requests
import "./LecturerSidebar.css";

Modal.setAppElement("#root"); // Set the root element for accessibility

const LecturerSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [queries, setQueries] = useState([]); // State for student queries
  const [filteredQueries, setFilteredQueries] = useState([]); // State for filtered queries
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filterStatus, setFilterStatus] = useState(null); // State for filter dropdown
  const [response, setResponse] = useState(""); // State for the response input
  const [selectedQuery, setSelectedQuery] = useState(null); // State for the selected query
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // State for profile modal visibility
  const [user, setUser] = useState(null); // State for user details
  const [editedUser, setEditedUser] = useState(null); // State for editing user details
  const [error, setError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const navigate = useNavigate();

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleLogout(); // Log out when the timer reaches zero
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);

  useEffect(() => {
    // Simulate fetching queries from an API
    const fetchQueries = async () => {
      const mockQueries = [
        { id: 1, student: "John Doe", query: "What is the deadline for the assignment?", status: "Pending" },
        { id: 2, student: "Jane Smith", query: "Can I get extra time for the project?", status: "Resolved" },
        { id: 3, student: "Alice Johnson", query: "How do I access the course materials?", status: "Pending" },
        { id: 4, student: "Bob Brown", query: "Can you clarify the grading criteria?", status: "Pending" },
      ];
      setQueries(mockQueries);
      setFilteredQueries(mockQueries);
    };

    fetchQueries();
  }, []);

  useEffect(() => {
    // Load user details from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditedUser(parsedUser);
    }
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = queries.filter(
      (query) =>
        query.student.toLowerCase().includes(value) ||
        query.query.toLowerCase().includes(value)
    );
    setFilteredQueries(filtered);
  };

  const handleFilterChange = (selectedOption) => {
    setFilterStatus(selectedOption);
    if (selectedOption) {
      const filtered = queries.filter((query) => query.status === selectedOption.value);
      setFilteredQueries(filtered);
    } else {
      setFilteredQueries(queries);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setResponse("");
  };

  const handleSendResponse = () => {
    if (response.trim() === "") return;
    // Simulate sending a response
    console.log(`Response to Query ID ${selectedQuery.id}: ${response}`);
    handleCloseModal();
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    setError("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // Use the signup API to "update" the user profile
      const endpoint = `https://kennedymutebi.pythonanywhere.com/auth/register/${editedUser.user_type}`;
      const dataToSend = {
        full_name: editedUser.full_name,
        user: {
          username: editedUser.username,
          password: editedUser.password || "", // Ensure password is included (even if empty)
          email: editedUser.email,
          user_type: editedUser.user_type,
          department: editedUser.department || null, // Optional fields should be null if not provided
        },
        staff_id: editedUser.staff_id || null,
        student_id: editedUser.student_id || null,
        program: editedUser.program || null,
        year_of_study: editedUser.year_of_study || null,
      };

      console.log("Data being sent to API:", dataToSend);

      const response = await axios.post(endpoint, dataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      // Update the user state and localStorage with the new details
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        setIsProfileModalOpen(false); // Close the modal after a delay
      }, 2000);
    } catch (err) {
      console.error("Error updating profile:", err);
      console.error("Error response:", err.response?.data); // Log the error details
      setError(
        err.response?.data?.message || "Failed to update profile. Please try again."
      );
    }
  };

  const filterOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Resolved", label: "Resolved" },
  ];

  return (
    <div className={`lecturer-sidebar ${isMinimized ? 'lecturer-sidebar-minimized' : ''}`}>
      <div className="lecturer-sidebar-header">
        {!isMinimized && <h2 className="lecturer-sidebar-title">LECTURER HUB</h2>}
        <button className="lecturer-sidebar-minimize-btn" onClick={toggleMinimize}>
          {isMinimized ? '🚦' : '🚥'}
        </button>
      </div>
      {!isMinimized && (
        <nav className="lecturer-sidebar-nav">
          <ul className="lecturer-sidebar-list">
            <li className="lecturer-sidebar-list-item">
              <Link to="/LecturerDashboard" className="lecturer-sidebar-link">
                <FaHome className="lecturer-sidebar-icon" /> Home
              </Link>
            </li>
            <li className="lecturer-sidebar-list-item">
              <a className="lecturer-sidebar-link" onClick={handleOpenModal}>
                <FaUsers className="lecturer-sidebar-icon" /> Respond to Students
              </a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <a className="lecturer-sidebar-link" onClick={handleOpenProfileModal}>
                <FaUser className="lecturer-sidebar-icon" /> Your Profile
              </a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <a href="/AboutPage" className="lecturer-sidebar-link">
                <FaPhone className="lecturer-sidebar-icon" /> Contact Us
              </a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <button className="lecturer-sidebar-link lecturer-sidebar-logout-btn" id="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt className="lecturer-sidebar-icon" />           Logout
              </button>
            </li>
            <li>
              <img src="/images/nobgmaklogo.png" className="lecturer-sidebar-schoollogo" alt="School Logo" />
            </li>
          </ul>
        </nav>
      )}
      {/* Modal for responding to queries */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="query-modal"
        id="query-modal"
        overlayClassName="query-modal-overlay"
      >
        <h2>Respond to Students' Issue's</h2>
        <div className="respond-to-queries-controls">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search queries..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <div className="filter-dropdown">
            <FaFilter className="filter-icon" />
            <Select
              options={filterOptions}
              isClearable
              placeholder="Filter by status"
              onChange={handleFilterChange}
              className="filter-select"
            />
          </div>
        </div>
        <table className="queries-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Query</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueries.map((query) => (
              <tr key={query.id}>
                <td>{query.id}</td>
                <td>{query.student}</td>
                <td>{query.query}</td>
                <td>{query.status}</td>
                <td>
                  <button
                    className="respond-button"
                    onClick={() => setSelectedQuery(query)}
                  >
                    <FaReply /> Respond
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedQuery && (
          <div className="query-details">
            <p><strong>Student:</strong> {selectedQuery.student}</p>
            <p><strong>Query:</strong> {selectedQuery.query}</p>
            <textarea
              placeholder="Type your response here..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="response-textarea"
            />
            <div className="modal-buttons">
              <button className="send-response-button" onClick={handleSendResponse}>
                Send Response
              </button>
              <button className="close-modal-button" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onRequestClose={handleCloseProfileModal}
        className="profile-modal"
        overlayClassName="profile-modal-overlay"
      >
        <h2>Edit Profile</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {editedUser && (
          <form>
            <label>
              Full Name:
              <input
                type="text"
                name="full_name"
                value={editedUser.full_name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Department:
              <input
                type="text"
                name="department"
                value={editedUser.department}
                onChange={handleInputChange}
              />
            </label>
          </form>
        )}
        <div className="modal-buttons">
          <button className="save-profile-button" onClick={handleSaveProfile}>
            Save Changes
          </button>
          <button className="close-modal-button" onClick={handleCloseProfileModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LecturerSidebar;