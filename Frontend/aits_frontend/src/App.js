import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './AITS_Pages/WelcomePage';
import SignUpPage from './AITS_Pages/SignUpPage';
// import LoginPage from './AITS_Pages/LoginPage';

import Welcomepage from './AITS_Pages/Welcomepage';
// import Loginpage from './AITS_Pages/Login page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/" element={<LoginPage />} /> */}
=======
        <Route path="/" element={<Welcomepage />} />
        <Route path="/" element={<Loginpage />} />
      </Routes>
    </Router>
  );
}
export default App;