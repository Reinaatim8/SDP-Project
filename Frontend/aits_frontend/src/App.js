import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './AITS_Pages/WelcomePage';
import Aboutpage from './AITS_Pages/Aboutpage';
import SignUpPage from './AITS_Pages/SignUpPage';
import Loginpage from './AITS_Pages/LoginPage';
import StudentDashboard from './AITS_Pages/StudentDashboard'; 
import Profile from './AITS_Pages/Profile';
import Enrollment from './AITS_Pages/Enrollment';
import StudentIssueReport from './AITS_Pages/StudentIssueReport';
import LecturerDashboard from './AITS_Pages/LecturerDashboard';
import RegistrarDashboard from './AITS_Pages/RegistrarDashboard';
import RespondToQueries from './AITS_Pages/RespondToQueries';
import ViewIssues from './AITS_Pages/ViewIssues';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <Router>
      <ToastContainer
       position='top-center'
       autoClose={60000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Aboutpage" element={<Aboutpage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} /> 
        <Route path="/StudentIssueReport" element={<StudentIssueReport/>} />
        <Route path="/Enrollment" element={<Enrollment />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ViewIssues" element={<ViewIssues/>} />
        <Route path="/LecturerDashboard" element={<LecturerDashboard />} />
        <Route path="/RegistrarDashboard" element={<RegistrarDashboard />} />
        <Route path="/RespondToQueries" element={<RespondToQueries />} />

      </Routes>
    </Router>
  );
}

export default App;
