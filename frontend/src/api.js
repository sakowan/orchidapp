import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

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

class ApiService{
    static saveStripeInfo(data={}){
        return api.post(`${import.meta.env.VITE_API_URL}/payments/save-stripe-info/`, data)
    }
}

export { ApiService };
export default api;