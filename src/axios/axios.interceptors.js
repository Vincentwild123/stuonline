import Axios from "./axios.js";

// 初始化axios，并返回一个axios的实例
const httpInstance = Axios.create({
    timeout: 5000,
    baseURL: "http://localhost:3000",
});

// 请求前拦截，一般进行一些权限的校验，如加入token或其他请求头
httpInstance.interceptors.request.use(
    async (config) => {
            // config.Authorization = 'Cxm Token'
			config.token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjAyMjA5NzYsInVzZXJJZCI6IjEifQ.qWmjN4r_0QX3orwlgUTF4CpGSkO6k7Kex2aS7JXU1dQ';
       //     console.log("请求配置：");
            return config;
        },
        (error) => {
            //console.log("请求错误:" + error);
        }
);

// 响应前拦截，一般进行响应数据的过来，判断是不是成功的响应
httpInstance.interceptors.response.use(
    (response) => {
        console.log("响应数据：");
   //     console.log(response);
        return response;
    },
    (error) => {
        console.error("响应出错：");
        return Promise.reject(error);
    }
);

export default httpInstance;