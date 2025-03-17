import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from '../AITS_Pages/WelcomePage';
import SignUpPage from '../AITS_Pages/SignUpPage';
import LoginPage from '../AITS_Pages/LoginPage';
import StudentDashboard from '../AITS_Pages/StudentDashboard';
import LecturerDashboard from '../AITS_Pages/LecturerDashboard';
import RegistrarDashboard from '../AITS_Pages/RegistrarDashboard';
import IssueReport from '../AITS_Pages/IssueReport'; // Ensure correct import path
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route path="/student-dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
      <Route path="/lecturer-dashboard" element={<PrivateRoute><LecturerDashboard /></PrivateRoute>} />
      <Route path="/registrar-dashboard" element={<PrivateRoute><RegistrarDashboard /></PrivateRoute>} />

      {/* Issue Report Route */}
      <Route path="/issue-report" element={<PrivateRoute><IssueReport /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;
