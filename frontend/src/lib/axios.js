import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:3000/api";
  }
  
  return import.meta.env.VITE_API_URL || "https://arshit-chat-app-backend.vercel.app/api";
};

export const Axiosinstance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true
});