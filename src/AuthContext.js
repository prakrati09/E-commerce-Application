// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const login = (newUsername) => {
    localStorage.setItem('username', newUsername);
    setUsername(newUsername);
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token'); // Clear token on logout
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
