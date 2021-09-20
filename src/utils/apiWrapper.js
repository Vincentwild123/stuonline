import axios from "../axios/axios.interceptors.js";
import { checkStatusCode } from "./checkers.js";
export default async function apiWrapper(url, methods, ...args) {
  const res = await axios[methods.toLowerCase()](url);
  if (checkStatusCode(res)) return res;
  const err = new Error();
  err.message = res.data.data || "返回值出错";
  throw err;
}
