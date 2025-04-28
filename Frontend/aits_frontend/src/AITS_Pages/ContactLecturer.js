import React, { useEffect, useState } from 'react';
import './ContactLecturer.css';

// Importing axios for API calls
const ContactLecturer = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/lecturers');
        setLecturers(response.data);
      } catch (err) {
        setError('Failed to load lecturer information.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="contact-lecturer-container">
      <h1>Contact a Lecturer</h1>
      <div className="lecturer-list">
        {lecturers.map((lecturer) => (
          <div key={lecturer.id} className="lecturer-card">
            <h2>{lecturer.name}</h2>
            <p>Email: {lecturer.email}</p>
            <p>Phone: {lecturer.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactLecturer;