<<<<<<< HEAD
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
            console.log("请求配置：");
            console.log(config);
            return config;
        },
        (error) => {
            console.log("请求错误:" + error);
        }
);

// 响应前拦截，一般进行响应数据的过来，判断是不是成功的响应
httpInstance.interceptors.response.use(
    (response) => {
        console.log("响应数据：");
        console.log(response);
        return response;
    },
    (error) => {
        console.error("响应出错：");
        return Promise.reject(error);
    }
);

export default httpInstance;
=======
import instance from './instance'
//define interceptor
//add a request interceptor
instance.interceptors.request.use(function (config) {
    //do something before send request
    let date = new Date().toLocaleTimeString();
    console.log("%c%s", "color:black;font-size:12px;font-weight:800", "Request Send " + "(" + date + ")")
    console.dir(config);
    return config;
}, function (error) {
    // do something when error
    return Promise.reject(error);
});
// add a response interceptor
instance.interceptors.response.use(function (response) {
    // do something after receive response
    let date = new Date().toLocaleTimeString();
    console.log("%c%s", "color:black;font-size:12px;font-weight:800", "Response Receive " + "(" + date + ")")
    console.dir(response)
    return response.data;
}, function (error) {
    // do something when error
     return Promise.reject(error);
});

export default instance;
>>>>>>> 431ea731e4effdf94b192f780614fdb7249fa46b
