import axios from "../../axios/axios.interceptors";
import { checkStatusCode } from "../../utils/checkers.js";
import {
  getStorage,
  setStorage,
} from "../../API/common.js";
//登录
//两种登录方法
//1.token自动登录
//2.账号密码登录
export async function ifTokenValid(token) {
  const res = await axios.get("/user/login/default", null, {
    token: token,
  });
  return checkStatusCode(res);
}
//获取表单上传token
export async function getFormUploadToken() {
  try {
    const data = await axios.get("/user/auth", null, {
      token: getStorage("userToken"),
    });
    const { status } = data.data;
    let token = undefined;
    switch (status) {
      case 200:
        token = data.data.data;
        break;
      case 400:
      case 401:
      default:
        throw new Error("异常状态码");
    }
    return token;
  } catch (e) {
    throw e;
  }
}
