<template>
  <view class="home_page">
    <button @click="gotoLoginPage">去登陆页</button>
  </view>
</template>

<script>
import { loginWithToken, getFormUploadToken } from "./service.js";
import { showToast, setStorage } from "../../API/common.js";
export default {
  data() {
    return {};
  },
  async onLoad() {
    const ifUserTokenValid = await loginWithToken();
    if (ifUserTokenValid) {
      const fromToken = await getFormUploadToken();
      if (fromToken) {
        setStorage("formToken", fromToken);
      }
    } else {
      showToast("登录信息过期或不合法,请重新登陆");
      setTimeout(() => {
        uni.navigateTo({
          url: "../login/login",
        });
      }, 1500);
    }
  },
  methods: {
    gotoLoginPage() {
      uni.navigateTo({
        url: "../login/login",
      });
    },
  },
};
</script>

<style></style>
