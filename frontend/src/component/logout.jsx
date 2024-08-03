import AxiosInstance from '../axiosinstance';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const logout = async () => {
  try {
    const response = await AxiosInstance.post('auth/logout/', {}, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': cookies.get('csrftoken'),
      },
    });

    if (response.status === 200) {
      cookies.remove('sessionid'); 
      cookies.remove('username'); 
      cookies.remove('csrftoken');
      console.log('Logout successful');
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
