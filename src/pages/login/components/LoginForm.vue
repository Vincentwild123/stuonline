<template>
  <!-- 登陆组件 -->
  <view class="LoginForm">
    <!-- 登陆表单 -->
    <view class="login_form">
      <!-- 账号输入盒子 -->
      <view class="account_box">
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
        </view>
      </view>
      <!-- 密码输入盒子 -->
      <view class="password_box">
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
          <!-- 后缀 -->
          <view class="suffix"> 忘记密码？</view>
        </view>
      </view>
    </view>
    <view class="submit_btn_box">
      <view @click="emitLoginEvent" class="submit_btn"
        ><text>{{ submit_btn_desc }}</text></view
      >
    </view>
  </view>
</template>
<script>
export default {
  props: {
    // 账号表单项名称
    account_item_name: {
      type: String,
      default: "账号",
      required: false,
      validator: (val) => typeof val == "string",
    },
    //账号输入框holder
    account_item_placeholder: {
      type: String,
      default: "输入你的账号",
      required: false,
      validator: (val) => typeof val == "string",
    },
    //密码表单项名称
    password_item_name: {
      type: String,
      default: "密码",
      required: false,
      validator: (val) => typeof val == "string",
    },
    //密码输入框holder
    password_item_placeholder: {
      type: String,
      default: "输入你的密码",
      required: false,
      validator: (val) => typeof val == "string",
    },
    //提交按钮描述词
    submit_btn_desc: {
      type: String,
      default: "登录",
      required: false,
      validator: (val) => typeof val == "string",
    },
    //邮箱后缀
    email_suffix: {
      type: String,
      default: "qq.com",
      required: false,
      validator: (val) => typeof val == "string",
    },
  },
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    emitLoginEvent() {
      const payload = {
        account: this.account,
        password: this.password,
      };
      this.$emit("LOGIN", payload);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../index.scss";

.login_form > view > view {
  margin: 10rpx 0;
}

.input_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.suffix {
  flex: 1;
  text-align: end;
  font-size: 28rpx;
  width: 30%;
}
.email_suffix {
  color: $ThemeColor;
}

.submit_btn_box {
  margin-top: 140rpx;
}
</style>
