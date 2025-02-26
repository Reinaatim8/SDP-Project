import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './AITS_Pages/Student_dashbaord';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<StudentDashboard/>}/>
      </Routes>
    </Router>
  );
}
export default App;