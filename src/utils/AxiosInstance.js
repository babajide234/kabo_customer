import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `https://api.12basketsfoods.com/`,
});


export default axiosInstance;
