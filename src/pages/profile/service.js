import axios from "../../axios/axios.interceptors.js";
import { checkStatusCode } from "../../utils/checkers.js";
export async function getUserInfo(token) {
  const data = await axios.get("/user/fresh", null, {
    token: token,
  });
  if (checkStatusCode(data)) {
    return data.data;
  }
}
