import axios from "../../../axios/axios.interceptors.js"
import { checkStatusCode } from "../../../utils/checkers.js";
import {
  showLoading,
  hideLoading,
  showToast,
  getStorage,
  setStorage,
} from "../../localAPIs/index.js";
//检查用户是否为本校学生
export async function isStudent(account) {
  try {
    const data = await axios.get("/user/checkAuth/" + account);
    if (checkStatusCode(data)) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error("检测身份接口错误");
  }
}
//获取验证码
export async function getVerCode(account) {
  showLoading("验证码发送中...");
  try {
    const data = await axios.post("/user/sendLogonMail/" + account);
    hideLoading();
    if (checkStatusCode(data)) {
      showToast("验证码已发送至你的校园邮箱，注意查收！");
      return;
    }
    throw new Error("验证码发送失败");
  } catch (e) {
    hideLoading();
    showToast("请检查邮箱是否注册过");
    throw e;
  }
}
//注册
export async function register({ account, password, vercode }) {
  showLoading("正在吐血注册中...");
  try {
    const data = await axios.post("/user/register", {
      userAccount: account,
      userPwd: password,
      checkCode: vercode,
    });
    hideLoading();
    const ret = {
      token: undefined,
    };
    if (data && data.data) {
      let { status } = data.data;
      switch (status) {
        //注册成功
        case 200:
          ret.token = data.data.token;
          ret.message = "注册成功🎉,请到隔壁登录";
          break;
        //注册失败，参有错误
        case 400:
          ret.message = "注册失败，参数错误";
          break;
        //验证信息过期
        case 402:
          ret.message = "验证码过期";
          break;
        //用户已经注册过
        case 412:
          ret.message = "用户已经注册过";
          break;
        default:
          throw new Error("异常状态码");
      }
    } else throw new Error("注册接口出现问题");
    return ret;
  } catch (e) {
    throw e;
  }
}
//登录
//两种登录方法
//1.token自动登录
//2.账号密码登录
export async function loginWithToken() {
  const token = getStorage("userToken");
  //本地没有token，直接返回
  if (!token) return false;
  const data = await axios.get("/user/login/default", null, {
    token: token,
  });
  if (checkStatusCode(data)) {
    setStorage("userToken", data.data.data);
    return true;
  }
  return false;
}
export async function loginWithAcctPass({ account, password }) {
  try {
    showLoading("极速登录中...");
    const data = await axios.post("/user/login", {
      userAccount: account,
      userPwd: password,
    });
    hideLoading()
    const ret = {
      message: "登陆成功",
      token: undefined,
    };
    const { status } = data.data;
    switch (status) {
      case 200:
        ret.token = data.data.data;
        break;
      case 400:
        ret.message = "登录信息残缺";
      case 401:
        ret.message = "账号或密码错误";
      default:
        throw new Error("异常状态码");
    }
    return ret;
  } catch (e) {
    throw e;
  }
}
