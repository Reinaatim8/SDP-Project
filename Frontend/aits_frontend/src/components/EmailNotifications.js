import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EMAIL_API_BASE = "https://Kaja732.pythonanywhere.com";

const EmailNotifications = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(`${EMAIL_API_BASE}/unread/`, {
        headers: {
          Authorization: `Token b115503772a123e732f6a187823d6e5b242fdd36`
        }
      });
      console.log("Unread email notifications:", response.data);
      setEmails(response.data); // assumes it's an array
    } catch (error) {
      console.error("Failed to fetch email notifications:", error);
      toast.error("Failed to load email notifications.");
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    try {
      await axios.post(`${EMAIL_API_BASE}/mark-all-read/`, {
        headers: {
          Authorization: `Token b115503772a123e732f6a187823d6e5b242fdd36`
        }
      });
      toast.success("Marked all emails as read!");
      fetchEmails(); // Refresh the list
    } catch (error) {
      console.error("Failed to mark emails as read:", error);
      toast.error("Failed to mark emails as read.");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginTop: "1.5rem",
        maxWidth: "500px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>📨 Unread Email Notifications</h3>

      {loading ? (
        <p>Loading...</p>
      ) : emails.length === 0 ? (
        <p>No unread emails 📭</p>
      ) : (
        <>
          <ul style={{ paddingLeft: "1rem" }}>
            {emails.map((email, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {email.message || "New email notification"}
              </li>
            ))}
          </ul>
          <button
            onClick={markAllRead}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "#f0a500",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ✅ Mark All as Read
          </button>
        </>
      )}
    </div>
  );
};

export default EmailNotifications;
