// axios 封装
import axios from "axios";
import { getToken } from "./index";

// 1. 根域名配置 baseUrl
// 2. 超时时间 timeout
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// 3. 请求拦截器, 响应拦截器
// 添加请求拦截器 在请求发送之前拦截, 插入自定义的配置.
request.interceptors.request.use(
  (config) => {
    //操作config 注入自己的token数据
    //operate config and inject token data
    //1. 获取token
    //1. get token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器 在响应返回之前拦截, 处理返回的数据.
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export { request };
