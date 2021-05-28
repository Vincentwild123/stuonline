import axios from "../../../../axios/axios.interceptors.js";
import { checkStatusCode } from "../../../../utils/checkers.js";
import {
  showLoading,
  hideLoading,
  showToast,
} from "../../../localAPIs/index.js";
export function isStudent(account) {
  axios
    .get("/user/checkAuth/" + account)
    .then((data) => {
      return checkStatusCode(data) ? true : false;
    })
    .catch((err) => {
      throw new Error("检测学生身份失败");
    });
}

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
    showToast("发生了一些错误");
    throw e;
  }
}
