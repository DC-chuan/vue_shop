import axios from "axios";

import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.timeout = 5000

// 封装login
export const login = ((data) => {
    return axios({
        method: 'post',
        url: 'login',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data)
    })
})