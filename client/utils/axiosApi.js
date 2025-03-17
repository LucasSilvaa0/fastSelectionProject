import axios from 'axios';

const axiosApi = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export default axiosApi;
