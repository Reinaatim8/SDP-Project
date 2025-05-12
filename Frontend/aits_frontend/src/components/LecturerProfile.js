import React, { useEffect, useState } from 'react';
import './ProfileAdmin.css'; //for styling
import LecturerHoverBar from '../components/LecturerHoverBar'; 
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import './LecturerProfile.css'; // Import your CSS file


const LecturerProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="profile-page">
      <div style={{marginLeft:"8%",marginBottom:"10%"}}>
      <LecturerHoverBar />
      </div>
    <div className="profile-container">
     
      {userData ? (
        <div className="profile-card">
          <div className="profile-header">
            <img style={{width:'450px', paddingLeft:'150px' }}src="/images/AITSLOGO.png" alt="Profile Logo" className="profile-logo" />
            </div>
          <h2 style={{textAlign: "center", textDecoration: "underline darkgreen", fontWeight: "600",marginLeft:'50px'}}>MY PROFILE</h2>
          <div className="profile-icon">
            <FaUserCircle size={100} color="#2c3e50"  />
          </div>

          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>User Type:</strong> {userData.user_type}</p>
          {userData.program && <p><strong>Program:</strong> {userData.program}</p>}
          {userData.year_of_study && <p><strong>Year of Study:</strong> {userData.year_of_study}</p>}
          {userData.student_id && <p><strong>Student ID:</strong> {userData.student_id}</p>}
          {userData.staff_id && <p><strong>Staff ID:</strong> {userData.staff_id}</p>}
          {userData.department && <p><strong>Department:</strong> {userData.department}</p>}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
    </div>
  );
};

export default LecturerProfile;