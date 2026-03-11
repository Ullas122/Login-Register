import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = ({ user }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-text">
          <h1 className="welcome-title">Welcome, {user.name}! </h1>
          <p className="welcome-subtitle">
            You've Successfully Joined InnerCircle
          </p>
          <p className="welcome-description">
            Thank you for joining our community! We're excited to have you on board. 
            Connect with thousands of members, share your thoughts, and grow together with us.
          </p>
          

          <div className="welcome-buttons">
            <Link to="/hero" className="btn btn-primary">
              Explore Community
            </Link>
            <Link to="/hero" className="btn btn-secondary">
              Invite Friends
            </Link>
          </div>
        </div>

        <div className="welcome-image">
          <div className="welcome-illustration">
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

      
};

export default Welcome;

