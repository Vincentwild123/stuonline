<template>
  <view class="Home"></view>
</template>

<script>
import {
  loginWithToken,
  getFormUploadToken,
} from "../../../API/interfaceAPIs/chenwenjun/loginPage.js";
import { showToast, setStorage } from "../../../API/localAPIs/index.js";
import uploadImage from "../../../API/interfaceAPIs/chenwenjun/uploadImgae.js";
export default {
  data() {
    return {};
  },
  onLoad() {
    loginWithToken().then((bool) => {
      if (bool) {
        getFormUploadToken().then((token) => {
          if (token) {
            setStorage("formToken", token);
            return;
          }
          showToast("登录信息过期或不合法,请重新登陆");
          setTimeout(() => {
            uni.navigateTo({
              url: "../../level2/login/login",
            });
          }, 1500);
        });
        F;
      }
      uni.navigateTo({
        url: "../../level2/login/login",
      });
    });
  },
  methods: {},
};
</script>

<style></style>