import React, { useEffect, useState } from 'react';
import './Profile.css'; //for styling

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="profile-container">
     
      {userData ? (
        <div className="profile-card">
          <h2 style={{textAlign: "center", textDecoration: "underline darkgreen", fontWeight: "800"}}>MY PROFILE</h2>
          <p><strong>First Name:</strong> {userData.first_name}</p>
          <p><strong>Last Name:</strong> {userData.last_name}</p>
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
  );
};

export default Profile;