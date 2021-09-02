import axios from "../../axios/axios.interceptors.js";
import { checkStatusCode } from "../../utils/checkers.js";
import {
  showLoading,
  hideLoading,
  showToast,
  getStorage,
  setStorage,
} from "../../API/common";

//检查用户是否为本校学生
export async function checkIfIsStudent(account) {
  try {
    const res = await axios.get("/user/checkAuth/" + account);
    return checkStatusCode(res) ? true : false;
  } catch (e) {
    throw new Error("接口/user/checkAuth/错误");
  }
}
//获取验证码
export async function getVerCode(account) {
  try {
    const data = await axios.post("/user/sendLogonMail/" + account);
    if (checkStatusCode(data)) {
      showToast("验证码已发送至你的校园邮箱，注意查收！");
      return;
    }
    const message = data.data.data;
    throw new Error(message);
  } catch (e) {
    throw e;
  }
}
//注册
export async function register({ account, password, vercode }) {
  try {
    const data = await axios.post("/user/register", {
      userAccount: account,
      userPwd: password,
      checkCode: vercode,
    });
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

export async function loginWithAcctPass({ account, password }) {
  try {
    const data = await axios.post("/user/login", {
      userAccount: account,
      userPwd: password,
    });
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
        break;
      case 401:
        ret.message = "账号或密码错误";
        break;
      default:
        throw new Error("异常状态码");
    }
    return ret;
  } catch (e) {
    throw e;
  }
}
