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
          <input
            type="text"
            v-model="account"
            :placeholder="account_item_placeholder"
          />
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
          <input
            type="text"
            v-model="vercode"
            :placeholder="vercode_item_placeholder"
          />
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
          <input
            type="password"
            v-model="password"
            :placeholder="password_item_placeholder"
          />
        </view>
      </view>
    </view>

    <view class="submit_btn_box">
      <view @click="emitRegisterEvent" class="submit_btn"
        ><text>{{ submit_btn_desc }}</text></view
      >
    </view>
  </view>
</template>
1
<script>
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
    emitGetCodeEvent() {
      const account = this.account;
      if (account == "") {
        uni.showToast({
          title: `${this.account_item_name}不能为空`,
          duration: 1500,
          icon: "none",
        });
        return;
      }
      this.$emit("GETCODE", account);
    },
    emitRegisterEvent() {
      const payload = {
        account:this.account,
        password:this.password,
        vercode:this.vercode
      }
      this.$emit('REGISTER',payload);
    },
  },
};
</script>

<style scoped>
.RegisterForm {
  height: 100%;
  width: 100%;
}

/* 盒子子元素间间距 */
.Register_form > view > view {
  margin: 10rpx 0;
}

.box {
  margin: 20rpx 0;
}

/* 表单项名称 */
.item_name {
  font-weight: bold;
}

/* 输入框 */
.input_box {
  height: 66rpx;
}

.input_box input {
  border-radius: 10rpx;
  background-color: rgb(247, 252, 254);
  height: 100%;
  border: 2rpx solid #d18b00;
  padding: 0rpx 10rpx;
  font-size: 28rpx;
}

.account_box input {
  width: 30%;
}

.account_box .input_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 邮箱后缀 */

.email_suffix {
  color: #d18b00;
  margin-right: auto;
}

.suffix {
  font-size: 26rpx;
}

.getCode_btn_suffix {
  border: 2rpx solid #e79a00;
  border-radius: 30rpx;
  padding: 8rpx 10rpx;
  color: #e79a00;
  width: 34%;
  text-align: center;
}

.submit_btn_box {
  margin-top: 80rpx;
}

.submit_btn {
  height: 88rpx;
  margin: 0 auto;
  width: 60%;
  border-radius: 44rpx;
  background-color: #e79a00;
  color: white;
  font-weight: bold;
  text-align: center;
  line-height: 88rpx;
  font-size: 30rpx;
}
</style>
