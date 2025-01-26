import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to access the dashboard.');
      navigate('/');
    }
  }, [navigate]);

  return children;
};

export default AuthGuard;
