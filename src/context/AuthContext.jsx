import React, { createContext, useContext, useState } from 'react';
import jwtDecode from 'jwt-decode';


//CONTEXT CREATED
const AuthContext = createContext();

//AUTH PROVIDER CREATED
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  //LOGIN FUNCTION
  const login = (token) => {
    if (!token || typeof token !== 'string') {
      console.error("Invalid token provided to login:", token);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (err) {
      console.error("Token decoding failed:", err.message);
    }
  };


  //REGISTRATION FUNCTION
  const register = (userData) => {

    const token = userData.token;
    login(token);
  };

  // LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
export const useAuth = () => {
  return useContext(AuthContext);
};