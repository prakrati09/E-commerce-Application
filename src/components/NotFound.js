// src/components/NotFound.js
import React from 'react';
import { useAuth } from '../AuthContext'; // Importing the AuthContext for authentication state

const NotFound = () => {
  const { username } = useAuth(); // Get the username from AuthContext

  return (
    <div className="not-found">
      {username ? (
        <h2>404 - Page Not Found</h2>
      ) : (
        <h2>Please log in to access this page.</h2>
      )}
      <p>If you are not logged in, please <a href="/auth">log in</a>.</p>
    </div>
  );
};

export default NotFound;
