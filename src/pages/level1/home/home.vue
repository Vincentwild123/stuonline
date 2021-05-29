<template>
  <view class="Home"> Home </view>
</template>

<script>
import {
  loginWithToken,
  getFormUploadToken,
} from "../../../API/interfaceAPIs/chenwenjun/loginPage.js";
import { showToast, setStorage } from "../../../API/localAPIs/index.js";
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
      //获取表单上传token
      getFormUploadToken().then((token) => {
        if (!token) {
          showToast("登录信息过期或不合法");
          setTimeout(() => {
            uni.navigateTo({
              url: "../../level2/login/login",
            });
          }, 1500);
          return;
        }
        setStorage("formToken", token);
      });
    });
  },
};
</script>

<style></style>
