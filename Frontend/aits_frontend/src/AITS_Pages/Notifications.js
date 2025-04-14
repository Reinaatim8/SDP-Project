import React, { useEffect, useState } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetching notifications from an API
    const fetchNotifications = async () => {
      const mockNotifications = [
        { id: 1, message: "Your profile has been updated.", type: "success" },
        { id: 2, message: "New course materials are available.", type: "info" },
        { id: 3, message: "Your password will expire soon.", type: "warning" },
      ];
      setNotifications(mockNotifications);
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{
      padding: "20px",
      maxWidth: "600px",
      margin: "40px auto",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      fontFamily: "'Arial', sans-serif"
    }}>
      <h2 style={{
        marginBottom: "20px",
        color: "#0a2463",
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center",
        borderBottom: "2px solid #e5e5e5",
        paddingBottom: "10px"
      }}>
        Notifications
      </h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} style={{
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            backgroundColor: notification.type === "success" ? "#d4edda" :
                             notification.type === "info" ? "#d1ecf1" :
                             notification.type === "warning" ? "#fff3cd" : "#f8d7da",
            color: notification.type === "success" ? "#155724" :
                   notification.type === "info" ? "#0c5460" :
                   notification.type === "warning" ? "#856404" : "#721c24",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <div style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: notification.type === "success" ? "#28a745" :
                               notification.type === "info" ? "#17a2b8" :
                               notification.type === "warning" ? "#ffc107" : "#dc3545",
              flexShrink: 0
            }}></div>
            <span style={{
              fontSize: "16px",
              fontWeight: "500"
            }}>
              {notification.message}
            </span>
          </div>
        ))
      ) : (
        <p style={{
          color: "#6c757d",
          textAlign: "center",
          fontSize: "16px",
          fontStyle: "italic"
        }}>
          No notifications available.
        </p>
      )}
    </div>
  );
};

export default NotificationsPage;