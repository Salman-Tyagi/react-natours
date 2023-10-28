import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-react-natours.onrender.com',
  timeout: 10000,
});

instance.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
