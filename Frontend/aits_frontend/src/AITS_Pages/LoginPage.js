import React, {useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const Loginpage = () => {
  
  const [username, setUsername] = useState(''); // Controlled input for username
  const [password, setPassword] = useState(''); // Controlled input for password
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Make POST request to login API
      const response = await axios.post(
        'https://kennedymutebi.pythonanywhere.com/auth/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Log the response for debugging
      console.log('API Response:',response.data);

      // Save the token in local storage
      localStorage.setItem('token', response.data.access_token);
      
      //To rememebr login details of user
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
    
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
          dashboardPath = '/dashboard'; // Default or error handling path
      }

      // Redirect to the right dashboard for a specific user
      navigate(dashboardPath);
    } catch (err) {
      console.error(err);
      setError('Incorrect username or password.Please try again!');
    }
    setLoading(false);
  };

  //to redirect the user back to login page if portal is redundant for some time after login
  const setupSessionTimeout = () => {
    const sessionTimeout = 15 * 60 * 1000; // 15 minutes
    let timeoutHandle;

    const resetTimeout = () => {
      clearTimeout(timeoutHandle);
      timeoutHandle = setTimeout(() => {
        localStorage.removeItem('token');
        navigate('/login');
      }, sessionTimeout);
    };

    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keypress', resetTimeout);

    resetTimeout();
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', setupSessionTimeout);
      window.removeEventListener('keypress', setupSessionTimeout);
    };
  }, []);

  return (
   <div className="Login-container">
   {/*Background picture on login form*/}
   <div className="left">
   <div className="image-container">
    </div>
    </div>

    {/*Login form*/}
  <div className='right'>
  <div className="container">
   <div className="card">
    <h1>AITS</h1>
    <h2>LOGIN</h2>
    <p style={{color:'black'}}>"Submit, track, and resolve academic matters seamlessly."</p>
    
    {/* Display error message if exists */}
    {error && <p style={{ color: 'red',fontFamily: 'sans-serif', fontWeight: 'bold',fontSize: '20px', textDecoration: 'none', content: 'open-quote', content: 'close-quote' }}>{error}</p>}

   {/*Form for the user to input their login details*/}
    <form onSubmit={handleSubmit}>
     <div className="form-group">
      <div>
        <label htmlFor="username" style={{fontWeight: 'bold'}}>Username</label><br/>
        <input 
        type="text" 
        name="username" 
        placeholder="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)} required/>
    </div>
    
    <div>
      <label htmlFor="password" style={{fontWeight: 'bold'}}>Password</label><br/>
      <input 
      type="password" 
      name="password" 
      placeholder="Password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}required/>
    </div>
    <div>
    <label htmlFor="rememberMe" input style={{fontWeight: 'bold'}} type="checkbox"
       id="rememberMe"
       checked={rememberMe}
       onChange={(e) => setRememberMe(e.target.checked)}
    >Remember Me</label>
      </div>
  <br/>
  <div>
    <button type="submit" className='button'> {loading ? <span className="spinner"></span> : 'LOGIN'}
    </button>
   </div> 
  </div>

      <p>
         Don't have an account? <Link to="/Signup" className='btn'>Sign Up to start</Link>
     </p>
     </form>
  </div>
  </div>
  <div className="footer">
    <p>&copy; 2025 AITS. All rights reserved.</p>
  </div>
  </div>
  </div>
  
  
  );
}
export default Loginpage;