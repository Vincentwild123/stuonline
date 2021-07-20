import Axios from "./axios.js";
import config from "./axios.config.js";
// 初始化axios，并返回一个axios的实例
const httpInstance = Axios.create(config);

// 请求前拦截，一般进行一些权限的校验，如加入token或其他请求头
httpInstance.interceptors.request.use(
  async (config) => {
    // config.Authorization = 'Cxm Token'
    config.token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IueIuOeIuCIsImV4cCI6MTYyNzI4MjM3MCwidXNlcklkIjoiMSJ9.dvPcQmPum8lO791Fd5VaIexjG25259hbw1OhN9TwhHo";
    console.log(
      "%c-------------------- %caxios %c---------------------",
      "color:white",
      "color:#ADFF2F;font-size:15px;font-weight:800",
      "color:white"
    );
    console.log(
      "%c📧: %cREQUEST SEND %c(" + new Date().toLocaleTimeString() + ")",
      "color: #00CED1; font-weight:bold;font-size:15px",
      "color: yellow",
      "color: white"
    );
    console.log(
      "👇 %cThe following is the configuration of this request",
      "color:yellow"
    );
    console.dir(config);
    return config;
  },
  (error) => {
    console.log("请求错误:" + error);
    return Promise.reject(error);
  }
);

// 响应前拦截，一般进行响应数据的过来，判断是不是成功的响应
httpInstance.interceptors.response.use(
  (response) => {
    console.log(
      "%c📩: %cRESPONSE RECEIVED %c(" + new Date().toLocaleTimeString() + ")",
      "color: #00CED1; font-weight: bold;font-size:15px",
      "color: yellow",
      "color: white"
    );
    console.log(
      "👇 %cThe following is the result returned this time",
      "color:yellow"
    );
    console.dir(response); //     console.log(response);
    console.log(
      "%c-------------------- %caxios %c---------------------",
      "color:white",
      "color:#ADFF2F;font-size:15px;font-weight:800",
      "color:white"
    );
    return response;
  },
  (error) => {
    console.error("响应出错：");
    return Promise.reject(error);
  }
);

export default httpInstance;
