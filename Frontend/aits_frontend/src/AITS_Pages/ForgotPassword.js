import React, { useState } from 'react';
import axios from 'axios';
import './Passwordreset.css';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResetLink('');
    setMessage('');
    try {
     const response = await axios.post(
        'https://kennedymutebi7.pythonanywhere.com/auth/password-reset-request/',
        { email },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // Extract link from response (assuming it's in response.data.link)
      const resetURL = response.data?.reset_link || response.data?.link || response.data?.url;

      if (resetURL) {
        setResetLink(resetURL);
        setMessage("Password reset link generated successfully.");
        toast.success("Password reset link generated successfully. Please click the link in your email to reset your password.");
      } else {
        setMessage("Email found, but no reset link was returned.");
      }
  
    } catch (err) {
      setMessage("Error sending reset email. Please check your email.");
      toast.error("Error sending reset email. Please check your email.");
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

      {resetLink && (
          <div className="reset-link">
            <p><strong>Reset Link:</strong></p>
            <a href={resetLink} target="_blank" rel="noopener noreferrer">{resetLink}</a>
          </div>
        )}
    </div>
    <footer className="footer">
      <p>&copy; 2025 AITS. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default ForgotPassword;

