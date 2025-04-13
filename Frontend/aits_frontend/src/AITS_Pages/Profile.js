import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEnvelope, FaIdCard, FaUserGraduate, FaUniversity, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import StudentHoverBar from './StudentHoverBar.js'

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

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
  const InfoCard = ({ icon, title, value }) => {
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
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.08)";
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
          <div style={{ fontSize: "14px", color: colors.dark, opacity: 0.7, marginBottom: "4px" }}>{title}</div>
          <div style={{ fontSize: "16px", fontWeight: "600", color: colors.dark }}>{value || "Not provided"}</div>
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
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f8f9fa" ,  backgroundImage: "url(../../public/images/studentwallpaper.jpg)"
    }}>
      <StudentHoverBar/>
      <div style={{
        backgroundImage: "url(../../public/images/studentwallpaper.jpg)",
        flexGrow: 1,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
        padding: "40px",
        overflowY: "auto"
      }}>
        {userData ? (
          <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            backgroundImage: "url(../../public/images/studentwallpaper.jpg)",

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
                alt="Profile Logo" 
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
              <TabButton id="academic" label="Academic Details" active={activeTab === 'academic'} />
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
                    value={userData.username} 
                  />
                  
                  <InfoCard 
                    icon={<FaEnvelope size={20} />} 
                    title="Email Address" 
                    value={userData.email} 
                  />
                  
                  <InfoCard 
                    icon={<FaIdCard size={20} />} 
                    title="User Type" 
                    value={userData.user_type} 
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
                  
                  {userData.program && (
                    <InfoCard 
                      icon={<FaUserGraduate size={20} />} 
                      title="Program" 
                      value={userData.program} 
                    />
                  )}
                  
                  {userData.year_of_study && (
                    <InfoCard 
                      icon={<FaCalendarAlt size={20} />} 
                      title="Year of Study" 
                      value={userData.year_of_study} 
                    />
                  )}
                  
                  {userData.student_id && (
                    <InfoCard 
                      icon={<FaIdCard size={20} />} 
                      title="Student ID" 
                      value={userData.student_id} 
                    />
                  )}
                  
                  {userData.staff_id && (
                    <InfoCard 
                      icon={<FaIdCard size={20} />} 
                      title="Staff ID" 
                      value={userData.staff_id} 
                    />
                  )}
                  
                  {userData.department && (
                    <InfoCard 
                      icon={<FaBuilding size={20} />} 
                      title="Department" 
                      value={userData.department} 
                    />
                  )}
                  
                  {!userData.program && !userData.year_of_study && !userData.student_id && 
                   !userData.staff_id && !userData.department && (
                    <div style={{
                      textAlign: "center",
                      padding: "40px 20px",
                      color: colors.dark,
                      opacity: 0.7
                    }}>
                      No academic information available
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Footer with actions */}
            <div style={{
              padding: "20px",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              background: colors.light
            }}>
              <button style={{
                background: "transparent",
                border: `1px solid ${colors.primary}`,
                color: colors.primary,
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(10, 36, 99, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={() => toast.info("Edit functionality would be implemented here")}
              >
                Edit Profile
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
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(10, 36, 99, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(10, 36, 99, 0.2)";
              }}
              onClick={() => toast.success("Changes saved successfully!")}
              >
                <span style={{ marginRight: "8px" }}>Save Changes</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
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
    </div>
  );
};

export default Profile;