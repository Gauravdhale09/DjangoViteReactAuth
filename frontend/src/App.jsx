import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getSession } from './component/getSession';
import { logout } from './component/logout';
import Login from './component/login';
import Home from './component/Home';
import MaterialsList from './component/MaterialsList';
import WhoAmI from './component/whoami';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getSession(); // Await the response
        setIsAuthenticated(response.isAuthenticated);
        console.log('Authenticated (check auth function):', response.isAuthenticated);
      } catch (error) {
        console.error('Error fetching session:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after checking auth
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (authenticated) => {
    setIsAuthenticated(authenticated);
    console.log('Login successful: handle login function', authenticated);
  };

  const handleLogout = () => {
    try {
      logout();
      setIsAuthenticated(false);
      alert('You have been logged out.');
      
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth
  }

  return (
    <Routes>
      <Route path="/login" element={<Login login={handleLogin} />} />
      {isAuthenticated ? (
        <>
          <Route path="/home" element={<Home logout={handleLogout} />} />
          <Route path="/materialslist" element={<MaterialsList />} />
          <Route path="/whoami" element={<WhoAmI />} /> 
          <Route path="*" element={<Navigate to="/home" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default App;
