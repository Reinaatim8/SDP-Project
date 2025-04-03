import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Settings, 
  Users, 
  FileText, 
  Bell, 
  Home, 
  BarChart2,
  Search,
  ChevronRight,
  LogOut,
  User,
  HelpCircle,
  Moon,
  Sun,
  Calendar,
  Clock,
  X,
  Bookmark,
  Star
} from 'lucide-react';

const RegistrarSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New student registration", read: false, time: "10 mins ago" },
    { id: 2, title: "Course schedule updated", read: false, time: "1 hour ago" },
    { id: 3, title: "End of semester report due", read: true, time: "Yesterday" }
  ]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [favorites, setFavorites] = useState([
    { id: 1, title: "Student Enrollment", path: "/students/enrollment" },
    { id: 2, title: "Course Schedule", path: "/courses/schedule" }
  ]);
  const [recentItems, setRecentItems] = useState([
    { id: 1, title: "Grade Submission", path: "/grades/submit", time: "2 hours ago" },
    { id: 2, title: "Class Roster", path: "/students/roster", time: "Yesterday" }
  ]);
  
  const location = useLocation();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    if (showNotificationPanel) {
      setShowNotificationPanel(false);
    }
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setSearchQuery('');
    }
  };
  
  const toggleNotificationPanel = () => {
    setShowNotificationPanel(!showNotificationPanel);
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };
  
  const mainMenuItems = [
    { title: "Dashboard", path: "/RegistrarDashboard", icon: <Home size={20} /> },
    { title: "Student Management", path: "/students", icon: <Users size={20} /> },
    { title: "Course Management", path: "/courses", icon: <FileText size={20} /> },
    { title: "Reports & Analytics", path: "/reports", icon: <BarChart2 size={20} /> },
    { title: "Calendar", path: "/calendar", icon: <Calendar size={20} /> },
    { title: "Settings", path: "/settings", icon: <Settings size={20} /> }
  ];
  
  const quickActionItems = [
    { title: "Add New Student", action: () => alert("Add New Student modal would open") },
    { title: "Register Course", action: () => alert("Register Course modal would open") },
    { title: "Generate Transcript", action: () => alert("Generate Transcript modal would open") },
    { title: "Schedule Exam", action: () => alert("Schedule Exam modal would open") }
  ];
  
  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentTime.toLocaleDateString(undefined, options);
  };
  
  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Search functionality
  const filteredMenuItems = mainMenuItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const baseClasses = `registrar-sidebar ${isExpanded ? 'expanded' : 'collapsed'} ${isDarkMode ? 'dark-mode' : ''}`;
  
  return (
    <div className={baseClasses}>
      <div className="sidebar-header">
        {isExpanded && (
          <div className="logo-container">
            <h2 style={{color:'#f0a500'}}>REGISTRAR HUB</h2>
          </div>
        )}
        <button className="toggle-btn" onClick={toggleSidebar}>
          <Menu size={isExpanded ? 20 : 16} />
        </button>
      </div>
      
      {isExpanded && (
        <div className="search-container">
          <div className="search-input-group">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}
      
      <nav className="main-nav">
        <ul>
          {(searchQuery ? filteredMenuItems : mainMenuItems).map((item, index) => (
            <li key={index} className={location.pathname === item.path ? 'active' : ''}>
              <NavLink to={item.path} className="nav-link">
                <span className="nav-icon">{item.icon}</span>
                {isExpanded && <span className="nav-text">{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {isExpanded && (
        <>
          <div className="section-divider">
            <span>Quick Access</span>
          </div>
          
          <div className="favorites-section">
            <h3>
              <Bookmark size={16} />
              <span>Favorites</span>
            </h3>
            <ul>
              {favorites.map(item => (
                <li key={item.id}>
                  <NavLink to={item.path} className="favorite-link">
                    <Star size={14} className="star-icon" />
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="recents-section">
            <h3>
              <Clock size={16} />
              <span>Recent</span>
            </h3>
            <ul>
              {recentItems.map(item => (
                <li key={item.id}>
                  <NavLink to={item.path} className="recent-link">
                    <span>{item.title}</span>
                    <small>{item.time}</small>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="quick-actions">
            <button 
              className="quick-actions-toggle"
              onClick={() => setShowQuickActions(!showQuickActions)}
            >
              Quick Actions
              <ChevronRight 
                size={16} 
                className={`quick-actions-icon ${showQuickActions ? 'rotated' : ''}`} 
              />
            </button>
            
            {showQuickActions && (
              <div className="quick-actions-menu">
                {quickActionItems.map((item, index) => (
                  <button key={index} className="action-btn" onClick={item.action}>
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="datetime-display">
            <div className="date">{formatDate()}</div>
            <div className="time">{formatTime()}</div>
          </div>
        </>
      )}
      
      <div className="sidebar-footer">
        {isExpanded && (
          <>
            <button 
              className="notification-btn" 
              onClick={toggleNotificationPanel}
            >
              <Bell size={20} />
              {getUnreadCount() > 0 && (
                <span className="notification-badge">{getUnreadCount()}</span>
              )}
            </button>
            
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </>
        )}
        
        <div className="user-profile">
          <div className="avatar">
            <User size={isExpanded ? 20 : 16} />
          </div>
          {isExpanded && (
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-role">Registrar</span>
            </div>
          )}
        </div>
        
        {isExpanded && (
          <div className="footer-actions">
            <button className="help-btn">
              <HelpCircle size={16} />
              <span>Help</span>
            </button>
            <button className="logout-btn">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Notification Panel */}
      {isExpanded && showNotificationPanel && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="notification-actions">
              <button onClick={markAllNotificationsAsRead}>Mark all as read</button>
              <button onClick={toggleNotificationPanel}>
                <X size={16} />
              </button>
            </div>
          </div>
          
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                >
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                  <button 
                    className="remove-notification" 
                    onClick={() => removeNotification(notification.id)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="no-notifications">No notifications</div>
            )}
          </div>
        </div>
      )}
      
      {/* Style for the component */}
      <style jsx>{`
        .registrar-sidebar {
          width: 300px;
          height: 100vh;
          background: #0f1e2e;
          color: #fff;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          overflow: auto;
          z-index: 100;

        }
        
        .registrar-sidebar.dark-mode {
          background: #1a1a2e;
          color: #e6e6e6;
        }
        
        .registrar-sidebar.collapsed {
          width: 60px;
        }
        
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid #eee;
        }
        
        .dark-mode .sidebar-header {
          border-bottom: 1px solid #2a2a3a;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .logo-container h2 {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
        }
        
        .logo {
          // width: 32px;
          // height: 32px;
          border-radius: 8px;
        }
        
        .toggle-btn {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .toggle-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        
        .dark-mode .toggle-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .search-container {
          padding: 16px;
          border-bottom: 1px solid #eee;
        }
        
        .dark-mode .search-container {
          border-bottom: 1px solid #2a2a3a;
        }
        
        .search-input-group {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 10px;
          color: #777;
        }
        
        .search-input {
          width: 100%;
          padding: 8px 32px 8px 32px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 14px;
          background: #f5f5f5;
          transition: all 0.2s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }
        
        .dark-mode .search-input {
          background: #2a2a3a;
          border-color: #3a3a4a;
          color: #e6e6e6;
        }
        
        .dark-mode .search-icon {
          color: #aaa;
        }
        
        .clear-search {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: #777;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .dark-mode .clear-search {
          color: #aaa;
        }
        
        .main-nav {
          flex: 1;
          padding: 16px 0;
        }
        
        .main-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .main-nav li {
          margin: 4px 0;
        }
        
        .main-nav li.active .nav-link {
          background: #3498db;
          color: white;
        }
        
        .dark-mode .main-nav li.active .nav-link {
          background: #2980b9;
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          text-decoration: none;
          color: inherit;
          border-radius: 8px;
          margin: 0 8px;
          transition: all 0.2s ease;
        }
        
        .nav-link:hover {
          background: #f5f5f5;
        }
        
        .dark-mode .nav-link:hover {
          background: #2a2a3a;
        }
        
        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        
        .collapsed .nav-link {
          justify-content: center;
          padding: 12px;
        }
        
        .collapsed .nav-icon {
          margin-right: 0;
        }
        
        .section-divider {
          display: flex;
          align-items: center;
          padding: 0 16px;
          margin: 16px 0 8px;
        }
        
        .section-divider span {
          color: #777;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .dark-mode .section-divider span {
          color: #aaa;
        }
        
        .favorites-section,
        .recents-section {
          padding: 8px 16px;
        }
        
        .favorites-section h3,
        .recents-section h3 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .favorites-section ul,
        .recents-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .favorites-section li,
        .recents-section li {
          margin: 4px 0;
        }
        
        .favorite-link,
        .recent-link {
          display: flex;
          align-items: center;
          padding: 8px;
          text-decoration: none;
          color: inherit;
          font-size: 13px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        
        .favorite-link:hover,
        .recent-link:hover {
          background: #f5f5f5;
        }
        
        .dark-mode .favorite-link:hover,
        .dark-mode .recent-link:hover {
          background: #2a2a3a;
        }
        
        .star-icon {
          color: #f39c12;
          margin-right: 8px;
        }
        
        .recent-link {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .recent-link small {
          color: #777;
          font-size: 11px;
          margin-top: 2px;
        }
        
        .dark-mode .recent-link small {
          color: #aaa;
        }
        
        .quick-actions {
          padding: 8px 16px;
          margin-top: 8px;
        }
        
        .quick-actions-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          background: #f5f5f5;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .dark-mode .quick-actions-toggle {
          background: #2a2a3a;
          color: #e6e6e6;
        }
        
        .quick-actions-toggle:hover {
          background: #ebebeb;
        }
        
        .dark-mode .quick-actions-toggle:hover {
          background: #3a3a4a;
        }
        
        .quick-actions-icon {
          transition: transform 0.3s ease;
        }
        
        .quick-actions-icon.rotated {
          transform: rotate(90deg);
        }
        
        .quick-actions-menu {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 8px;
        }
        
        .action-btn {
          padding: 10px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .dark-mode .action-btn {
          background: #2a2a3a;
          border-color: #3a3a4a;
          color: #e6e6e6;
        }
        
        .action-btn:hover {
          background: #f5f5f5;
          border-color: #ccc;
        }
        
        .dark-mode .action-btn:hover {
          background: #3a3a4a;
          border-color: #4a4a5a;
        }
        
        .datetime-display {
          padding: 16px;
          text-align: center;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          margin-top: 16px;
        }
        
        .dark-mode .datetime-display {
          border-color: #2a2a3a;
        }
        
        .date {
          font-size: 12px;
          color: #777;
        }
        
        .dark-mode .date {
          color: #aaa;
        }
        
        .time {
          font-size: 20px;
          font-weight: 700;
          margin-top: 4px;
        }
        
        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid #eee;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .dark-mode .sidebar-footer {
          border-color: #2a2a3a;
        }
        
        .collapsed .sidebar-footer {
          align-items: center;
        }
        
        .notification-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          color: inherit;
          align-self: flex-end;
        }
        
        .notification-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #e74c3c;
          color: white;
          font-size: 10px;
          font-weight: bold;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          color: inherit;
          align-self: flex-end;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 8px;
          margin-top: 8px;
        }
        
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #3498db;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
        }
        
        .user-name {
          font-size: 14px;
          font-weight: 600;
        }
        
        .user-role {
          font-size: 12px;
          color: #777;
        }
        
        .dark-mode .user-role {
          color: #aaa;
        }
        
        .footer-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        
        .help-btn,
        .logout-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px;
          background: #f5f5f5;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
        }
        
        .dark-mode .help-btn,
        .dark-mode .logout-btn {
          background: #2a2a3a;
          color: #e6e6e6;
        }
        
        .help-btn:hover {
          background: #ebebeb;
        }
        
        .logout-btn:hover {
          background: #fee;
          color: #e74c3c;
        }
        
        .dark-mode .help-btn:hover {
          background: #3a3a4a;
        }
        
        .dark-mode .logout-btn:hover {
          background: #3a2a2a;
          color: #e74c3c;
        }
        
        .notification-panel {
          position: absolute;
          top: 0;
          right: -320px;
          width: 320px;
          height: 100vh;
          background: white;
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
          z-index: 200;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s forwards;
        }
        
        .dark-mode .notification-panel {
          background: #1a1a2e;
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes slideIn {
          to {
            right: 280px;
          }
        }
        
        .notification-header {
          padding: 16px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .dark-mode .notification-header {
          border-color: #2a2a3a;
        }
        
        .notification-header h3 {
          margin: 0;
          font-size: 16px;
        }
        
        .notification-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .notification-actions button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 12px;
          color: #3498db;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .dark-mode .notification-actions button {
          color: #5dade2;
        }
        
        .notification-list {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }
        
        .notification-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 8px;
          background: #f9f9f9;
          transition: all 0.2s ease;
        }
        
        .dark-mode .notification-item {
          background: #2a2a3a;
        }
        
        .notification-item.read {
          opacity: 0.7;
        }
        
        .notification-item.unread {
          border-left: 3px solid #3498db;
        }
        
        .notification-content {
          flex: 1;
        }
        
        .notification-title {
          font-size: 14px;
          margin-bottom: 4px;
        }
        
        .notification-time {
          font-size: 12px;
          color: #777;
        }
        
        .dark-mode .notification-time {
          color: #aaa;
        }
        
        .remove-notification {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #777;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .dark-mode .remove-notification {
          color: #aaa;
        }
        
        .notification-item:hover .remove-notification {
          opacity: 1;
        }
        
        .no-notifications {
          text-align: center;
          padding: 32px 0;
          color: #777;
          font-size: 14px;
        }
        
        .dark-mode .no-notifications {
          color: #aaa;
        }
      `}</style>
    </div>
  );
};

export default RegistrarSidebar;