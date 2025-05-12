import React from 'react';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const NotificationsModal = ({ notifications, onClose }) => {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        maxHeight: "70vh", // Limit height
        overflowY: "auto", // Enable scrolling
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        position: "relative"
      }}>
        {/* Close Icon */}
        <button onClick={onClose} style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          color: "#6c757d"
        }}>
          &times;
        </button>

        <h3 style={{ marginBottom: "20px", color: "#0a2463" }}>Notifications</h3>

        {/* Mark All as Read Button */}
        {notifications.length > 0 && (
          <button onClick={() => console.log("Mark all as read")} style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            Mark All as Read
          </button>
        )}

        {/* Notifications List */}
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: notification.type === "success" ? "#d4edda" :
                               notification.type === "info" ? "#d1ecf1" :
                               notification.type === "warning" ? "#fff3cd" : "#f8d7da",
              color: notification.type === "success" ? "#155724" :
                     notification.type === "info" ? "#0c5460" :
                     notification.type === "warning" ? "#856404" : "#721c24"
            }}>
              {notification.type === "success" && <FaCheckCircle color="#28a745" />}
              {notification.type === "info" && <FaInfoCircle color="#17a2b8" />}
              {notification.type === "warning" && <FaExclamationTriangle color="#ffc107" />}
              {notification.type === "error" && <FaTimesCircle color="#dc3545" />}
              <span>{notification.message}</span>
            </div>
          ))
        ) : (
          <p style={{ color: "#6c757d", textAlign: "center" }}>No notifications available.</p>
        )}

        {/* Close Button */}
        <button onClick={onClose} style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#0a2463",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationsModal;