// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error

    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        username,
        password,
      });

      // Store the JWT token (e.g., in localStorage or context)
      localStorage.setItem('token', response.data.token);
      setSuccess(true);
      console.log(response.data); // You can handle success here, e.g., redirect or show a message
    } catch (err) {
      // Handle errors
      console.error(err);
      setError('Invalid credentials. Please try again.'); // Set error message to state
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Login successful!</p>}
    </div>
  );
};

export default Login;