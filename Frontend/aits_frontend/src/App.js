import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './AITS_Pages/WelcomePage';
import SignUpPage from './AITS_Pages/SignUpPage';
import Loginpage from './AITS_Pages/LoginPage';
import StudentDashboard from './AITS_Pages/StudentDashboard'; 
import StudentIssueReport from './AITS_Pages/StudentIssueReport';
import LecturerDashboard from './AITS_Pages/LecturerDashboard';
import RegistrarDashboard from './AITS_Pages/RegistrarDashboard';
import IssueReport from './AITS_Pages/IssueReport';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />//
        <Route path="/login" element={<Loginpage />} />
        <Route path="/dashboard" element={<StudentDashboard />} /> 
        <Route path="/IssueReport" element={<IssueReport />} /> 
        <Route path="/Studentissue" element={<StudentIssueReport/>} />
        <Route path="/lecturer" element={<LecturerDashboard />} />
        <Route path="/RegistrarDashboard" element={<RegistrarDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
