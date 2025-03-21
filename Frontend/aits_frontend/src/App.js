import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './AITS_Pages/WelcomePage';
import Aboutpage from './AITS_Pages/Aboutpage';
import SignUpPage from './AITS_Pages/SignUpPage';
import Loginpage from './AITS_Pages/LoginPage';
import StudentDashboard from './AITS_Pages/StudentDashboard'; 
import StudentIssueReport from './AITS_Pages/StudentIssueReport';
import LecturerDashboard from './AITS_Pages/LecturerDashboard';
import RegistrarDashboard from './AITS_Pages/RegistrarDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Aboutpage" element={<Aboutpage />} />
        <Route path="/signup" element={<SignUpPage />} />//
        <Route path="/login" element={<Loginpage />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} /> 
        <Route path="/StudentIssueReport" element={<StudentIssueReport/>} />
        <Route path="/LecturerDashboard" element={<LecturerDashboard />} />
        <Route path="/RegistrarDashboard" element={<RegistrarDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
