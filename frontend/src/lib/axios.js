import axios from 'axios';

export const Axiosinstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    withCredentials: true
});