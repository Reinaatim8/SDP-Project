import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './AITS_Pages/WelcomePage';
import SignUpPage from './AITS_Pages/SignUpPage';
import StudentDashboard from './AITS_Pages/StudentDashboard'; // ✅ Import the dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} /> {/* ✅ Add dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
