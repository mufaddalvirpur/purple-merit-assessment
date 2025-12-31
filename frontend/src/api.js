import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-mufaddal.onrender.com/api', // Point to your backend
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;