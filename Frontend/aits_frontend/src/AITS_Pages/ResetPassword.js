import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,navigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import './Passwordreset.css';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

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
        <input
          type="password"
          placeholder="New Password"
          value={new_password}
          onChange={(e) => setNew_password(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
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
