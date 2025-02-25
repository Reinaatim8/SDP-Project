import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './AITS_Pages/WelcomePage';
import SignUpPage from './AITS_Pages/SignUpPage';
// import LoginPage from './AITS_Pages/LoginPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}
export default App;