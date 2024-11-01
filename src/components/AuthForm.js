// src/components/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Import useAuth

const AuthForm = () => {
  const { login } = useAuth(); // Get login function from context
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = `http://localhost:5000/user/${isLogin ? 'login' : 'register'}`;
      // Remove the response variable if it's not needed
      await axios.post(url, { username, password });

      // Call login to update context and localStorage
      login(username);
      setSuccess(isLogin ? 'Login successful!' : 'Registration successful! You can now log in.');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred.');
      } else {
        setError('An error occurred.');
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'New user? Register here' : 'Existing user? Login here'}
      </button>
    </div>
  );
};

export default AuthForm;
