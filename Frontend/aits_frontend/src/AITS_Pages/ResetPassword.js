import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './Passwordreset.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return setMessage("Passwords do not match");
    }

    try {
      await axios.post(
        'https://kennedymutebi7.pythonanywhere.com/auth/password-reset-confirm/',
        {
          token,
          password
        }
      );
      setMessage("Password has been reset successfully!");
    } catch (err) {
      setMessage("Error resetting password.");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">  
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
