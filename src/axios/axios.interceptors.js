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
    config.token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjAzNzY5MTAsInVzZXJJZCI6IjEifQ.mKVnF9NtU55Ea0wDZj6mWzqFPo_SGz08Iox0_eeQ5kw";
    console.log('%c  -------------------- %caxios %c---------------------',"color:white","color:#ADFF2F","color:white")
    console.log(
      "  %cINFO:%cREQUEST SEND %c(" + new Date().toLocaleTimeString() + ")",
      "color: #00CED1; font-weight:bold;font-size:15px",
      "color: yellow",
      "color: white"
    );
    console.log(
      "  %cThe following is the configuration of this request",
      "color:yellow"
    );
    console.dir(config);
    return config;
  },
  (error) => {
    //console.log("请求错误:" + error);
  }
);

// 响应前拦截，一般进行响应数据的过来，判断是不是成功的响应
httpInstance.interceptors.response.use(
  (response) => {
    console.log(
      "  %cINFO:%cRESPONSE RECEIVED %c(" + new Date().toLocaleTimeString() + ")",
      "color: #00CED1; font-weight: bold;font-size:15px",
      "color: yellow",
      "color: white"
    );
    console.log(
      "  %cThe following is the result returned this time",
      "color:yellow",
    );
    console.dir(response); //     console.log(response);
    console.log('%c  -------------------- %caxios %c---------------------',"color:white","color:#ADFF2F","color:white")
    return response;
  },
  (error) => {
    console.error("响应出错：");
    return Promise.reject(error);
  }
);

export default httpInstance;
