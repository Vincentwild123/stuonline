<template>
  <view class="contain flex-row">
    <view class="left letallCenter">
      <image
        src="https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg"
        class="left-img"
      ></image>
    </view>
    <view class="right flex-column">
      <view class="content-time"><text>2018.08.09-2020.03.19</text></view>
      <view class="content-neiron">滑板基础知识</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "activityItem",
  props: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import url("../../CSS/total.scss");
.contain {
  .left {
    flex: 1;
    height: 90px;
    padding-left: 20px;
    .left-img {
      // width: 177px;
      // height: 90px;
      height: 100%;
      width: 100%;
      border-radius: 8px;
    }
  }
  .right {
    flex: 1;
    padding-left: 10px;
    .content-time {
      font-size: 9px;
      color: #ff9c39;
    }
    .content-neiron {
      padding-top: 5px;
      font-size: 9px;
      color: #676767;
    }
  }
}
</style>
