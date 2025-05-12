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
      // Replace the fake domain with your actual frontend host (local or deployed)
      const originalLink = response.data?.reset_link || response.data?.link || response.data?.url;

      if (originalLink) {
        const baseFrontendURL = window.location.origin; // dynamically get current frontend URL
        const fixedLink = originalLink.replace(/^https?:\/\/[^/]+/, baseFrontendURL);
        console.log("Fixed Reset Link:", fixedLink);

        setResetLink(fixedLink);
        console.log("Fixed Reset Link:", fixedLink);
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
     <h1 className="logo">AITS</h1>
     <img src='/images/nobgmaklogo.png' id='maklogo' alt="logo" style={{ width: "120px",
  margin: "0px",
  padding: "0px"}}/>
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
         <p>{resetLink}</p>
         <button onClick={() => window.location.href = resetLink}>Go to Reset Page</button>
       
      </div>)}
   
    <footer className="footer">
      <p>&copy; 2025 AITS. All rights reserved.</p>
    </footer>
    </div>
    </div>
  );
};

export default ForgotPassword;

