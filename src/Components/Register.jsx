import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    // Must be lowercase letters/numbers followed by exactly @gmail.com
    const emailRegex = /^[a-z0-9]+@gmail\.com$/;
    const isValid = emailRegex.test(email);
    
    // Additional check: ensure it doesn't end with any variation like .co, .net, etc.
    if (email && !email.endsWith('@gmail.com')) {
      return false;
    }
    
    return isValid;
  };

  const validateMobileNumber = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const validateFullName = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return { valid: false, message: 'Full Name is required' };
    if (trimmedName.length < 3) return { valid: false, message: 'Name must be at least 3 characters' };
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) return { valid: false, message: 'Name can only contain letters and spaces' };
    return { valid: true };
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasUpperCase || !hasSpecialChar || !hasNumber) {
      return { valid: false, message: 'Password must contain uppercase letter, special character, and number' };
    }
    return { valid: true };
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    const nameValidation = validateFullName(formData.fullName);
    if (!nameValidation.valid) {
      newErrors.fullName = nameValidation.message;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email must be lowercase letters/numbers followed by @gmail.com';
    }

    // Mobile Number validation
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.message;
      }
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    if (name === 'fullName') {
      const nameValidation = validateFullName(formData.fullName);
      if (!nameValidation.valid) {
        newErrors.fullName = nameValidation.message;
      }
    } else if (name === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Email must be lowercase letters/numbers followed by @gmail.com';
      }
    } else if (name === 'mobileNumber') {
      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = 'Mobile Number is required';
      } else if (!validateMobileNumber(formData.mobileNumber)) {
        newErrors.mobileNumber = 'Mobile number must be 10 digits';
      }
    } else if (name === 'password') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else {
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.valid) {
          newErrors.password = passwordValidation.message;
        }
      }
    } else if (name === 'confirmPassword') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Registration successful
      onRegister({
        name: formData.fullName,
      });
      navigate('/welcome');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.fullName && touched.fullName ? 'error' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.fullName && touched.fullName && (
              <span className="error-message">{errors.fullName}</span>
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
              placeholder="Enter your mail Id"
            />
            {errors.email && touched.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Mobile Number Field */}
          <div className="form-group">
            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.mobileNumber && touched.mobileNumber ? 'error' : ''}`}
              placeholder="Enter your mobile number"
              maxLength="10"
            />
            {errors.mobileNumber && touched.mobileNumber && (
              <span className="error-message">{errors.mobileNumber}</span>
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
              placeholder="Give a strong password"
            />
            {errors.password && touched.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        {/* Link to Login */}
        <div className="auth-footer">
          <p className="auth-link-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
                Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;