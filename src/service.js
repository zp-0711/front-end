import axios from 'axios'

const service = axios.create({
    // baseURL会自动加在接口地址上
    // baseURL: "https://demo.crudapi.cn/api/business",
    baseURL: "/api",
    timeout: 3000, // 指定请求的超时毫秒数，如果请求超过这个时间，那么请求就会中断。
    headers: {
        'Content-type': 'application/json;charset=utf-8'
    },
    auth: {
        username: 'jianan',
        password: 'jianan0814'
    }
})

// 添加请求拦截器
service.interceptors.request.use(function(config) {
    // 在发送请求前做些什么
    return config
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做些什么
    return response
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default service