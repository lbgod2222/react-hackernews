/* eslint-disable */

import axios from 'axios'
let axiosInstance = axios.create({
    baseURL: '/',
    timeout: 25000,
})

// response 拦截器
axiosInstance.interceptors.response.use(
    response => {
        /**
         * code为非2000是抛错 可结合自己业务进行修改
         */
        const res = response.data
        // 错误信息提示过滤
        // codeCheck(res)
        if (res.code == 2 || res.status === 403) {
            window.location.href = '/login'
        }
        
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

const fetch = (url, data, headers = {}, method = 'get') => {
    if (method === 'get') {
        return axiosInstance({
            url: url,
            method: method.toLowerCase(),
            params: data
        })
    } else if (method === 'upload') {
        return axiosInstance({
            url: url,
            method: 'post',
            data: data
        })
    } else {
        return axiosInstance({
            url: url,
            method: method.toLowerCase(),
            data: data
        })
    }
}

export {
    fetch
}