<template>
  <view class="page">
    <!-- ia:交互数据 -->
    <UserCard
      :userHead="userInfo.userHead"
      :userName="userInfo.userName"
      :userId="String(userInfo.userId)"
      :badgeUrls="userInfo.badgeUrls"
      :commentCount="userInfo.commentCount"
      :userLikepost="userInfo.userLikepost"
      :userPostcount="userInfo.userPostcount"
    ></UserCard>
    <view class="mine_row">
      <view class="mine_row_box">
        <image
          mode="widthFix"
          src="/static/icons/profile/icon_my_notification.png"
          class="mine_row_icon"
        >
        </image>
        <view class="mine_row_desc"> 我的通知 </view>
      </view>
      <view class="mine_row_box">
        <image
          mode="widthFix"
          src="https://pic.imgdb.cn/item/60fc2b955132923bf8312e8c.png"
          class="mine_row_icon"
        >
        </image>
        <view class="mine_row_desc"> 我的勋章 </view>
      </view>
      <view class="mine_row_box">
        <image
          mode="widthFix"
          src="https://pic.imgdb.cn/item/60fc2b7e5132923bf830b121.png"
          class="mine_row_icon"
        >
        </image>
        <view class="mine_row_desc"> 我的帖子 </view>
      </view>
    </view>
    <view class="additions_column">
      <template v-for="(item, index) in Additions">
        <view class="addition_box" :key="index">
          <image
            v-bind:src="item.icon"
            class="addition_box_icon"
            mode="widthFix"
          ></image>
          <view class="addition_name">
            {{ item.name }}
          </view>
          <image
            class="addition_box_arrow"
            src="/static/icons/profile/icon_arrow.png"
            mode="heightFix"
          >
          </image>
        </view>
      </template>
    </view>
  </view>
</template>
<script>
import UserCard from "./components/UserCard.vue";
import { getStorage } from "../../API/common.js";
import { getUserInfo } from "./service.js";
import { Additions } from "./config.js";
export default {
  data() {
    return {
      userInfo: {
        userHead: "",
        userName: "",
        userId: "",
        badgeUrls: [],
        commentCount: 0,
        userPostcount: 0,
        userLikepost: 0,
      },
      Additions,
    };
  },
  async onLoad() {
    //检查token
    const userToken = getStorage("userToken");
    if (userToken) {
      //获取用户数据
      const userInfo = await getUserInfo(userToken);
      this.$data.userInfo = userInfo.data;
    }
  },
  components: {
    UserCard,
  },
  methods: {
    toLoginPage() {
      uni.navigateTo({
        url: "../login/login",
      });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Helvetica";
}
.page {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: rgb(226, 226, 226);
  color: #383838;
}
.mine_row {
  width: 100vw;
  display: flex;
  justify-content: space-around;
  background-color: white;
  position: relative;
  margin: 20rpx 0;
}
.mine_row_box {
  width: 200rpx;
  height: 200rpx;
  padding: 26rpx 38rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
/* 图标长宽比是1:1.22 */
.mine_row_icon {
  max-width: 97.6%;
  max-height: 80%;
  margin-left: 20rpx;
}
.mine_row_box:nth-child(2)::before {
  display: block;
  content: "";
  position: absolute;
  top: 14%;
  left: 33%;
  width: 1rpx;
  height: 72%;
  background-color: #c2c2c8;
}
.mine_row_box:nth-child(2)::after {
  display: block;
  content: "";
  position: absolute;
  top: 14%;
  left: 66%;
  width: 1rpx;
  height: 72%;
  background-color: #c2c2c8;
}
.mine_row_desc {
  font-size: 0.5em;
  font-weight: bold;
}
.additions_column {
  overflow: hidden;
  background-color: white;
  height: 42%;
}
.addition_box {
  display: flex;
  height: 114rpx;
  align-items: center;
  padding: 0 50rpx;
  justify-content: space-between;
}
.addition_box_icon {
  max-width: 70rpx;
  max-height: 70rpx;
}
.addition_box_arrow {
  max-width: 17.59rpx;
  max-height: 30rpx;
}
.addition_name {
  width: 40%;
  margin-left: -40%;
  font-size: 0.7em;
  font-weight: bold;
}
</style>
