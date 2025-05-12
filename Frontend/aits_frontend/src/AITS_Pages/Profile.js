import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEnvelope, FaIdCard, FaUserGraduate,  FaBuilding,  FaSave, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';
import StudentHoverBar from './StudentHoverBar.js'
import NotificationsModal from '../components/NotificationsModal';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "Your profile has been updated.", type: "success" },
    { id: 2, message: "New course materials are available.", type: "info" },
    { id: 3, message: "Your password will expire soon.", type: "warning" },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    department: '',
    program: '',
    profile_picture: ''

  });
    // Initialize form data when userData loads
    useEffect(() => {
      if (userData) {
        setFormData({
          username: userData.username || '',
          email: userData.email || '',
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          phone_number: userData.phone_number || '',
          department: userData.department || '',
          program: userData.program || '',
          profile_picture: userData.profile_picture || ''
        });
      }
    }, [userData]);


const updateProfile = async (updatedData ) => {
  try {
    const access = localStorage.getItem('access'); // if your API needs authentication
    console.log("Access Token:", access);

        // Validate required fields
        if (!formData.email || !formData.email.trim()) {
          toast.error('Email is required');
          return;
        }
        if (!formData.department || !formData.department.trim()) {
          toast.error('Department is required');
          return;
        }
     // Create URLSearchParams for form-data style submission
    const formDataPayload = new URLSearchParams();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataPayload.append(key, formData[key]);
      }
      if (file) {
        formDataPayload.append('profile_picture', file);
      }
    }
    console.log('Form data payload:', formDataPayload.toString());

    const response = await axios.patch('https://kennedymutebi7.pythonanywhere.com/auth/api/profile/', formDataPayload, {
      headers: {
        Authorization: `Token ${access}`, // include token if required
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Content-Type': 'multipart/form-data'
      }

    });
    console.log('Update response:', response.data);
    console.log('Sending payload:', formDataPayload);
    // Update the local state with the new data
    setUserData(response.data);
    toast.success('Profile updated successfully!');
    setEditMode(false);
    
    // Optionally update localStorage too
    localStorage.setItem('user', JSON.stringify(response.data));

  } catch (error) {
    console.error(error);
    toast.error('Failed to update profile.');
  }
};
const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};
const handleInputChange = (e) => {
  console.log('Before update:', formData.email); // Current value
  const { name, value } = e.target;
  console.log('Updating:', name, 'with:', value); // New value
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
console.log('Final form data before submit:', formData);


  // Simulated loading with animation
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    // Add artificial delay for loading animation
    setTimeout(() => {
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
      setLoading(false);
    }, 800);
  }, []);

  // Color theme
  const colors = {
    primary: "#0a2463",
    secondary: "#3e92cc",
    accent: "#f0a500",
    light: "#f8f9fa",
    dark: "#343a40",
    success: "#28a745",
    gradient: "linear-gradient(135deg, #0a2463 0%, #3e92cc 100%)"
  };

  // Animation keyframes simulation using inline styles
  const pulseAnimation = {
    animation: "pulse 1.5s infinite ease-in-out",
    animationName: "pulse"
  };

  // Info card component
  const InfoCard = ({ icon, title, value,name,editable = false }) => {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        marginBottom: "12px",
        backgroundColor: colors.light,
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
        border: `1px solid rgba(0,0,0,0.05)`,
        overflow: "hidden",
        position: "relative"
      }}

      >
        <div style={{
          backgroundColor: colors.secondary,
          padding: "12px",
          borderRadius: "50%",
          marginRight: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}>
          {icon}
        </div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: "14px", color: colors.dark, opacity: 0.7, marginBottom: "4px" }}>{title} 
          {(name === 'email' || name === 'department') && (
            <span style={{ color: colors.accent, marginLeft: "4px" }}>*</span>
          )}

          </div>
          {editMode && editable ? (
            // Editable input field
            
            <input
             type={
                 name === 'profile_picture' ? 'file' :
                 name === 'email' ? 'email' :
                  'text'
             }
              name={name}
              value={name === 'profile_picture' ? undefined : value} 
              onChange={name === 'profile_picture' ? handleFileChange : handleInputChange}
              required={name === 'email' || name === 'department'}
              style={{
                fontSize: "16px",
                fontWeight: "600",
                border: `1px solid ${colors.secondary}`,
                borderRadius: "4px",
                padding: "4px 8px",
                width: "100%",
                backgroundColor: "white"
              }}
            />

          ) : (
          <div style={{ fontSize: "16px", fontWeight: "600", color: colors.dark }}>{value || "Not provided"}
          </div>
          )}
        </div>
      </div>
    );
  };

  // Tab Button component
  const TabButton = ({ id, label, active }) => (
    <button 
      onClick={() => setActiveTab(id)}
      style={{
        padding: "12px 20px",
        backgroundColor: active ? colors.primary : "transparent",
        color: active ? "white" : colors.dark,
        border: "none",
        borderRadius: active ? "12px" : "8px",
        cursor: "pointer",
        fontWeight: active ? "600" : "500",
        transition: "all 0.3s ease",
        margin: "0 8px",
        boxShadow: active ? "0 4px 8px rgba(10, 36, 99, 0.3)" : "none",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {active && (
        <div style={{
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none"
        }} />
      )}
      {label}
    </button>
  );

  // Loading skeleton component
  const Skeleton = () => (
    <div style={{ padding: "20px" }}>
      <div style={{ 
        height: "100px", 
        width: "100px", 
        borderRadius: "50%", 
        backgroundColor: "#e9ecef", 
        margin: "0 auto 20px",
        ...pulseAnimation
      }}></div>
      {[1,2,3,4].map(i => (
        <div key={i} style={{ 
          height: "20px", 
          backgroundColor: "#e9ecef", 
          borderRadius: "4px", 
          marginBottom: "12px",
          width: i % 2 === 0 ? "80%" : "90%",
          ...pulseAnimation
        }}></div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
          padding: "40px"
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            width: "500px",
            overflow: "hidden"
          }}>
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "url(/images/studentwallpaper.jpg) no-repeat center center / cover" ,// Fixed background image
      marginBottom: "",
    }}>
      <div style={{marginLeft:"8%",marginBottom:"10%"}}>
      <StudentHoverBar />
      </div>
      <div style={{
        flexGrow: 1,
        // backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional overlay for better readability
        padding: "40px",
        overflowY: "auto",
        marginLeft:"6%",
      }}>
        {userData ? (
          <div style={{
            marginLeft:"0",
            maxWidth: "1000px",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            overflow: "hidden",
            animation: "fadeIn 0.6s ease-out forwards"
          }}>
            {/* Profile Header */}
            <div style={{
              background: colors.gradient,
              padding: "40px 20px",
              textAlign: "center",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"rgba(255,255,255,0.1)\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
                opacity: 0.3
              }}></div>
            
              <img 
                src="/images/AITSLOGO.png" 
                alt="profile logo" 
                style={{
                  width: "180px",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                }} 
              />
              
              <div style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                background: "white",
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                border: `4px solid ${colors.accent}`,
                position: "relative",
                overflow: "hidden"
              }}>
                <FaUserCircle size={100} color={colors.accent} />
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(45deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 60%)",
                  backgroundSize: "200% 200%",
                  animation: "shineEffect 3s infinite linear"
                }}></div>
              </div>
              
              <h1 style={{
                margin: "0",
                color: "white",
                fontSize: "28px",
                fontWeight: "700",
                textShadow: "0 2px 4px rgba(0,0,0,0.2)"
              }}>
                {userData.username}
              </h1>
              
              <div style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "8px"
              }}>
                {userData.user_type}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px 0",
              borderBottom: "1px solid rgba(0,0,0,0.1)"
            }}>
              <TabButton id="personal" label="Personal Info" active={activeTab === 'personal'} />
              <TabButton id="academic" label="Academic Info" active={activeTab === 'academic'} />
  
            </div>

            {/* Content Area */}
            <div style={{ padding: "30px" }}>
              {activeTab === 'personal' && (
                <div style={{
                  animation: "fadeIn 0.4s ease-out forwards"
                }}>
                  <h2 style={{
                    fontSize: "20px",
                    color: colors.dark,
                    marginBottom: "20px",
                    fontWeight: "600",
                    position: "relative",
                    paddingBottom: "10px"
                  }}>
                    Personal Information
                    <span style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "40px",
                      height: "3px",
                      background: colors.accent,
                      borderRadius: "2px"
                    }}></span>
                
                  </h2>
                  
                  <InfoCard 
                    icon={<FaUserCircle size={20} />} 
                    title="Username" 
                    value={formData.username} 
                    name="username"
                    editable={true}
                  />
                  
                  <InfoCard 
                    icon={<FaEnvelope size={20} />} 
                    title="Email Address" 
                    value={formData.email} 
                    name="email"
                    editable={true}
                  />
                  
                  <InfoCard 
                    icon={<FaIdCard size={20} />} 
                    title="User Type" 
                    value={userData.user_type} 
                  />
                    <InfoCard 
                    icon={<FaIdCard size={20} />} 
                    title="First Name" 
                    value={formData.first_name}
                    name="first_name"
                    editable={true}
                  />
                  
                  <InfoCard 
                    icon={<FaIdCard size={20} />} 
                    title="Last Name" 
                    value={formData.last_name}
                    name="last_name"
                    editable={true}
                  />
                 <div className="form-field file-upload">
               <label htmlFor="profile_picture">
                <div className="upload-container">
                   <i className="upload-icon"><FaIdCard size={20} style={{color:"dark-blue"}} /></i>
                   <span style={{ display: "flex", alignItems: "center", gap: "8px", }}>Profile Picture</span>
                   </div>
                 </label>

                <input
                placeholder='Upload Profile Picture'
               id="profile_picture"
               name="profile_picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ fontSize: "16px",
                fontWeight: "500",
                border: "1px solid #ccc",
                padding: "6px 10px",
                borderRadius: "4px",
                width: "100%",
                opacity: '0',
                backgroundColor: "#fff"}} 
               />

                <div>
                  {file ? (
                   <span className="file-name">{file.name}</span>
                  ) : (
                 <span className="file-help">Drag & drop or click to upload (JPG, PNG - Max 5MB)</span>
                  )}
                 </div>
                 </div>

                  <InfoCard 
                    icon={<FaIdCard size={20} />} 
                    title="Phone Number" 
                    value={formData.phone_number}
                    name="phone_number"
                    editable={true}
                  />
                     <InfoCard 
                      icon={<FaUserGraduate size={20} />} 
                      title="Program" 
                      value={formData.program} 
                      name="program"
                      editable={true}
                    />
                  
                    <InfoCard 
                      icon={<FaBuilding size={20} />} 
                      title="Department" 
                      value={formData.department} 
                      name="department"
                      editable={true}
                    />
                </div>
              )}
              
              {activeTab === 'academic' && (
                <div style={{
                  animation: "fadeIn 0.4s ease-out forwards"
                }}>
                  <h2 style={{
                    fontSize: "20px",
                    color: colors.dark,
                    marginBottom: "20px",
                    fontWeight: "600",
                    position: "relative",
                    paddingBottom: "10px"
                  }}>
                    Academic Details
                    <span style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "40px",
                      height: "3px",
                      background: colors.accent,
                      borderRadius: "2px"
                    }}></span>
                  </h2>
                  
                    <InfoCard 
                      icon={<FaUserGraduate size={20} />} 
                      title="Program" 
                      value={formData.program} 
                      name="program"
                      editable={true}
                    />
                  
                    <InfoCard 
                      icon={<FaBuilding size={20} />} 
                      title="Department" 
                      value={formData.department} 
                      name="department"
                      editable={true}
                    />
                  
                </div>
              )}
            </div>
            
            {/* Footer with actions */}
            <div style={{
              padding: "20px",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              background: colors.light,
              marginBottom: "10%",
            }}>
              {editMode ? (
                <>
                <button style={{
                    background: "transparent",
                    border: `1px solid ${colors.dark}`,
                    color: colors.dark,
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                  onClick={() => setEditMode(false)}
                  >
                    <FaTimes /> Cancel
                  </button>

                  <button style={{
                    background: colors.primary,
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "500",
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(10, 36, 99, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s"
                  }}
              onClick={() => updateProfile({
                // Placeholder for edit action
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                department: "",
                profile_picture: ""
              })} // Placeholder for edit action
                  >
              <FaSave /> Save Changes
                  </button>
               
              </>
               ) : (
              <button style={{
                background: colors.primary,
                border: "none",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "500",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(10, 36, 99, 0.2)",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s"
              }}
              onClick={() => setEditMode(true)}
              >
                <span style={{ marginRight: "8px" }}>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
          }}>
            <p>No profile data available. Please log in.</p>
          </div>
        )}
        
        {/* Global CSS for animations - normally would go in a stylesheet but using inline for demo */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes pulse {
              0% { opacity: 0.6; }
              50% { opacity: 1; }
              100% { opacity: 0.6; }
            }
            
            @keyframes shineEffect {
              0% { background-position: -100% 0; }
              100% { background-position: 200% 0; }
            }
          `
        }} />
      </div>
      <button onClick={() => setShowNotifications(true)} style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "10px 20px",
        backgroundColor: "#0a2463",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
        View Notifications
      </button>

      {showNotifications && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default Profile;