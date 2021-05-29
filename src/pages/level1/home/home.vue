<template>
  <view class="Home"> Home </view>
</template>

<script>
import { loginWithToken } from "../../../API/interfaceAPIs/chenwenjun/loginPage.js";
export default {
  data() {
    return {};
  },
  onLoad() {
    //使用token登录
    loginWithToken().then((bool) => {
      if (!bool) {
        uni.navigateTo({
          url: "../../level2/login/login",
        });
      }
    });
  },
};
</script>

<style></style>
