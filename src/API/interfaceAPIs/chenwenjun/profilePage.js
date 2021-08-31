import axios from "../../../axios/axios.interceptors.js";
import { checkStatusCode } from "../../../utils/checkers.js";
export async function getUserInfo(token) {
  const data = await axios.get("/user/fresh", null, {
    token: token,
  });
  const userData = {};
  if (checkStatusCode(data)) {
    const { userId, userName, userPostcount, userLikepost } = data.data.user;
    userData.name = userName;
    userData.ID = userId;
  }
}
