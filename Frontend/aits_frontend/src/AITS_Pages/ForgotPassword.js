import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://kennedymutebi7.pythonanywhere.com/auth/password-reset-request/',
        { email }
      );
      setMessage("Check your email for a password reset link.");
    } catch (err) {
      setMessage("Error sending reset email.");
      console.error(err);
    }
  };

  return (
    
      <div className="auth-page">
     <div className="auth-card">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    <footer className="footer">
      <p>&copy; 2025 AITS. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default ForgotPassword;

