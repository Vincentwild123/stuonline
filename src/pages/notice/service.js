import axios from "../../axios/axios.interceptors.js";
import { checkStatusCode } from "../../utils/checkers.js";
import {
  showLoading,
  hideLoading,
  showToast,
  getStorage,
  setStorage,
} from "../../API/common";

// 获取用户未读通知数量
export async function getUserNoticeNumber() {
  try {
    const res = await axios.get("/notice/getNoticeCount");
    if (checkStatusCode(res)) {
        return res.data;
    }
  } catch (e) {
    throw new Error("接口/notice/getNoticeCount错误");
  }
}
