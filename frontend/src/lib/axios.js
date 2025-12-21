import axios from 'axios';

export const Axiosinstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://arshit-chat-app-backend.vercel.app/api",
    withCredentials: true
});