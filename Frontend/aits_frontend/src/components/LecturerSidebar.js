import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Modal from "react-modal"; // Modal library
import Select from "react-select"; // Dropdown library
import { FaHome, FaUser, FaSignOutAlt, FaUsers, FaPhone, FaSearch, FaReply, FaFilter } from 'react-icons/fa'; // Import icons
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
              <a href="#profile" className="lecturer-sidebar-link">
                <FaUser className="lecturer-sidebar-icon" /> Your Profile
              </a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <a href="#" className="lecturer-sidebar-link">
                <FaPhone className="lecturer-sidebar-icon" /> Contact Us
              </a>
            </li>
            <li className="lecturer-sidebar-list-item">
              <button className="lecturer-sidebar-link lecturer-sidebar-logout-btn" id="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt className="lecturer-sidebar-icon" /> Logout
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
    </div>
  );
};

export default LecturerSidebar;