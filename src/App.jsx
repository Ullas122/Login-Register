import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Hero from './Components/Hero';
import Login from './Components/Login';
import Register from './Components/Register';
import Welcome from './Components/Welcome';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleLogin} />} />
        <Route path="/welcome" element={user ? <Welcome user={user} /> : <Hero />} />
      </Routes>
    </Router>
  );
};

export default App;