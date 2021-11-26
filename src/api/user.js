import axios from "axios";
import qs from 'qs'

/**
 * 封装 user 相关信息 和 获取 user相关数据
 */
// 引入默认配置信息
import './http'

// 封装login
export const login = (data => {
        return axios({
            method: 'post',
            url: 'login',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: qs.stringify(data)
        })
    })
    // 封装获取用户数据 
export const GetUsers = (data => {
    return axios({
        method: 'get',
        url: 'users',
        params: {
            query: data.query,
            pagenum: data.pagenum,
            pagesize: data.pagesize
        }
    })
});
// 封装 用户状态改变
export const ChangeState = (data => {
    return axios({
        method: 'put',
        url: `users/${data.id}/state/${data.state}`,
    })
})

// 封装添加新用户请求
export const addUser = (data => {
    return axios({
        method: 'post',
        url: 'users',
        data: qs.stringify(data)
    })
})

// 封装根据 ID值获取用户数据

export const getUserById = (data => {
    return axios({
        method: 'get',
        url: `users/${data}`,
    })
})

// 根据ID值获取用户数据
export const editUserById = (data => {
    return axios({
        method: 'put',
        url: `users/${data.id}`,
        data: {
            email: data.email,
            mobile: data.mobile
        }
    })
})

// 根据ID删除单个用户
export const DeleteById = (data => {
    return axios({
        method: 'delete',
        url: `users/${data}`,
    })
})