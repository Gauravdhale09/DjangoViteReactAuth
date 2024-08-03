// Home.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <h1>Hello!</h1>
      <button onClick={() => navigate('/whoami')}>WhoAmI</button>
      <button onClick={() => navigate('/materialslist')}>Materials List</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
