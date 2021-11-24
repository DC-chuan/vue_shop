import axios from "axios";

import qs from 'qs'

const http = axios.create({
    baseURL: 'http://139.196.94.15:8085',
    timeout: 5000,
});
// 暴露 http 默认配置
export default http

// 封装login
export const login = ((data) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data)
    })
})