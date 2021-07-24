<template>
  <view class="Home">
    <button @click="sendPost" type="">选择图片</button>
  </view>
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
    return /** 页面的初始数据*/ {
      pics: [],
    };
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
  methods: {
    sendPost() {
      console.log("发送帖子");
      //选择图片
      let that = this;
      uni.chooseImage({
        count: 3, //上传图片的数量，默认是9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: function (res) {
          const tempFilePaths = res.tempFilePaths; //拿到选择的图片，是一个数组
          that.pics = tempFilePaths;
          console.log(that.pics);
          uploadImage(that.pics)
            .then((res) => console.log(res))
            .catch((e) => console.error(e));
        },
      });
    },
  },
};
</script>

<style></style>
