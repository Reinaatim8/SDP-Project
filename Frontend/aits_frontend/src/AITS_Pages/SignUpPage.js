import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    user:{
      username: '',
      user_type: '',
      email: '',
      password: '',
      department: '',
    },
    staff_id: '',
    student_id: '',
    user_type: 'student',//default user is student
    program: '',
    year_of_study: '',
    department: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);


//To valiadte and ensure a strong password is created by the user
  const validatePassword = (password) => {
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
   
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number.';
    }

    return null; // Password is strong enough to continue
  };


// To handle user input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('user.')) {
    setFormData({
      ...formData,
      user: {
        ...formData.user,
        [name.split('.')[1]]: value,
      },
      });
  } else {
    setFormData({...formData, [name]: value});
  }
  };

  // To validate the form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name) newErrors.full_name = 'Full name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.student_id && formData.user_type === 'student') {
      newErrors.student_id = 'Student ID is required';
    }
    if (!formData.staff_id && formData.user_type === 'lecturer') {
      newErrors.staff_id = 'Staff ID is required';
    }
    if (!formData.program && formData.user_type == 'student'){ 
      newErrors.program = 'Program is required';
    }
    if (!formData.year_of_study && formData.user_type == 'student'){
      newErrors.year_of_study = 'Year of study is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email has an invalid format';
    }
    const passwordError = validatePassword(formData.password);
    if (passwordError) { newErrors.password = passwordError;  
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // To handle form on submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // If the form has errors, stop submission

      setLoading(true);
      setApiError('');

      //Endpoint based on user 
      
      const endpoint = `https://kennedymutebi.pythonanywhere.com/auth/register/${formData.user_type}`;
      console.log("Registering as:", formData.user_type);
      console.log("Endpoint:", endpoint);

      
      //Prepare data to be sent to the server
      const dataToSend = {
        full_name: formData.full_name,
        user:{
          username: formData.username,
          password: formData.password,
          email: formData.email,
          user_type: formData.user_type,
          department: formData.department,
        },
        staff_id: formData.staff_id,
        student_id: formData.student_id,
        program: formData.program,
        year_of_study: formData.year_of_study,
      };
      console.log("Data to be sent:", dataToSend); // Log data to verify

      try {
        const response = await axios.post(endpoint, dataToSend,{
          headers: { 'Content-Type': 'application/json' }
        });
        console.log("Response:", response.data); // Log response for debugging
        
       //Handling response on successful registration
       alert('Sign Up Successful! Please login.');
       navigate('/login');
     } catch (error) {
       console.error('Sign up error:', error);
       setApiError(
        error.response?.data?.message ||'Sign up failed! Please check your details and try again.');
     } finally {
     setLoading(false);
   }
 };

  return (
    <div className="signup-panel">
    <div className="signup-container">
      <div className="signup-card">
        <img src='/images/nobgmaklogo.png'alt='maklogo'/ >
        <h2 className="signup-title">Sign Up To Start</h2>
        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="form-group inline-fields">
            <div className="form-field">
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
              {errors.first_name && <span className="error">{errors.full_name}</span>}
            </div>
          </div>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your Username"required
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Password  and confirm password*/}
          <div className="form-group inline-fields">
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form-field">
              <label id='username' htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>

          {/* Program */}
          <div className="form-group">
              <label htmlFor="program">Program (Optional)</label>
              <input
                type="text"
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                placeholder="Enter your program"
              />
            </div>

            {/* Student ID */}
            {formData.user_type === 'student' && (
              <div className="form-group">
                <label htmlFor="student_id">Student ID</label>
                <input
                  type="text"
                  id="student_id"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  placeholder="Enter your student ID"
                  required
                />
                {errors.student_id && <span className="error">{errors.student_id}</span>}
              </div>
            )}
             {/* Staff ID */}
            {formData.user_type === 'lecturer' && (
              <div className="form-group">
                <label htmlFor="staff_id">Staff ID</label>
                <input
                  type="text"
                  id="staff_id"
                  name="staff_id"
                  value={formData.staff_id}
                  onChange={handleChange}
                  placeholder="Enter your staff ID"
                  required
                />
                {errors.staff_id && <span className="error">{errors.staff_id}</span>}
              </div>
            )}

            {/* Year of Study */}
            <div className="form-group" id='year'>
              <label htmlFor="year_of_study">Year of Study (Optional)</label>
              <input
                type="text"
                id="year_of_study"
                name="year_of_study"
                value={formData.year_of_study}
                onChange={handleChange}
                placeholder="Enter your year of study"
              />
            </div>

          {/* User Type */}
          <div className="form-group">
            <label htmlFor="user_type">User Type</label>
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin/Registrar</option>
            </select>
          </div>

          {/* Department */}
          <div className="form-group" id='department'>
            <label htmlFor="department">Department (Optional)</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter your department"
            />
          </div>

          {/* API Error Display */}
          {apiError && <p className="error">{apiError}</p>}

          {/* Submit Button */}
          <button type="submit" className="signup-button" disabled={loading}>{loading ? <span className='spinner'></span>: 'SIGN UP'}
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignUpPage;