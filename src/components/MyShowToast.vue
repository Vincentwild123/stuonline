<!--自定义showToast  -->
<template>
  <view class="show_toast">
    <view class="main_content">
      <view class="title">{{ title }}</view>
      <view class="content">{{ content }}</view>
    </view>
    <view class="choose">
      <view class="choo_no" @click="userCancel">{{ cancel }}</view>
      <view class="choo_yes" @click="userComfire">{{ confirm }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "MyShowToast",
  data() {
    return {};
  },
  props: {
    title: {
      default: "",
      type: String,
    },
    content: {
      default: "",
      type: String,
    },
    cancel: {
      default: "取消",
      type: String,
    },
    confirm: {
      default: "确定",
      type: String,
    },
  },
  methods: {
    //取消
    userCancel() {
      this.$emit("userCancel");
    },
    //点击确定
    userComfire() {
      this.$emit("userComfire");
    },
  },
};
</script>
<style scoped>
.show_toast {
  position: relative;
  z-index: 100;
  width: 472rpx;
  height: 306rpx;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 40rpx;
  box-shadow: 0 10rpx 10rpx 10rpx #636363;
  overflow: hidden;
}
.main_content {
  background-color: rgba(234, 239, 252, 0.5);
  height: 230rpx;
}
.title {
  padding-top: 40rpx;
  padding-bottom: 20rpx;
  text-align: center;
  color: #414141;
  font-size: 28rpx;
}
.content {
  text-align: center;
  font-size: 20rpx;
  color: #fd9229;
}
.choose {
  display: flex;
  background-color: #fff;
  font-size: 20rpx;
}
.choo_no {
  height: 76rpx;
  line-height: 76rpx;
  text-align: center;
  border-right: 2px solid #e2e5ef;
  flex: 1;
  color: #6b82aa;
}
.choo_yes {
  line-height: 76rpx;
  text-align: center;
  height: 76rpx;
  flex: 1;
  color: #fd9229;
}
</style>