import axios from 'axios';

const Axiosinstance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default Axiosinstance;
