<!-- 大的图标选择框 -->
<template>
  <view class="icon_bar">
    <view class="item_img" @click="ChooseImageFile">
      <view class="icon_item">
        <image src="../../../UI/chooseImg.png" mode="heightFix" />
      </view>
      <view class="item_text"> 图片 </view>
    </view>
    <view class="item_img" @click="ChooseImageCame">
      <view class="icon_item">
        <image src="../../../UI/postPhoto.png" mode="heightFix" />
      </view>
      <view class="item_text"> 拍摄 </view>
    </view>
    <view class="item_img" @click="ChooseFile">
      <view class="icon_item">
        <image src="../../../UI/addFile.png" mode="heightFix" />
      </view>
      <view class="item_text"> 文件 </view>
    </view>
    <view class="item_img" @click="ChooseLabels">
      <view class="icon_item">
        <image src="../../../UI/addLabel.png" mode="heightFix" />
      </view>
      <view class="item_text"> #标签 </view>
    </view>
    <view class="item_img">
      <view class="icon_item">
        <image src="../../../UI/collect.png" mode="heightFix" />
      </view>
      <view class="item_text"> 收藏 </view>
    </view>
    <view class="item_img">
      <view class="icon_item">
        <image src="../../../UI/eye.png" mode="heightFix" />
      </view>
      <view class="item_text"> 分享范围 </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "BigIconBar",
  data() {
    return {};
  },
  components: {},
  methods: {
    //选择文件
    ChooseFile() {
      this.$emit("ChooseFile");
    },
    //选择图片--从文件夹
    ChooseImageFile() {
      this.$emit("ChooseImage", "album");
    },
    //选择图片--从相机
    ChooseImageCame() {
      this.$emit("ChooseImage", "camera");
    },
    //选择标签
    ChooseLabels() {
      this.$emit("ChooseLabels");
    },
  },
};
</script>
<style scoped>
.icon_bar {
  height: 600rpx;
  width: 100%;
  background-color: #d6d9de;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  font-size: 24rpx;
  color: #676767;
}
.item_img {
  margin-top: 40rpx;
  margin-left: calc((100vw - 544rpx) / 5);
}
.icon_item {
  height: 132rpx;
  width: 136rpx;
  background-color: white;
  text-align: center;
  line-height: 132rpx;
  border-radius: 30rpx;
}
.icon_item image {
  height: 68rpx;
  vertical-align: middle;
}
.item_text {
  margin-top: 10rpx;
  width: 136rpx;
  text-align: center;
}
</style>