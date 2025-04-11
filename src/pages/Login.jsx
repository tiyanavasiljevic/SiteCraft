
import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';


//LOGIN FUNCTION
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   const navigate = useNavigate();
   const { login } = useAuth(); 
    
   const handleSubmit = async (e) => {
      e.preventDefault();
      
    

    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, password });
      const token = response.data.token;// STORE TOKEN TO LOCALSTORAGE
      
      localStorage.setItem('token', token);
      login(token);
      
      navigate('/dashboard'); 
  
    } catch (error) {
      console.error('Login error:',error);
  }
};
  
    return (
      <div>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
  
  export default Login;