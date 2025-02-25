import React from 'react';
import { Link } from 'react-router-dom';
import './Loginpage.css';

const Loginpage = () => {
  return (
   <div className="Login-container">
   {/*Background picture on login form*/}
   <div className="image-container">
     <img src="/images/pic.jpg" alt="AITS"/>
     </div>

    {/*Login form*/}
  <div className="container">
   <div className="card">
    <h1>AITS</h1>
    <h2>LOGIN</h2>
    <p style={{fontFamily:'cursive', color:'black'}}>"Submit, track, and resolve academic matters seamlessly."</p>

    {/*Form for the user to input their login details*/}
    <form>
     <div className="form-group">
      <div>
        <label htmlFor="username">Username</label><br/>
        <input type="text" name="username" placeholder="Username"  required/>
    </div>
    <br/>
    <div>
      <label htmlFor="password">Password</label><br/>
      <input type="password" name="password" placeholder="Password" required/>
    </div>
  <br/>
  <div className='button'>
    <button type="submit">Login</button>
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
  
  
  );
}
export default Loginpage;