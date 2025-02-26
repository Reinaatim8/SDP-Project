import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import WelcomePage from './AITS_Pages/WelcomePage';
import SignUpPage from './AITS_Pages/SignUpPage';
// import LoginPage from './AITS_Pages/LoginPage';

=======
import Welcomepage from './AITS_Pages/Welcomepage';
import Loginpage from './AITS_Pages/Login page';
>>>>>>> 737e0a7312c54a2ad8e256250932c2de2943d7ef

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/" element={<LoginPage />} /> */}
=======
        <Route path="/" element={<Welcomepage />} />
        <Route path="/" element={<Loginpage />} />
>>>>>>> 737e0a7312c54a2ad8e256250932c2de2943d7ef
      </Routes>
    </Router>
  );
}
export default App;