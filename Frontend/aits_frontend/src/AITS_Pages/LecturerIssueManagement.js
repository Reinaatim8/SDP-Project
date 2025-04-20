import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaComments, FaEdit } from "react-icons/fa";
import axios from "axios";
import LecturerHoverBar from "../components/LecturerHoverBar";
import { StatusBadge } from "../components/StatusBadge";
import { PriorityBadge } from "../components/PriorityBadge";
import { formatDate } from "../utils/formatters";
import ConfirmationDialog from "../components/ConfirmationDialog";

const API_BASE_URL = "https://kennedymutebi7.pythonanywhere.com";
const API_URL = `${API_BASE_URL}/issues/api/issues/`;
const COMMENTS_URL = `${API_BASE_URL}/issues/api/comments/`;

const LecturerIssueManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user found
      navigate('/login');
      return;
    }
    
    fetchIssues();
  }, [navigate]);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      
      // Filter issues related to this lecturer
      const lecturerIssues = response.data.results.filter(
        issue => issue.lecturer === user?.id
      );
      
      setIssues(lecturerIssues);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch issues. Please try again later.");
      setLoading(false);
      console.error("Error fetching issues:", err);
      
      if (err.response && err.response.status === 401) {
        navigate('/login');
      }
    }