

// component/getSession.js
import AxiosInstance from '../axiosinstance';
export const getSession = async () => {
  try {
    const response = await AxiosInstance.get('auth/session'); // Adjust the API endpoint as needed
    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching session:', error);
    throw error;
  }
};
