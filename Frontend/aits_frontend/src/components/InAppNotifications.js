import React, { useEffect, useState } from "react";
import apiClient from "../utils/axiosInstance";
import { toast } from "react-toastify";
import "./InAppNotifications.css"; // styling

const InAppNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await apiClient.get(
        "https://kennedymutebi7.pythonanywhere.com/issues/api/notifications/"
      );
      setNotifications(response.data.results);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      toast.error("Could not load notifications");
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notification-container">
      <div className="notification-icon" onClick={toggleDropdown}>
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>

      {dropdownOpen && (
        <div className="notification-dropdown">
          <h4>Notifications</h4>
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            <ul>
              {notifications.map((note) => (
                <li key={note.id} className={note.read ? "read" : "unread"}>
                  {note.message || "New notification"}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default InAppNotifications;
