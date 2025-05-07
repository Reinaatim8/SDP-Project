import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { login } from '../utils/auth'; // Import the login function from your utils
import './LoginPage.css';
import { toast} from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

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
          autoClose:40000,
        });
      }
      },[location]);
      
      useEffect(() => {
        // Setup session timeout on component mount only
        const sessionTimeout = 25 * 60 * 1000; // 25 minutes
        let timeoutId = null;
    
        const resetTimeout = () => {
          if (timeoutId) clearTimeout(timeoutId);
          
          timeoutId = setTimeout(() => {
            // Only log out if the user is logged in
            const token = localStorage.getItem('access');
            if (token) {
              localStorage.removeItem('access');
              localStorage.removeItem('user');
              toast.info('Your session has expired. Please login again.');
              navigate('/login');
            }
          }, sessionTimeout);
        };
    
        // Add event listeners for user activity
        const handleUserActivity = () => {
          resetTimeout();
        };
    
        // Only set up the session timeout if the user is logged in
        if (localStorage.getItem('access')) {
          window.addEventListener('mousemove', handleUserActivity);
          window.addEventListener('keypress', handleUserActivity);
          resetTimeout(); // Initial timeout setup
        }
    
        // Cleanup function
        return () => {
          window.removeEventListener('mousemove', handleUserActivity);
          window.removeEventListener('keypress', handleUserActivity);
          if (timeoutId) clearTimeout(timeoutId);
        };
      }, []); // Empty dependency array so this runs once on mount
    
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      //  Authenticate the user
      const response = await login( username, password );
      if (response.token && response.user) {
        // Save tokens to localStorage
        localStorage.setItem('access', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success('Login Successful!', {
          autoClose: 40000,
        });

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
      <button type='button' className='password-toggle-button' onClick={togglePasswordVisibility}>{showPassword ? <FaRegEye/>:<FaRegEyeSlash/>}</button>
     
      <p style={{ marginTop: '10px' }}>
      <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
      </p>

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
