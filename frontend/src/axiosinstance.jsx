// axiosinstance.js
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  headers: {
    'X-CSRFToken': cookies.get('csrftoken'),
  },
});

export default AxiosInstance;
