import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://10.242.251.119:3004/api',
	// baseURL: 'https://auth-app-backend-git-main-mhylos.vercel.app/api',
	// baseURL: process.env.BASE_URL,
	timeout: 10000,
	// withCredentials: true,
});

export default axiosInstance;
