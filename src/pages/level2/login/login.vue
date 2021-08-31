<template>
  <view class="container">
    <view class="bg_image">
      <view class="tips">
        <view class="hi"> 嗨！同学 </view>
        <view class="cur_tips">
          {{ tips }}
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
          <LoginForm @LOGIN="onLogin" v-bind="loginFormProps"></LoginForm>
        </view>
        <view v-else>
          <RegisterForm
            @GETCODE="onGetCode"
            @REGISTER="onRegister"
            v-bind="registerFormProps"
          ></RegisterForm>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import LoginForm from "../../../components/login/LoginForm.vue";
import RegisterForm from "../../../components/login/RegisterForm.vue";
import { checkAccount, checkObjectNoEmpty } from "../../../utils/checkers.js";
import {
  checkIfIsStudent,
  register,
  getVerCode,
  loginWithAcctPass,
} from "../../../API/interfaceAPIs/chenwenjun/loginPage.js";
import {
  showToast,
  setStorage,
  showLoading,
  hideLoading,
} from "../../../API/localAPIs/index.js";
import opts from "./loginPageOpts.js";
export default {
  data() {
    return {
      isLogin: true,
      hadGetVerCode: false,
      //登录组件配置
      loginFormProps: {
        ...opts.loginFormProps,
      },
      //注册组件配置
      registerFormProps: {
        ...opts.registerFormProps,
      },
      //发送邮件冷却倒计时
      countDown: opts.countDown,
      tips: opts.tips.LOGIN,
    };
  },
  components: {
    LoginForm,
    RegisterForm,
  },
  methods: {
    toggle() {
      this.isLogin = !this.isLogin;
      this.tips = this.isLogin ? opts.tips.LOGIN : opts.tips.REGISTER;
    },
    reSet(timer) {
      if (!timer) return;
      clearInterval(timer);
      this.hadGetVerCode = false;
      this.countDown = opts.countDown;
      this.registerFormProps.getCode_btn_desc =
        opts.registerFormProps.getCode_btn_desc;
    },
    onGetCode(account) {
      this.hadGetVerCode = true;
      let timer;
      if (this.countDown != opts.countDown) return;
      if (checkAccount(account)) {
        checkIfIsStudent(account)
          .then((isStudent) => {
            if (isStudent) {
              timer = setInterval(() => {
                //倒计时为0，恢复功能
                if (!this.countDown) {
                  reSet(timer);
                  return;
                }
                this.registerFormProps.getCode_btn_desc = this.countDown--;
              }, 1000);
              //获取验证码到邮箱
              showLoading("验证码发送中...");
              getVerCode(account)
                .catch((err) => {
                  if (timer) this.reSet(timer);
                  console.error(err);
                })
                .finally(() => {
                  hideLoading();
                });
              return;
            }
            showToast("检测到你不是本校学生");
          })
          .catch((e) => {
            console.error(e);
          });
      } else showToast("非法的校园网账号");
    },
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
                url: "/src/pages/level1/home/home",
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

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Helvetica";
}
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
  color: #ffaa00;
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
  font-size: 0.9em;
}
.active_switcher::before {
  content: "";
  position: absolute;
  top: 0rpx;
  left: 20rpx;
  height: 12rpx;
  width: 100rpx;
  background-color: #ffaa00;
  border-radius: 5rpx;
}
.content_box {
  padding: 0 60rpx;
}
.content {
  margin-top: 40rpx;
}
</style>