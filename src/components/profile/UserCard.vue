<template>
  <view class="info_board">
    <view class="profile_info_box">
      <image class="profile_info_avatar" :src="avatar" mode="heightFix"></image>
      <view class="meta_info_box">
        <view class="meta_user_name">
          {{ name }}
        </view>
        <view class="meta_user_ID"> ID: {{ ID }} </view>
        <view class="meta_user_medals">
          <template v-for="(item, index) of medals">
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
        <template v-for="(item, index) in iaData">
          <view class="show_info_item" :key="index">
            <view class="current_data">
              {{ item.count }}
            </view>
            <view class="item_name">
              {{ item.name }}
            </view>
          </view>
        </template>
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
    avatar: {
      type: String,
      default: "/static/icons/profile/icon_avatar.png",
      required: true,
    },
    name: {
      type: String,
      default: "哇哈哈三代目",
      required: true,
    },
    ID: {
      type: String,
      default: "0",
      required: true,
    },
    medals: {
      type: Array,
      default: [],
      required: true,
    },
    iaData: {
      type: Array,
      default: {},
      required: true,
    },
  },
};
</script>

<style scoped>
.info_board {
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
  font-size: 1.26em;
  font-weight: 900;
}

.meta_user_ID {
  font-size: 0.9em;
  font-weight: bold;
}

.profile_info_avatar {
  max-width: 180rpx;
  max-height: 180rpx;
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
}

.show_info_box {
  display: flex;
  width: 70%;
  justify-content: space-around;
}

.item_name {
  font-size: 20rpx;
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
