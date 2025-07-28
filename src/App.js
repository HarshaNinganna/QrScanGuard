import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import login from './pages/login';
import signup from './pages/signup';
import Home from './pages/Home';
import History from './pages/History';
import Starred from './pages/Starred';
import Navbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem('user'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/history" element={user ? <History /> : <Navigate to="/" />} />
        <Route path="/starred" element={user ? <Starred /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={user ? '/home' : '/'} />} />
      </Routes>
    </Router>
  );
};

export default App;
