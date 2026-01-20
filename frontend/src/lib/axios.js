import axios from 'axios';

export const Axiosinstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api/" : "production_url",
    withCredentials: true
});