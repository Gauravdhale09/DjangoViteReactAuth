// whoami.jsx
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../axiosinstance';
const WhoAmI = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await AxiosInstance.get('auth/whoami/', { withCredentials: true });
        setUserInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user info', error);
        setError(error.message);
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Who Am I</h1>
      <p>User Info: {JSON.stringify(userInfo)}</p>
    </div>
  );
};

export default WhoAmI;
