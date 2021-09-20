import apiWrapper from "../../utils/apiWrapper";
import {
	checkStatusCode
} from "../../utils/checkers";
import axios from "../../axios/axios.interceptors";
//检查用户是否为本校学生
export async function checkIfIsStudent(account) {
	const res = await apiWrapper("/user/checkAuth/" + account, "GET");
	return res;
}
//获取验证码
export async function getVerCode(account) {
	const res = await apiWrapper("/user/sendLogonMail/" + account, "POST");
	return res;
}
//注册
export async function register({
	account,
	password,
	vercode
}) {
	const res = await axios.post("/user/register", {
		userAccount: account,
		userPwd: password,
		checkCode: vercode,
	});
	let message;
	const {
		status
	} = res.data;
	switch (status) {
		case 400:
			message = "注册失败，参数错误";
			break;
		case 402:
			message = "验证码过期";
			break;
		case 412:
			message = "用户已经注册过";
			break;
		default:
			message = "异常状态码";
	}
	return {
		message,
		token: res.data.token,
	};
}

export async function loginWithAcctPass({
	account,
	password
}) {
	const res = await axios.post("/user/login", {
		userAccount: account,
		userPwd: password,
	});
	const {
		status
	} = res.data;
	let message;
	switch (status) {
		case 400:
			message = "登录信息残缺";
			break;
		case 401:
			message = "账号或密码错误";
			break;
		default:
			message = "异常状态码";
	}
	return {
		token: res.data.data,
		message,
	};
}

export async function getUserInfo(token) {
	const res = await axios.get("/user/fresh", null, {
		token: token,
	});
	return res.data;
}
