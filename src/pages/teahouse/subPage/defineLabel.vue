<!-- 定义标签 -->
<template>
  <view class="main" :style="{ 'padding-top': postHeight + 'px' }">
    <view class="defin_lab">
      <!--头部导航栏开始-->
      <navigator-bar>
        <view slot="left" @click="cancelHandle">
          <image
            src="../../../UI/cancel.png"
            mode="heightFix"
            style="height: 41rpx; line-height: 41rpx; vertical-align: middle"
          ></image>
        </view>
        <view slot="center"> 自定义标签 </view>
        <view slot="right" @click="comfireAdd">
          <text
            style="
              background-color: #f3912f;
              display: inline-block;
              height: 46rpx;
              line-height: 46rpx;
              width: 128rpx;
              text-align: center;
              border-radius: 46rpx;
              font-size: 20rpx;
              font-weight: 600;
              color: #ffffff;
            "
            >确定添加</text
          ></view
        >
      </navigator-bar>
      <!--头部导航栏结束-->
      <view class="lab_til"> 已定义的标签 </view>
      <view class="seled_lab" v-if="selectedLabels.length !== 0">
        <view class="lab_item" v-for="(item, index) in selectedLabels"
          >#{{ item }}
          <image
            src="../../../UI/close.png"
            mode="heightFix"
            @click="detLabel(index)"
          ></image
        ></view>
      </view>
      <view v-else class="lab_item">#还没有任何的标签噢</view>
    </view>
    <!-- 添加标签bar开始 -->
    <view class="add_lab_bar">
      <view class="lab_font">#</view>
      <view class="add_btn" @click="addLabel" v-show="newLabel">添加</view>
      <input class="text_area" v-model="newLabel" @click="addContent" />
    </view>
    <!-- 添加标签bar开始 -->
  </view>
</template>

<script>
import NavigatorBar from "../components/content/NavigatorBar.vue";
export default {
  name: "defineLabel",
  data() {
    return {
      selectedLabels: [], //已经选择的标签
      newLabel: "", //新的标签
      postHeight: 0, //弹出输入框的高度
    };
  },
  components: {
    NavigatorBar,
  },
  methods: {
    //点击添加按钮--最多三个 长度限制为5字符
    addLabel() {
      if (this.selectedLabels.length >= 3) {
        uni.showToast({
          title: "标签最多为三个",
          duration: 2000,
          icon: "none",
        });
      } else {
        if (this.newLabel.length > 5) {
          uni.showToast({
            title: "标签长度过长(5)",
            duration: 2000,
            icon: "none",
          });
        } else {
          this.selectedLabels.push(this.newLabel);
          this.newLabel = "";
        }
      }
    },
    //删除标签
    detLabel(index) {
      this.selectedLabels.splice(index, 1);
    },
    //弹出键盘
    addContent() {
      uni.onKeyboardHeightChange((res) => {
        this.postHeight = res.height;
      });
    },
    //取消操作
    cancelHandle() {
      this.selectedLabels = [];
      this.$store.commit("selectedLabels/setLabels", this.selectedLabels);
      uni.navigateBack({
        delta: 1,
      });
    },
    //确认添加
    comfireAdd() {
      this.$store.commit("selectedLabels/setLabels", this.selectedLabels);
      uni.navigateBack({
        delta: 1,
      });
    },
  },
  mounted() {
    this.selectedLabels = this.$store.state.selectedLabels.selectedLabels;
    console.log("============");
  },
};
</script>
<style scoped>
.defin_lab {
  padding: 0 10px;
  padding-top: 6vh;
}
.lab_til {
  color: #3aaa20;
  font-weight: 600;
  margin: 40rpx 0;
}
.seled_lab {
  display: flex;
  flex-wrap: wrap;
}
.lab_item {
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  display: inline-block;
  border: 1px solid #b5caff;
  height: 42rpx;
  padding: 0 20rpx;
  border-radius: 42rpx;
  font-size: 18rpx;
  line-height: 42rpx;
}
.lab_item image {
  height: 30rpx;
  vertical-align: middle;
  margin-left: 10rpx;
}
.add_lab_bar {
  width: 100%;
  height: 82rpx;
  border: 1px solid #f7f9fb;
  padding-top: 16rpx;
  box-sizing: border-box;
  padding-left: 40rpx;
  padding-right: 40rpx;
  position: fixed;
  bottom: 0;
}
.text_area {
  box-sizing: border-box;
  padding: 0 30rpx;
  font-size: 20rpx;
  line-height: 50rpx;
  height: 50rpx;
  background-color: #f7f9fb;
  width: 100%;
  border-radius: 50rpx;
}
.lab_font {
  position: absolute;
  z-index: 1;
  color: #3aaa20;
  font-weight: 600;
  font-size: 32rpx;
  left: 44rpx;
  height: 50rpx;
  line-height: 50rpx;
}
.add_btn {
  height: 50rpx;
  line-height: 50rpx;
  border-radius: 50rpx;
  position: absolute;
  z-index: 1;
  background-color: #f3912f;
  padding: 0 30rpx;
  right: 45rpx;
  color: #f7f9fb;
}
</style>