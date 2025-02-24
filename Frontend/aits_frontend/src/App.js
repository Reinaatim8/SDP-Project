import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcomepage from './AITS_Pages/Welcomepage';
import Loginpage from './AITS_Pages/Login page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcomepage />} />
        <Route path="/" element={<Loginpage />} />
      </Routes>
    </Router>
  );
}
export default App;