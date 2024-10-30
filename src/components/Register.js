import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New success state

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    setSuccess(''); // Clear any previous success message

    try {
      const response = await axios.post('http://localhost:5000/user/register', {
        username,
        password,
      });
      console.log('Registration successful:', response.data);
      setSuccess('Registration successful!'); // Set success message
    } catch (error) {
      console.error('Registration error:', error); // Log the full error object
      if (error.response) {
        console.error('Error response:', error.response);
        setError(error.response.data.message || 'An error occurred during registration.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('No response received from server.');
      } else {
        console.error('Error message:', error.message);
        setError('Error setting up registration.');
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
    </form>
  );
};

export default Register;
