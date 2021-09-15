<!-- 发布帖子的输入栏 -->
<template>
  <view class="post_bar">
    <view class="bar_item">
      <image src="../../../UI/chooseImg.png" mode="heightFix" />
    </view>
    <view class="bar_item">
      <image src="../../../UI/addFile.png" mode="heightFix" />
    </view>
    <view class="bar_item">
      <image src="../../../UI/emoji.png" mode="heightFix" />
    </view>
    <view class="bar_item">
      <image src="../../../UI/addLabel.png" mode="heightFix" />
    </view>
    <view class="bar_item">
      <image src="../../../UI/eye.png" mode="heightFix" />
    </view>
    <view class="bar_item" @click="openBigBar">
      <image src="../../../UI/addBtn.png" mode="heightFix" />
    </view>
  </view>
</template>

<script>
export default {
  name: "PostPostBar",
  data() {
    return {};
  },
  components: {},
  methods: {
    //点击展示大的菜单
    openBigBar() {
      this.$emit("openBigBar");
    },
  },
};
</script>
<style scoped>
.post_bar {
  width: 100%;
  background-color: #fff;
  margin-top: 10rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 2rpx solid #d6d9de;
  height: 82rpx;
  padding: 0 15rpx;
}
.bar_item {
}
.bar_item image {
  height: 42rpx;
}
</style>