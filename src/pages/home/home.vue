<template>
  <view class="home_page">
    <SearchBar></SearchBar>
    <view class="nav">
      <template v-for="item in Nav">
        <view
          @click="gotoPage(item.url)"
          class="nav_item"
          v-bind:key="item.icon"
        >
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
  </view>
</template>

<script>
import { ifTokenValid, getFormUploadToken } from "./service.js";
import {
  showToast,
  setStorage,
  navigateTo,
  getStorage,
} from "../../API/common.js";
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
    const userToken = getStorage("userToken");
    if (userToken) {
      //验证token是否合法
      const _ifTokenValid = await ifTokenValid(userToken);
      if (_ifTokenValid) {
        return;
      }
    }
    showToast("检测到未登录或登录状态非法!");
  },
  methods: {
    gotoPage(url) {
      url && navigateTo(url);
    },
  },
};
</script>

<style>
/* 导航列表 */
.home_page {
  border-top: 50rpx #000000 solid;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20rpx;
  padding-top: 40rpx;
}
.nav_item {
  height: 200rpx;
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
  max-width: 100%;
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
  margin-top: 20rpx;
  height: 400rpx;
  line-height: 400rpx;
  background-color: #eee;
  text-align: center;
  color: gray;
}
.willOnline span {
  font-size: 50rpx;
}
</style>
