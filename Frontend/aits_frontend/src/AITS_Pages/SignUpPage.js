import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';
import { toast } from "react-toastify";
//import {success} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEye,FaEyeSlash } from 'react-icons/fa';



const SignUpPage = () => {
  const navigate = useNavigate();
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
    user_type: 'student',//default user is student
    program: '',
    year_of_study: '',
    department: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () =>{
    setShowConfirmPassword(!showConfirmPassword)
  };


//To valiadte and ensure a strong password is created by the user
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

  // To validate the form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.phone_number)newErrors.phone_number = 'Please enter yout telephone number.'
    if (!formData.student_id && formData.user_type === 'student') {
      newErrors.student_id = 'Student ID is required';
    }
    if (!formData.staff_id && formData.user_type === 'lecturer') {
      newErrors.staff_id = 'Staff ID is required';
    }
    if (!formData.program && formData.user_type === 'student'){ 
      newErrors.program = 'Program is required';
    }
    if (!formData.year_of_study && formData.user_type === 'student'){
      newErrors.year_of_study = 'Year of study is required';
      toast.warning('Year of study must be an figure');
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email has an invalid format';
      toast.warning('Email has an invalid format');
    }
    const passwordError = validatePassword(formData.password);
    if (passwordError) { newErrors.password = passwordError;  
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match!';
    }
    setErrors(newErrors);
    //toast.warning('Please fix the highlighted errors before submiting.')
    return Object.keys(newErrors).length === 0;
    
  };

  // To handle form on submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // If the form has errors, stop submission

      setLoading(true);
      setApiError('');

      //Endpoint based on user 
      
      const endpoint = `https://kennedymutebi7.pythonanywhere.com/auth/register/${formData.user_type}`;
      console.log("Registering as:", formData.user_type);
      console.log("Endpoint:", endpoint);

      
      //Prepare data to be sent to the server
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
      console.log("Data to be sent:", dataToSend); // Log data to verify

      try {
        const response = await axios.post(endpoint, dataToSend,{
          headers: { 'Content-Type': 'application/json' }
        });
        console.log("Response:", response.data); // Log response for debugging

        //Storing certain user details in local storage for profile display
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
        
       //Handling response on successful registration
       toast.success('Sign Up Successful! Please login.');
       //alert('SIGNUP SUCCESSFUL');
       
       navigate('/login');
     } catch (error) {
       console.error('Sign up error:', error);
       setApiError(
        error.response?.data?.message ||'Sign up failed! Please check your details and try again.');
        toast.warning(error.response?.data?.message || 'Sign up failed! Please check your details and try again.');
     } finally {
     setLoading(false);
   }
 };

  return (
    <div className="signup-panel">
    <div className="signup-container">
      <div className="signup-card">
        <img src='/images/nobgmaklogo.png'alt='maklogo' />
        <h2 className="signup-title">Sign Up To Start</h2>
        <form onSubmit={handleSubmit}>

          {/* First Name */}
          <div className="form-group inline-fields">
            <div className="form-field">
              <label htmlFor="first_name" style={{color:"#f0a500"}}>First Name</label>
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
          </div>

          {/*Last name */}
          <div className="form-group inline-fields">
            <div className="form-field">
              <label htmlFor="last_name" style={{color:"#f0a500"}}>Last Name</label>
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

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username" style={{color:"#f0a500"}}>Username</label>
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
            <label htmlFor="email" style={{color:"#f0a500"}}>Email Address</label>
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
          {/*Phone number */}
          <div className='form-group'>
            <label htmlFor='phone_number'  style={{color:"#f0a500"}}>Telephone Number</label>
            <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder='Enter your telephone number.'
            />
            {errors.phone_number && <span className='error'>{errors.phone_number}</span>}
          </div>
             {/* User Type */}
             <div className="form-group">
            <label htmlFor="user_type" style={{color:"#f0a500"}}>Type Of User</label>
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

          {/* Password  and confirm password*/}
          <div className="form-group inline-fields">
            <div className="form-field">
              <label htmlFor="password" style={{color:"#f0a500"}}>Password</label>
              <div className='password-input-container'>
              <input
                type={showPassword ? 'text': 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button type="button" className='password-toggle-button' onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash/>:<FaEye/>}</button>
              {errors.password && <span className="error">{errors.password}</span>}

              </div>
            </div>
            <div className="form-field">
              <div className='password-input-container'>
              <label id='username' htmlFor="confirmPassword" style={{color:"#f0a500"}}>Confirm Password</label>
              <input
                type={showConfirmPassword ? 'text':'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <button type="button" className='password-toggle-button' onClick={toggleConfirmPasswordVisibility}>{showConfirmPassword ?<FaEyeSlash/>:<FaEye/>}</button>
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          {/* Program */}
          <div className="form-group">
              <label htmlFor="program" style={{color:"#f0a500"}}>Program (Compulsory for Student users)</label>
              <input
                type="text"
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                placeholder="Enter your program e.g BSCS, IT, etc"
              />
            </div>

            {/* Student ID */}
            {formData.user_type === 'student' && (
              <div className="form-group">
                <label htmlFor="student_id" style={{color:"#f0a500"}}>Student ID</label>
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
                <label htmlFor="staff_id" style={{color:"#f0a500"}}>Staff ID</label>
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
              <label htmlFor="year_of_study" style={{color:"#f0a500"}}>Year of Study (Compulsory for Student users)</label>
              <input
                type="text"
                id="year_of_study"
                name="year_of_study"
                value={formData.year_of_study}
                onChange={handleChange}
                placeholder="Enter your year of study"
              />
            </div>


          {/* Department */}
          <div className="form-group" id='department'>
            <label htmlFor="department" style={{color:"#f0a500"}}>Department (like CS )</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter your department e.g CS, IT, etc"
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