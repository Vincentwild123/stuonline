<template>
  <!-- 头像及登陆页面 -->
  <view class="page">
    <view class="info_board"></view>
    <view class="mine_row">
      <view class="mine_row_box">
        <image
          src="/static/icons/profile/icon_my_notification.png"
          class="mine_row_icon"
          mode="aspectFill"
        >
        </image>
        <view class="mine_row_desc"> 我的通知 </view>
      </view>
      <view class="mine_row_box">
        <image
          mode="aspectFill"
          src="/static/icons/profile/icon_my_medal.png"
          class="mine_row_icon"
        >
        </image>
        <view class="mine_row_desc"> 我的勋章 </view>
      </view>
      <view class="mine_row_box">
        <image
          mode="aspectFill"
         src="/static/icons/profile/icon_my_post.png"
          class="mine_row_icon"
        >
        </image>
        <view class="mine_row_desc">我的帖子</view>
      </view>
    </view>
    <view class="other_column"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      avatar: "",
      name: "",
      like: 0,
      post: 0,
    };
  },
  methods: {},
};
</script>

<style scoped>
.page {
  height: 100%;
  width: 100vw;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: rgb(226, 226, 226);
}
.info_board {
  height: 420rpx;
  background-color: green;
}
.mine_row {
  height: 146rpx;
  margin: 20rpx 0;
  display: flex;
  box-sizing: border-box;
  background-color: white;
  justify-content: space-around;
}
.mine_row_box {
  text-align: center;
  width: 200rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10rpx 20rpx;
}
.mine_row_icon {
  max-width: 70%;
  max-height: 70%;
  margin-left:16rpx;
}
.mine_row_desc {
  font-size: 18rpx;
  font-weight:bold;
}
.other_column {
  height: 500rpx;
  background-color: blue;
}
</style>
