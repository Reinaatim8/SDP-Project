import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const Loginpage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://kennedymutebi7.pythonanywhere.com/auth/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('API Response:', response.data);

      // Save the token in local storage
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      
      // Determine the user's role and navigate accordingly
      const user_type = response.data.user.user_type; // Assuming the user type is included in the response
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
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.status === 401) {
        setError('Incorrect username or password. Please try again!');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const setupSessionTimeout = () => {
    const sessionTimeout = 15 * 60 * 1000; // 15 minutes
    let timeoutHandle;

    const resetTimeout = () => {
      clearTimeout(timeoutHandle);
      timeoutHandle = setTimeout(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
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
    <img src='/images/nobgmaklogo.png' id='maklogologin'/>
    <p style={{color:'white'}}>"Submit, track, and resolve academic matters seamlessly."</p>
    
    {/* Display error message if exists */}
    {error && <p style={{ color: 'red',fontFamily: 'sans-serif', fontWeight: 'bold',fontSize: '15px', textDecoration: 'none', content: 'open-quote', content: 'close-quote' }}>{error}</p>}

   {/*Form for the user to input their login details*/}
    <form onSubmit={handleSubmit}>
     <div className="form-group">
      <div>
        <label htmlFor="username" style={{fontWeight: 'bold'}}>Username</label>
        <input 
        type="text" 
        name="username" 
        placeholder="Enter your Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)} required/>
    </div>
    
    <div>
      <label htmlFor="password" style={{fontWeight: 'bold'}}>Password</label>
      <input 
      type="password" 
      name="password" 
      placeholder="Enter your Password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}required
      />
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
    </div>
  );
};

export default Loginpage;
