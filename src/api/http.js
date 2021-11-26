import axios from "axios";

// 全局axios配置
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.timeout = 5000
    // 添加请求拦截器
axios.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});