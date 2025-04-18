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
        if (formData.user_type === 'student' && formData.email && !formData.email.endsWith('@students.mak.ac.ug')) {
          newErrors.email = 'Student email must end with @students.mak.ac.ug';
        }
        if (formData.user_type === 'lecturer' && formData.email && !formData.email.endsWith('@mak.ac.ug')) {
          newErrors.email = 'Lecturer email must end with @mak.ac.ug';
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
    