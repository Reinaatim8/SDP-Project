import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcomepage from './AITS_Pages/Welcomepage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcomepage />} />
      </Routes>
    </Router>
  );
}
export default App;