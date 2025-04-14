import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

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
      borderRadius: "16px",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      fontFamily: "'Arial', sans-serif",
      animation: "fadeIn 0.5s ease-in-out"
    }}>
      <h2 style={{
        marginBottom: "20px",
        color: "#0a2463",
        fontSize: "28px",
        fontWeight: "bold",
        textAlign: "center",
        borderBottom: "2px solid #e5e5e5",
        paddingBottom: "10px",
        letterSpacing: "1px"
      }}>
        Notifications
      </h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} style={{
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "12px",
            backgroundColor: notification.type === "success" ? "#d4edda" :
                             notification.type === "info" ? "#d1ecf1" :
                             notification.type === "warning" ? "#fff3cd" : "#f8d7da",
            color: notification.type === "success" ? "#155724" :
                   notification.type === "info" ? "#0c5460" :
                   notification.type === "warning" ? "#856404" : "#721c24",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            animation: "slideIn 0.5s ease-in-out"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: notification.type === "success" ? "#28a745" :
                               notification.type === "info" ? "#17a2b8" :
                               notification.type === "warning" ? "#ffc107" : "#dc3545",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}>
              {notification.type === "success" && <FaCheckCircle color="white" size={20} />}
              {notification.type === "info" && <FaInfoCircle color="white" size={20} />}
              {notification.type === "warning" && <FaExclamationTriangle color="white" size={20} />}
              {notification.type === "error" && <FaTimesCircle color="white" size={20} />}
            </div>
            <span style={{
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "1.5",
              flex: 1
            }}>
              {notification.message}
            </span>
          </div>
        ))
      ) : (
        <p style={{
          color: "#6c757d",
          textAlign: "center",
          fontSize: "18px",
          fontStyle: "italic",
          animation: "fadeIn 0.5s ease-in-out"
        }}>
          No notifications available.
        </p>
      )}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

export default NotificationsPage;