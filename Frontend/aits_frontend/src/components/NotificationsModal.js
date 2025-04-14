import React from 'react';

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
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ marginBottom: "20px", color: "#0a2463" }}>Notifications</h3>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} style={{
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
              {notification.message}
            </div>
          ))
        ) : (
          <p style={{ color: "#6c757d" }}>No notifications available.</p>
        )}
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