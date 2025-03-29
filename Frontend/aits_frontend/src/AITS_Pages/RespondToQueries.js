import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Modal library
import Select from "react-select"; // Dropdown library
import { FaSearch, FaReply, FaFilter } from "react-icons/fa"; // Icons
import "./RespondToQueries.css";

Modal.setAppElement("#root"); // Set the root element for accessibility

const RespondToQueries = () => {
  const [queries, setQueries] = useState([]); // State for student queries
  const [filteredQueries, setFilteredQueries] = useState([]); // State for filtered queries
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filterStatus, setFilterStatus] = useState(null); // State for filter dropdown
  const [selectedQuery, setSelectedQuery] = useState(null); // State for the selected query
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [response, setResponse] = useState(""); // State for the response input

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

  const handleOpenModal = (query) => {
    setSelectedQuery(query);
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
    <div className="respond-to-queries-container">
      <h1 className="respond-to-queries-title">Respond to Students' Queries</h1>
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
                  onClick={() => handleOpenModal(query)}
                >
                  <FaReply /> Respond
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for responding to a query */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="query-modal"
        overlayClassName="query-modal-overlay"
      >
        <h2>Respond to Query</h2>
        {selectedQuery && (
          <div className="query-details">
            <p><strong>Student:</strong> {selectedQuery.student}</p>
            <p><strong>Query:</strong> {selectedQuery.query}</p>
          </div>
        )}
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
      </Modal>
    </div>
  );
};

export default RespondToQueries;