<template>
	<!-- 登陆组件 -->
	<view class="RegisterForm">
		<!-- 登陆表单 -->
		<view class="Register_form">
			<!-- 账号输入盒子 -->
			<view class="account_box box">
				<!-- 表单项名称 -->
				<view class="item_name account_item_name">{{ account_item_name }}</view>
				<!-- 输入框盒子 -->
				<view class="input_box">
					<!-- 输入框 -->
					<input type="text" v-model="account" :placeholder="account_item_placeholder" />
					<!-- 后缀 -->
					<view class="suffix email_suffix">{{ email_suffix }}</view>
					<view @click="emitGetCodeEvent" class="suffix getCode_btn_suffix">{{
            getCode_btn_desc
          }}</view>
				</view>
			</view>
			<!-- 验证码输入盒子 -->
			<view class="vercode_box box">
				<!-- 表单项名称 -->
				<view class="item_name vercode_item_name">{{ vercode_item_name }}</view>
				<!-- 输入框盒子 -->
				<view class="input_box">
					<!-- 输入框 -->
					<input type="text" v-model="vercode" :placeholder="vercode_item_placeholder" />
				</view>
			</view>
			<!-- 密码输入盒子 -->
			<view class="password_box box">
				<!-- 密码项表单名字 -->
				<view class="item_name password_item_name">{{
          password_item_name
        }}</view>
				<!-- 密码输入框 -->
				<view class="input_box">
					<!-- 输入框 -->
					<input type="password" v-model="password" :placeholder="password_item_placeholder" />
				</view>
			</view>
		</view>

		<view class="submit_btn_box">
			<view @click="emitRegisterEvent" class="submit_btn"><text>{{ submit_btn_desc }}</text></view>
		</view>
	</view>
</template>
1
<script>
	import {
		ifAccountValid,
		checkObjectNoEmpty
	} from '../../../utils/checkers.js'
	import {
		showToast
	} from '../../../API/common.js'
	export default {
		props: {
			account_item_name: {
				type: String,
				default: "账号",
				required: false,
			},
			account_item_placeholder: {
				type: String,
				default: "输入你的账号",
				required: false,
			},
			password_item_name: {
				type: String,
				default: "密码",
				required: false,
			},
			password_item_placeholder: {
				type: String,
				default: "输入你的密码",
				required: false,
			},
			vercode_item_name: {
				type: String,
				default: "验证码",
				required: false,
			},
			vercode_item_placeholder: {
				type: String,
				default: "请输入验证码",
				required: false,
			},
			submit_btn_desc: {
				type: String,
				default: "注册",
				required: false,
			},
			getCode_btn_desc: {
				type: String | Number,
				default: "获取验证码",
				required: false,
			},
			email_suffix: {
				type: String,
				default: "qq.com",
				required: false,
			},
		},
		data() {
			return {
				account: "",
				password: "",
				vercode: "",
			};
		},
		methods: {
			//触发获取验证码事件
			emitGetCodeEvent() {
				const account = this.account;
				if (!ifAccountValid(account)) {
					showToast("输入账号非法");
					return;
				}
				this.$emit("GETCODE", account);
			},
			//触发注册事件
			emitRegisterEvent() {
				const payload = {
					account: this.account,
					password: this.password,
					vercode: this.vercode,
				};
				//表单需要完整
				if (!checkObjectNoEmpty(payload)) {
					showToast("请完整填写表单");
					return;
				}
				this.$emit("REGISTER", payload);
			},
		},
	};
</script>

<style scoped lang="scss">
	@import "../index.scss";

	/* 盒子子元素间间距 */
	.Register_form>view>view {
		margin: 10rpx 0;
	}

	.account_box input {
		width: 34%;
	}

	.account_box .input_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	/* 邮箱后缀 */
	.email_suffix {
		color: $ThemeColor;
		margin-right: auto;
	}

	.suffix {
		font-size: 26rpx;
	}

	.getCode_btn_suffix {
		border: 2rpx solid $ThemeColor;
		border-radius: 30rpx;
		padding: 8rpx 10rpx;
		color: $ThemeColor;
		width: 37%;
		text-align: center;
	}

	.submit_btn_box {
		margin-top: 80rpx;
	}
</style>
