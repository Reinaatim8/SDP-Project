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
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ marginBottom: "20px", color: "#0a2463" }}>Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} style={{
            padding: "10px 15px",
            marginBottom: "10px",
            borderRadius: "5px",
            backgroundColor: notification.type === "success" ? "#d4edda" :
                             notification.type === "info" ? "#d1ecf1" :
                             notification.type === "warning" ? "#fff3cd" : "#f8d7da",
            color: notification.type === "success" ? "#155724" :
                   notification.type === "info" ? "#0c5460" :
                   notification.type === "warning" ? "#856404" : "#721c24",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            {notification.message}
          </div>
        ))
      ) : (
        <p style={{ color: "#6c757d" }}>No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationsPage;