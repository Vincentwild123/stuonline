<template>
  <view class="page">
    <!-- ia:交互数据 -->
    <UserCard
	:avatar='user.avatar'
	:name='user.name'
	:ID='user.ID'
	:medals='user.medals'
	:iaData='user.iaData'
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
          src="/static/icons/profile/icon_my_medal.png"
          class="mine_row_icon"
        >
        </image>
        <view class="mine_row_desc"> 我的勋章 </view>
      </view>
      <view class="mine_row_box">
        <image
          mode="widthFix"
          src="/static/icons/profile/icon_my_post.png"
          class="mine_row_icon"
        >
        </image>
        <view class="mine_row_desc"> 我的帖子 </view>
      </view>
    </view>
    <view class="additions_column">
      <template v-for="(item, index) in additions">
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
import UserCard from "../../../components/profile/UserCard.vue";
import { getStorage } from "../../../API/localAPIs/index.js";
export default {
  data() {
    return {
      user: {
        avatar: "/static/icons/profile/icon_avatar.png",
        name: "care",
        ID: "2018_krcarrre",
        medals: [
          "/static/icons/profile/medal.png",
          "/static/icons/profile/medal.png",
          "/static/icons/profile/medal.png",
        ],
        iaData: [
          {
            name: "发帖",
            count: 1,
          },
          {
            name: "评论",
            count: 13,
          },
          {
            name: "获赞",
            count: 7,
          },
        ],
      },
      additions: [
        {
          name: "设置",
          icon: "/static/icons/profile/icon_settings.png",
        },
        {
          name: "帮助与反馈",
          icon: "/static/icons/profile/icon_help.png",
        },
        {
          name: "关于",
          icon: "/static/icons/profile/icon_about.png",
        },
        {
          name: "退出登录",
          icon: "/static/icons/profile/icon_exit.png",
        },
      ],
    };
  },
  onLoad() {
    //检查token
    const token = getStorage("userToken");
    if (!token) {
      switchTab({
        url: "/pages/level1/home/home",
      });
    }
    //获取用户数据
  },
  components: {
    UserCard,
  },
  methods: {
    toLoginPage() {
      uni.navigateTo({
        url: "../../level2/login/login",
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
