import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { login } from '../utils/auth'; // Import the login function from your utils
//import axios from 'axios';
//import apiClient from '../utils/axiosInstance';
import './LoginPage.css';
//import Toast from '../components/ToastContainer';
import { toast} from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Loginpage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);

  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword);
  };
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() =>{
    if (location.pathname=== '/StudentDashboard'
      || location.pathname=== '/LecturerDashboard'
      || location.pathname=== '/RegistrarDashboard'){
        toast.success('Login Successful!',{
          autoClose:60000,
        });
      }
      },[location]);
      
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step 1: Authenticate the user
      const response = await login( username, password );
      if (response.tokens) {
        // Determine the user's role and navigate accordingly
      const user_type = response.user.user_type; // Assuming the user type is included in the response
      let dashboardPath;

      switch (user_type) {
        case 'student':
          dashboardPath = '/StudentDashboard';
          break;
        case 'lecturer':
          dashboardPath = '/LecturerDashboard';
          break;
        case 'admin':
          dashboardPath = '/RegistrarDashboard';
          break;
        default:
          dashboardPath = '/dashboard';
      }
      navigate(dashboardPath);
    }
    if (!response|| !response.user){
        setError('Invalid username or password. Please try again.');
        toast.warning('Invalid username or password. Please try again.');
        return;
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.status === 401) {
        setError('Incorrect username or password. Please try again!');
        toast.warning('Incorrect username or password. Please try again!');
      } else {
        setError('An error occurred. Please try again later.');
        toast.warning('An error occurred. Please try again later.',{autoClose:60000,});
      }
    } finally {
      setLoading(false);
    }
  };

  const setupSessionTimeout = () => {
    const sessionTimeout = 10 * 60 * 1000; // 10 minutes
    let timeoutHandle;

    const resetTimeout = () => {
      clearTimeout(timeoutHandle);
      timeoutHandle = setTimeout(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        navigate('/login');
      }, sessionTimeout);
    };

    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keypress', resetTimeout);

    resetTimeout();
  };

  useEffect(() => {
    setupSessionTimeout();
    return () => {
      window.removeEventListener('mousemove', setupSessionTimeout);
      window.removeEventListener('keypress', setupSessionTimeout);
    };
  }, []);


   return (
   <div className="Login-container">
   {/*Background picture on login form*/}

    {/*Login form*/}

  <div className='right'>
  <div className="container">
   <div className="card">
    <h1>AITS</h1>
    <img src='/images/nobgmaklogo.png' id='maklogologin' alt="logo"/>
    <p style={{color:'white'}}>"Submit, track, and resolve academic matters seamlessly."</p>
    
    {/* Display error message if exists */}
    {error && <p style={{ color: 'red',fontFamily: 'sans-serif', fontWeight: 'bold',fontSize: '15px', textDecoration: 'none', content: 'open-quote'}}>{error}</p>}

   {/*Form for the user to input their login details*/}
    <form onSubmit={handleSubmit}>
     <div className="form-group">
      <div>
        <label htmlFor="username"style={{color:"#f0a500"}}>Username</label>
        <input 
        type="text" 
        name="username" 
        placeholder="Enter your Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)} required/>
    </div>
    
    <div className='password-input-container'>
      <label htmlFor="password" style={{color:"#f0a500"}}>Password</label>
      <input 
      type={showPassword ? 'text':'password'}
      name="password" 
      placeholder="Enter your Password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}required/>
      <button type='button' className='password-toggle-button' onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash/>:<FaEye/>}</button>
     
    </div>
    
  <br/>
  <div id='login-bttn'>
    <button type="submit" className='button-login'> {loading ? <span className="spinner"></span> : 'LOGIN'}
    </button>
   </div> 
  </div>

              <p>
                Don't have an account?{' '}
                <Link to="/Signup" className="btn">
                  Sign Up to start
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2025 AITS. All rights reserved.</p>
      </footer>
     {/*<Toast/>*/} 
    </div>
  );
};

export default Loginpage;
