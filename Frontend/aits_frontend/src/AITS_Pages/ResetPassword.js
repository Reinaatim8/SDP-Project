import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,navigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import './Passwordreset.css';
import { toast } from 'react-toastify';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () =>{
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [new_password, setNew_password] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new_password !== confirm) {
      return setMessage("Passwords do not match");
    }

    try {
      await axios.post(
        'https://kennedymutebi7.pythonanywhere.com/auth/password-reset-confirm/',
        {
          token,
          new_password,
          email,
        }
      );
      setMessage("Password has been reset successfully!");
      console.log("Password reset successfully!");
      toast.success("Password has been reset successfully!");
      navigate ('/login');
    } catch (err) {
      setMessage("Error resetting password.");
      toast.error("Error resetting password.");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">  
      <h1 className="logo">AITS</h1>
      <img src='/images/nobgmaklogo.png' id='maklogo' alt="logo"  style={{ width: "120px",
  margin: "0px",
  padding: "0px"}}/>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="password-input-container">
        <label htmlFor="password" style={{color:"#f0a500"}}>New Password</label>
        <input
          type={showPassword ? 'text':'password'}
          placeholder="Enter New Password..."
          value={new_password}
          onChange={(e) => setNew_password(e.target.value)}
          required />
          <button type='button' className='password-toggle-button'
          onClick={togglePasswordVisibility}>{showPassword ? <FaRegEye/>:<FaRegEyeSlash/>}</button>
          
       <label htmlFor="password" style={{color:"#f0a500"}}>Confirm New Password</label>
        <input
         type={showConfirmPassword ? 'text':'password'}
          placeholder="Confirm New Password..."
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type='button' className='password-toggle-button'
          onClick={toggleConfirmPasswordVisibility}>{showConfirmPassword ? <FaRegEye/>:<FaRegEyeSlash/>}</button>
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    <footer className="footer">
      <p>&copy; 2025 AITS. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default ResetPassword;
