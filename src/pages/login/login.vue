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
        <view
          @click="toggle"
          :class="{ active_switcher: isLogin }"
          class="btn_login"
        >
          登录
        </view>
        <view
          @click="toggle"
          class="btn_register"
          :class="{ active_switcher: !isLogin }"
        >
          注册
        </view>
      </view>
      <view class="content">
        <view v-if="isLogin">
          <LoginForm @LOGIN="onLogin" v-bind="LoginFormConfig"></LoginForm>
        </view>
        <view v-else>
          <RegisterForm
            @GETCODE="onGetCode"
            @REGISTER="onRegister"
            v-bind="RegisterFormConfig"
          ></RegisterForm>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import { checkAccount, checkObjectNoEmpty } from "../../utils/checkers.js";
import {
  checkIfIsStudent,
  register,
  getVerCode,
  loginWithAcctPass,
} from "./service.js";
import {
  showToast,
  setStorage,
  showLoading,
  hideLoading,
} from "../../API/common.js";
import { LoginFormConfig, RegisterFormConfig, Tips } from "./config.js";
export default {
  data() {
    return {
      isLogin: true,
      hadGetVerCode: false,
      //登录组件配置
      LoginFormConfig,
      //注册组件配置
      RegisterFormConfig,
      //发送邮件冷却倒计时
      countDown: 120,
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
      this.hadGetVerCode = false;
      this.countDown = 120;
      this.RegisterFormConfig.getCode_btn_desc =
        RegisterFormConfig.getCode_btn_desc;
    },

    // 获取验证码
    async onGetCode(account) {
      this.hadGetVerCode = true;
      let timer;
      // 不能在冷却时获取验证码
      if (this.countDown != 120) return;
      if (checkAccount(account)) {
        try {
          const isStudent = await checkIfIsStudent(account);
          if (isStudent) {
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
          } else showToast("检测到你不是本校学生");
        } catch (err) {
          showToast(err.message);
          this.reSet(timer);
        } finally {
          hideLoading();
        }
      } else showToast("非法的校园网账号");
    },

    //注册
    onRegister(payload) {
      //表单需要完整
      if (!checkObjectNoEmpty(payload)) {
        showToast("请完整填写表单");
        return;
      }
      //需先获取验证码
      if (!this.hadGetVerCode) {
        showToast("请先获取验证码");
        return;
      }
      showLoading("正在吐血注册中...");
      register(payload)
        .then((ret) => {
          if (ret.token) {
            showToast("注册成功!即将跳转");
            setStorage("userToken", ret.token);
            setTimeout(() => {
              this.isLogin = true;
            }, 1500);
            return;
          }
          showToast(ret.message);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => hideLoading());
    },
    onLogin(payload) {
      //表单需要完整
      if (!checkObjectNoEmpty(payload)) {
        showToast("请必须填写完整账号密码");
        return;
      }
      showLoading("极速登录中...");
      loginWithAcctPass(payload)
        .then((ret) => {
          if (ret.token) {
            showToast("登录成功,即将跳转");
            setStorage("userToken", ret.token);
            setTimeout(() => {
              uni.switchTab({
                url: "/src/pages/home/home",
              });
            }, 1500);
            return;
          }
          showToast(ret.message);
        })
        .catch((e) => console.error(e))
        .finally(() => hideLoading());
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
  background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgonglve.baidu.com%2Fgonglve%2Fapi%2Fgetcontent%3Fdoc_id%3D4ada3441d5bbfd0a7956739a%26type%3Dpic%26src%3D15_0_1080_810.jpg&refer=http%3A%2F%2Fgonglve.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624431296&t=4479ef9d9d2d6973dbd9e0bec2ec9aef")
    no-repeat;
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
