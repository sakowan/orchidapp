import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

// No need token to access
export const api_any = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
})

// Protected with tokens
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
})

// Add auth token to all api requests between FE and BE
api.interceptors.request.use(
    // Look inside local storage and see if there is an access token
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        // Add JWT token by creating an authorization header to the request
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api;