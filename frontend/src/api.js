import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000' // Fallback to default URL if REACT_APP_API_URL is not set
});

// Add a request interceptor to include the access token
api.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem(ACCESS_TOKEN);

        // Check if token is about to expire and refresh it
        if (token && isTokenExpired(token)) {
            token = await refreshAccessToken();  // Refresh access token if expired
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Helper function to check token expiration
const isTokenExpired = (token) => {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    const now = Math.floor(Date.now() / 1000);
    return now >= expiry;
};

// Helper function to refresh access token
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/refresh/`, {
            refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem(ACCESS_TOKEN, access);
        return access;
    } catch (error) {
        console.error('Failed to refresh token', error);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        throw error;
    }
};

export default api;