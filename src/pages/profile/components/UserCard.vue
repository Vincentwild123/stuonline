<template>
  <view class="container">
    <!-- 用户基础信息展示 -->
    <view class="profile_info_box">
      <image
        class="profile_info_avatar"
        :src="userHead"
        mode="heightFix"
      ></image>
      <view class="meta_info_box">
        <view class="meta_user_name">
          {{ userName }}
        </view>
        <view class="meta_user_ID">ID:{{userId}}</view>
        <view class="meta_user_medals">
          <template v-for="(item, index) of badgeUrls">
            <image
              :key="index"
              :src="item"
              class="meta_user_medal"
              mode="widthFix"
            ></image>
          </template>
        </view>
      </view>
    </view>
    <!-- ia:交互数据 -->
    <view class="ia_info_box">
      <view class="show_info_box">
        <view class="show_info_item">
          <view class="current_data">
            {{ commentCount }}
          </view>
          <view class="item_name"> 评论数 </view>
        </view>
        <view class="show_info_item">
          <view class="current_data">
            {{ userLikepost }}
          </view>
          <view class="item_name"> 点赞数 </view>
        </view>
        <view class="show_info_item">
          <view class="current_data">
            {{ userPostcount }}
          </view>
          <view class="item_name"> 发帖数 </view>
        </view>
      </view>
      <image
        src="/static/icons/profile/btn_edit_info.png"
        class="btn_edit"
        mode="aspectFill"
      ></image>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    userHead: {
      type: String,
      required: true,
      default:"https://img2.baidu.com/it/u=1662859086,3825119284&fm=26&fmt=auto"
    },
    userName: {
      type: String,
      required: true,
      default:"未登录"
    },
    userId:{
	  type:String,
	  required:true,
	  default:"-1"
	},
    badgeUrls: {
      type: Array,
	  required:false,
      default: ()=> [],
    },
    commentCount: {
      type: Number,
      required: true,
      default:0
    },
    userLikepost: {
      type: Number,
      required: true,
      default:0
    },
    userPostcount: {
      type: Number,
      required: true,
      default:0
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  height: 36%;
  padding-top: 80rpx;
  background-image: url(/static/img/profile_infoBoard_bg.jpg);
}
.profile_info_box {
  height: 200rpx;
  display: flex;
  margin: 10rpx 40rpx;
}
.meta_user_medal {
  max-width: 50rpx;
  max-height: 70rpx;
}

.meta_user_name {
  font-size: 44rpx;
  font-weight: 900;
}

.meta_user_ID {
  font-size: 36rpxem;
  font-weight: bold;
}

.profile_info_avatar {
  max-width: 180rpx;
  max-height: 180rpx;
  border-radius: 50%;
}

.meta_info_box {
  margin-left: 30rpx;
  padding: 10rpx 0;
  text-align: left;
}

.meta_info_box view {
  margin: 10rpx 10rpx;
}

.ia_info_box {
  display: flex;
  color: white;
  padding: 0 40rpx 0 80rpx;
}

.current_data {
  font-weight: bold;
  text-align: center;
  font-size:40rpx;
}

.show_info_box {
  display: flex;
  width: 70%;
  justify-content: space-around;
}

.item_name {
  font-size: 30rpx;
  text-align: center;
  margin: 5rpx 0;
}

.btn_edit {
  max-width: 165rpx;
  max-height: 41rpx;
  align-self: flex-end;
  margin-left: 40rpx;
}
</style>
