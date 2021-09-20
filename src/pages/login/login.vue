<template>
	<view class="container">
		<view class="bg_image">
			<view class="tips">
				<view class="hi"> 嗨！同学 </view>
				<view class="cur_tips">
					{{ Tips[isLogin ? "LOGIN" : "REGISTER"] }}
				</view>
			</view>
		</view>
		<view class="content_box">
			<view class="switcher">
				<view @click="toggle" :class="{ active_switcher: isLogin }" class="btn_login">
					登录
				</view>
				<view @click="toggle" class="btn_register" :class="{ active_switcher: !isLogin }">
					注册
				</view>
			</view>
			<view class="content">
				<view v-if="isLogin">
					<LoginForm @LOGIN="onLogin" v-bind="LoginFormConfig"></LoginForm>
				</view>
				<view v-else>
					<RegisterForm @GETCODE="onGetCode" @REGISTER="onRegister" v-bind="RegisterFormConfig">
					</RegisterForm>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import LoginForm from "./components/LoginForm.vue";
	import RegisterForm from "./components/RegisterForm.vue";
	import pageUrls from '../../API/pageUrls.js'
	import { checkObjectNoEmpty } from '../../utils/checkers.js'
	import {
		checkIfIsStudent,
		register,
		getVerCode,
		loginWithAcctPass,
		getUserInfo,
	} from "./service.js";
	import {
		showToast,
		setStorage,
		showLoading,
		hideLoading,
	} from "../../API/common.js";
	import {
		LoginFormConfig,
		RegisterFormConfig,
		Tips
	} from "./config.js";
	export default {
		data() {
			return {
				isLogin: true,
				//登录组件配置
				LoginFormConfig,
				//注册组件配置
				RegisterFormConfig,
				//发送邮件冷却倒计时
				countDown: 10,
				Tips,
			};
		},
		components: {
			LoginForm,
			RegisterForm,
		},
		methods: {
			// 切换登录还是注册
			toggle() {
				this.isLogin = !this.isLogin;
			},

			// 重置
			reSet(timer) {
				if (!timer) return;
				clearInterval(timer);
				this.countDown = 10;
				this.RegisterFormConfig.getCode_btn_desc =
					RegisterFormConfig.getCode_btn_desc;
			},

			// 获取验证码
			async onGetCode(account) {
				//冷却时间触发无效
				if (this.countDown != 10) return;
				let timer;
				try {
					await checkIfIsStudent(account);
					// 开启倒计时冷却
					timer = setInterval(() => {
						//倒计时为0，恢复功能
						if (!this.countDown) {
							this.reSet(timer);
							return;
						}
						this.RegisterFormConfig.getCode_btn_desc = this.countDown--;
					}, 1000);
					//获取验证码到邮箱
					showLoading("验证码发送中...");
					await getVerCode(account);
					return;
				} catch (e) {
					showToast(e.message);
					this.reSet(timer);
				} finally {
					hideLoading();
				}
			},

			//注册
			async onRegister(payload) {
				showLoading("正在吐血注册中...");
				const res = await register(payload);
				hideLoading();
				if (res.token) {
					showToast("注册成功!即将跳转");
					setStorage("userToken", res.token);

					//注册完直接跳到主页，不需要再次登录
					setTimeout(() => {
						navigateTo(pageUrls.HOME)
					}, 1500);
					return;
				}
				showToast(res.message);
			},
			//登录
			async onLogin(payload) {
				//表单是否完整检验
				if (!checkObjectNoEmpty(payload)) {
					showToast("请必须填写完整账号密码");
					return;
				}
				showLoading("极速登录中...");
				const res = await loginWithAcctPass(payload);
				if (res.token) {
					showToast("登录成功,即将跳转");

					//登录状态唯一保存点
					setStorage("userToken", res.token);

					//设置用户状态为普通用户
					this.$store.commit("user/setUserStatus", {
						status: 1
					})

					//跳转到首页   登录页与其他页之间只能通过api进行挑战
					setTimeout(() => {
						uni.switchTab({
							url: "/src/pages/home/home",
						});
					}, 1500);
					return;
				}
				showToast(res.message);
			},
		},
	};
</script>

<style scoped lang="scss">
	@import "./index.scss";

	.bg_image {
		overflow: hidden;
		height: 580rpx;
		width: 100vw;
		background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgonglve.baidu.com%2Fgonglve%2Fapi%2Fgetcontent%3Fdoc_id%3D4ada3441d5bbfd0a7956739a%26type%3Dpic%26src%3D15_0_1080_810.jpg&refer=http%3A%2F%2Fgonglve.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624431296&t=4479ef9d9d2d6973dbd9e0bec2ec9aef") no-repeat;
		background-size: cover;
		padding: 0 60rpx;
	}

	.hi {
		font-weight: bold;
	}

	.tips {
		margin-top: 120rpx;
	}

	.cur_tips {
		font-size: 34rpx;
		font-weight: 900;
		color: $ThemeColor;
	}

	.switcher {
		overflow: hidden;
	}

	.switcher view {
		float: left;
		width: 140rpx;
		padding: 16rpx 0;
		text-align: center;
		position: relative;
		font-weight: bold;
		font-size: 32rpx;
	}

	.active_switcher::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 12rpx;
		width: 100%;
		background-color: $ThemeColor;
		border-radius: 5rpx;
	}

	.content_box {
		padding: 0 60rpx;
	}

	.content {
		margin-top: 40rpx;
	}
</style>
