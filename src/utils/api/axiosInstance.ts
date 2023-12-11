

import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://10.242.251.119:3001/api',
	// baseURL: 'https://auth-app-backend-git-main-mhylos.vercel.app/api',
	// baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer undefined`
	},
	timeout: 10000,
	
	// withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default axiosInstance;
