<template>
  <!-- 头像及登陆页面 -->
  <view>
    <button @tap="test">请求</button>
  </view>
</template>

<script>
import { testNet } from "../../../API/localAPIs/axiosTest.js";
export default {
  data() {
    return {
      avatar: "",
      name: "",
      like: 0,
      post: 0,
    };
  },
  methods: {
    test() {
      testNet()
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style>
</style>
