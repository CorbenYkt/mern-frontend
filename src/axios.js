import axios from "axios";

const instance = axios.create({
    baseURL: "https://corbenykt.ru:443",
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;