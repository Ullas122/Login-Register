import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateName = (name) => {
    return name.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(name);
  };

  const validateEmail = (email) => {
    // Must be lowercase letters/numbers followed by exactly @gmail.com
    const emailRegex = /^[a-z0-9]+@gmail\.com$/;
    const isValid = emailRegex.test(email);
    
    // Additional check: ensure it doesn't end with any variation like .co, .net, etc.
    if (email && !email.endsWith('@gmail.com')) {
      return false;
          return isValid;

    }
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasUpperCase && hasSpecialChar && hasNumber;
  };


  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 3 letters (letters and spaces only)';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email must be lowercase letters/numbers followed by @gmail.com';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must contain uppercase letter, special character, and number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Remove error when user starts typing
    if (touched[name]) {
    setErrors(prev => ({
     ...prev,
     [name]: ''
    }));
  }

  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    const newErrors = { ...errors };
    if (name === 'name') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (!validateName(formData.name)) {
        newErrors.name = 'Name must be at least 3 letters (letters and spaces only)';
      }
    } else if (name === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Email must be lowercase letters/numbers followed by @gmail.com';
      }
    } else if (name === 'password') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must contain uppercase letter, special character, and number';
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Login successful
      onLogin({
        name: formData.name,
        email: formData.email
      });
      navigate('/welcome');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && touched.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
              placeholder="Enter your mail address"
            />
            {errors.email && touched.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && touched.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        {/* Link to Register */}
        <div className="auth-footer">
          <p className="auth-link-text">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
