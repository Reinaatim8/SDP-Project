import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaIdCard, FaUserGraduate, FaBuilding } from 'react-icons/fa';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    user:{
      username: '',
      user_type: '',
      email: '',
      password: '',
      department: '',
      phone_number: '',
    },
    staff_id: '',
    student_id: '',
    user_type: 'student',
    program: '',
    year_of_study: '',
    department: '',
    phone_number: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const totalSteps = 4;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  };  // To validate and ensure a strong password is created by the user
  const validatePassword = (password) => {
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
   
    if (password.length < minLength) {
      toast.warning(`Password must be at least ${minLength} characters long.`);
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasLowerCase) {
      toast.warning('Password must contain at least one lowercase letter.');
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumbers) {
      toast.warning('Password must contain at least one number.');
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

  // Validate current step
  const validateStep = (currentStep) => {
    const newErrors = {};
    
    switch(currentStep) {
      case 1: // Basic info
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.user_type) newErrors.user_type = 'User type is required';
        break;
      
      case 2: // Account info
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email has an invalid format';
          toast.warning('Email has an invalid format');
        }
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email has an invalid format';
          toast.warning('Email has an invalid format');
        }
        if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
        break;
      
      case 3: // Security
        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = passwordError;
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match!';
        }
        break;
      
      case 4: // Role-specific info
        if (!formData.department) newErrors.department = 'Department is required';
        
        if (formData.user_type === 'student') {
          if (!formData.student_id) newErrors.student_id = 'Student ID is required';
          if (!formData.program) newErrors.program = 'Program is required';
          if (!formData.year_of_study) newErrors.year_of_study = 'Year of study is required';
        }
        
        if (formData.user_type === 'lecturer' && !formData.staff_id) {
          newErrors.staff_id = 'Staff ID is required';
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Move to next step
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      toast.warning('Please fix the errors before proceeding.');
    }
  };

  // Move to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // To handle form on submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return; // If the current step has errors, stop submission

    setLoading(true);
    setApiError('');

    // Endpoint based on user 
    const endpoint = `https://kennedymutebi7.pythonanywhere.com/auth/register/${formData.user_type}`;
    console.log("Registering as:", formData.user_type);
    console.log("Endpoint:", endpoint);

    // Prepare data to be sent to the server
    const dataToSend = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      user:{
        username: formData.username,
        password: formData.password,
        email: formData.email,
        user_type: formData.user_type,
        department: formData.department,
        phone_number: formData.phone_number
      },
      staff_id: formData.staff_id,
      student_id: formData.student_id,
      program: formData.program,
      year_of_study: formData.year_of_study,
    };
    console.log("Data to be sent:", dataToSend);

    try {
      const response = await axios.post(endpoint, dataToSend, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Response:", response.data);

      // Storing certain user details in local storage for profile display
      const userProfile = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        email: formData.email,
        user_type: formData.user_type,
        phone_number: formData.phone_number,
        department: formData.department,
        staff_id: formData.staff_id,
        student_id: formData.student_id,
        program: formData.program,
        year_of_study: formData.year_of_study,
      };
      localStorage.setItem('user', JSON.stringify(userProfile));
      
      // Handling response on successful registration
      toast.success('Sign Up Successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Sign up error:', error);
      setApiError(
        error.response?.data?.message || 'Sign up failed! Please check your details and try again.');
      toast.warning(error.response?.data?.message || 'Sign up failed! Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render progress indicators
  const renderProgress = () => {
    return (
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
        <div className="steps-indicator">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div 
              key={index} 
              className={`step-dot ${index + 1 <= step ? 'active' : ''}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <p className="step-text">Step {step} of {totalSteps}</p>
      </div>
    );
  };

  // Render form step content
  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="step-content fade-in">
            <h3 className="step-title">Personal Information</h3>
            
            <div className="form-group inline-fields">
              <div className="form-field">
                <label htmlFor="first_name" style={{color:"#f0a500"}}>
                  <FaUser className="input-icon" /> First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
                {errors.first_name && <span className="error">{errors.first_name}</span>}
              </div>
              
              <div className="form-field">
                <label htmlFor="last_name" style={{color:"#f0a500"}}>
                  <FaUser className="input-icon" /> Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
                {errors.last_name && <span className="error">{errors.last_name}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="user_type" style={{ color: "#f0a500" }}>
                <FaIdCard className="input-icon" /> I am a...
              </label>
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
          </div>
        );
        
      case 2:
        return (
          <div className="step-content fade-in">
            <h3 className="step-title">Account Information</h3>
            
            <div className="form-group">
              <label htmlFor="username" style={{ color: "#f0a500" }}>
                <FaUser className="input-icon" /> Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" style={{ color: "#f0a500" }}>
                <FaEnvelope className="input-icon" /> Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone_number" style={{ color: "#f0a500" }}>
                <FaEnvelope className="input-icon" /> Phone Number
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
              {errors.phone_number && <span className="error">{errors.phone_number}</span>}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="step-content fade-in">
            <h3 className="step-title">Security</h3>
            
            <div className="form-group">
              <label htmlFor="password" style={{color:"#f0a500"}}>
                <FaLock className="input-icon" /> Password
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text': 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle-button" 
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" style={{color:"#f0a500"}}>
                <FaLock className="input-icon" /> Confirm Password
              </label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle-button" 
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            
            <div className="password-requirements">
              <p>Password must:</p>
              <ul>
                <li className={formData.password && formData.password.length >= 8 ? 'met' : ''}>
                  Be at least 8 characters
                </li>
                <li className={formData.password && /[a-z]/.test(formData.password) ? 'met' : ''}>
                  Include lowercase letters
                </li>
                <li className={formData.password && /[0-9]/.test(formData.password) ? 'met' : ''}>
                  Include at least one number
                </li>
              </ul>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="step-content fade-in">
            <h3 className="step-title">
              {formData.user_type === 'student' ? 'Academic Information' : 
               formData.user_type === 'lecturer' ? 'Faculty Information' : 'Admin Information'}
            </h3>
            
            <div className="form-group">
              <label htmlFor="department" style={{color:"#f0a500"}}>
                <FaBuilding className="input-icon" /> Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="CS">Computer Science</option>
                <option value="IT">Information Technology</option>
                <option value="SE">Software Engineering</option>
                <option value="IS">Information Systems</option>
              </select>
              {errors.department && <span className="error">{errors.department}</span>}
            </div>

            {formData.user_type === 'student' && (
              <>
                <div className="form-group">
                  <label htmlFor="student_id" style={{color:"#f0a500"}}>
                    <FaIdCard className="input-icon" /> Student ID
                  </label>
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

                <div className="form-group">
                  <label htmlFor="program" style={{color:"#f0a500"}}>
                    <FaUserGraduate className="input-icon" /> Program
                  </label>
                  <input
                    type="text"
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    placeholder="Enter your program e.g BSCS, IT, etc"
                    required
                  />
                  {errors.program && <span className="error">{errors.program}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="year_of_study" style={{color:"#f0a500"}}>
                    <FaUserGraduate className="input-icon" /> Year of Study
                  </label>
                  <input
                    type="text"
                    id="year_of_study"
                    name="year_of_study"
                    value={formData.year_of_study}
                    onChange={handleChange}
                    placeholder="Enter your year of study"
                    required
                  />
                  {errors.year_of_study && <span className="error">{errors.year_of_study}</span>}
                </div>
              </>
            )}

            {formData.user_type === 'lecturer' && (
              <div className="form-group">
                <label htmlFor="staff_id" style={{color:"#f0a500"}}>
                  <FaIdCard className="input-icon" /> Staff ID
                </label>
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
          </div>
        );
        
      default:
        return null;
    }
  };

  // Navigation buttons
  const renderNavButtons = () => {
    return (
      <div className="form-navigation">
        {step > 1 && (
          <button 
            type="button" 
            onClick={prevStep} 
            className="nav-button back-button"
          >
            Back
          </button>
        )}
        
        {step < totalSteps ? (
          <button 
            type="button" 
            onClick={nextStep} 
            className="nav-button next-button"
          >
            Next
          </button>
        ) : (
          <button 
            type="submit" 
            className="nav-button submit-button" 
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : 'Complete Signup'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="signup-panel">
      <div className="signup-container wizard-container">
        <div className="signup-card wizard-card">
          <img src="/images/nobgmaklogo.png" alt="maklogo" className="logo" />
          <h2 className="signup-title">Sign Up To Start</h2>
          
          {renderProgress()}
          
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            {apiError && <p className="error api-error">{apiError}</p>}
            
            {renderNavButtons()}
          </form>
          
          <p className="login-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
