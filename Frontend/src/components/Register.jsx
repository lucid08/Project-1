import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState(''); // Added state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log(name, password);
    

    try {
      const res = await axios.post('http://localhost:5000/api/v1/user/register', { 
        name: name, // Send name
        email: email, 
        password : password
      });
      console.log(res);
      
    
      alert('Registration successful. Please log in.');
      navigate('/');
    } catch (error) {
      console.log("hiii");
      
      alert('Registration failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center  min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg w-80 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <input
          type="text"
          placeholder="Name" // Input for name
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button onClick={handleRegister} className="w-full cursor-pointer bg-green-500 text-white p-2 hover:scale-105 rounded">
          Register
        </button>
        <p className="text-sm mt-4">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register; 