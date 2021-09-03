<template>
  <view class="home_page">
    <SearchBar></SearchBar>
    <view class="nav">
      <template v-for="item in Nav">
        <view class="nav_item">
          <image
            class="nav_item_icon"
            lazy-load="true"
            mode="aspectFit"
            :src="item.icon"
          />
          <view class="nav_item_name">{{ item.name }}</view>
        </view>
      </template>
    </view>
    <view class="courses">
      <view class="courses_title">
        <image
          lazy-load="true"
          mode="aspectFit"
          class="courses_title_icon"
          src="https://pic.imgdb.cn/item/6131862544eaada73985f20b.png"
        />
        <text class="courses_title_text">今日课表</text>
      </view>
      <view class="willOnline">
        <span>即将上线，敬请期待</span>
      </view>
    </view>
    <button @click="gotoLoginPage">去登陆页</button>
  </view>
</template>

<script>
import { loginWithToken, getFormUploadToken } from "./service.js";
import { showToast, setStorage, navigateTo } from "../../API/common.js";
import SearchBar from "../../components/SearchBar";
import { Nav } from "./config.js";
import pageUrls from "../../API/pageUrls.js";
export default {
  data() {
    return {
      Nav,
    };
  },
  components: {
    SearchBar,
  },
  async onLoad() {
    const ifUserTokenValid = await loginWithToken();
    if (ifUserTokenValid) {
      const fromToken = await getFormUploadToken();
      if (fromToken) {
        setStorage("formToken", fromToken);
        return;
      }
    }
    showToast("登录信息过期或不合法,请重新登陆");
    setTimeout(() => {
      navigateTo(pageUrls.LOGIN);
    }, 1500);
  },
  methods: {
    gotoLoginPage() {
      navigateTo(pageUrls.LOGIN);
    },
  },
};
</script>

<style>
/* 导航列表 */
.nav {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20rpx;
  padding-top: 40rpx;
}
.nav_item {
  height: 160rpx;
  box-sizing: border-box;
  width: 25%;
  padding: 16rpx 46rpx;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
/* 列表项图片 */
.nav_item_icon {
  max-width: 90%;
}
/* 文字描述 */
.nav_item_name {
  font-weight: 400;
  padding-top: 16rpx;
  font-size: 24rpx;
  color: rgb(165, 164, 164);
}
/* 课程列表 */
.courses {
  box-sizing: border-box;
  padding: 40rpx;
}
.courses_title {
  font-size: 22rpx;
  color: rgb(176, 179, 184);
}
.courses_title_icon {
  max-width: 35rpx;
  max-height: 35rpx;
  margin-right: 10rpx;
  vertical-align: middle;
}
.courses_title_text {
  vertical-align: middle;
}
.willOnline {
  height: 100rpx;
  line-height: 100rpx;
  background-color: gray;
}
.willOnline span {
  font-size: 50rpx;
}
</style>
