import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="logo">InnerCircle</Link>

      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        
        {!user ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link register-btn">Register</Link>
          </>
        ) : (
          <>
            <span className="user-welcome">Welcome, {user.name}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

