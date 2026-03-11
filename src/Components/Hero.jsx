import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Welcome to InnerCircle</h1>
          <p className="hero-subtitle">
            Connect, Share, and Grow with Our Community
          </p>
          <p className="hero-description">
            Join thousands of users who are already part of our thriving community. 
            Sign up today and start your journey with us.
          </p>
          
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Log In
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-illustration">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
            <div className="circle circle-4"></div>
            <div className="circle circle-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
