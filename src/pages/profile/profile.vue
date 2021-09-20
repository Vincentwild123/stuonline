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
      <view class="mine_row_box" @click="gotoNotice">
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
        <view @click="gotoPage(item.url)" class="addition_box" :key="index">
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
import { getStorage,showToast, navigateTo, setStorage } from "../../API/common.js";
import { getUserInfo } from "./service.js";
import { Additions } from "./config.js";
import pageUrls from "../../API/pageUrls.js";
export default {
  data() {
    return {
      userInfo: {},
      Additions,
    };
  },
  async onShow() {
    //获取用户数据
    const userToken = getStorage("userToken");
    if (userToken) {
      const res = await getUserInfo(userToken);
      const userInfo = res.data;
      if (userInfo) {
        setStorage("userData", JSON.stringify(userInfo));
        this.$store.commit("user/setUserData", { userInfo });
        this.$data.userInfo = userInfo;
      }
    }
  },
  components: {
    UserCard,
  },
  methods: {
    onPullDownRefresh() {
      //获取用户数据
      const userToken = getStorage("userToken");
      if (userToken) {
        getUserInfo(userToken)
          .then((res) => {
            const userData = res.data;
            if (userData) {
              setStorage("userData", JSON.stringify(userData));
              this.$store.commit("user/setUserData", { userData });
              this.$data.userInfo = userData;
            }
          })
          .finally(() => {
            uni.stopPullDownRefresh();
          });
      }
	  uni.stopPullDownRefresh();
	  showToast("你还没登陆，刷新个屁呢？！")
    },
    gotoNotice() {
      navigateTo(pageUrls["NOTICE"]);
    },
    gotoPage(url) {
      if (url == pageUrls["LOGIN"]) {
        uni.clearStorageSync();
      }
      navigateTo(url);
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
  max-height: 90%;
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
  font-size: 24rpx;
  font-weight: bold;
}
.additions_column {
  overflow: hidden;
  background-color: white;
  height: 42%;
}
.addition_box {
  display: flex;
  height: 140rpx;
  align-items: center;
  padding: 0 50rpx;
  justify-content: space-between;
}
.addition_box_icon {
  max-width: 90rpx;
  max-height: 90rpx;
}
.addition_box_arrow {
  max-width: 17.59rpx;
  max-height: 30rpx;
}
.addition_name {
  width: 40%;
  margin-left: -34%;
  font-size: 28rpx;
  font-weight: bold;
}
</style>
