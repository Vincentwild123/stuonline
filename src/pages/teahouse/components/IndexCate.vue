<!-- 选项卡 -->
<template>
  <view class="index_cate">
    <navigator url="./subPage/taskHall" class="left">
      <image src="../../../UI/rewudating.png" mode="widthFix"></image>
    </navigator>
    <view class="center">
      <view
        class="center_item"
        v-for="(item, index) in titles"
        :class="{ active: index === value }"
        @click="itemClick(index)"
        >{{ item.name }}</view
      >
    </view>
    <view class="right">
      <image @click="createPost" src="../../../UI/fatie.png" mode="widthFix"></image>
    </view>
  </view>
</template>

<script>
export default {
  name: "indexCate",
  data() {
    return {
      //   titles: ["闲聊", "学业", "组队", "比赛"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("changeType", index);
    },
    createPost(){
      this.$emit("createPost");
    }
  },
  props: {
    value: {
      // 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
      type: [String, Number],
      default: 0,
    },
    titles: {
      type: Array,
      default: [],
    },
  },
};
</script>
<style scoped>
.index_cate {
  margin-top: 20rpx;
  display: flex;
  padding: 5px 0 5px 0;
  align-items: center;
  border-bottom: 2px solid #fff0d9;
  border-top: 2px solid #fff0d9;
}
.left {
  flex: 2;
}
.left image {
  width: 100%;
  display: block;
}
.center {
  flex: 3;
  display: flex;
  align-items: center;
}
.right {
  flex: 1.5;
}
.right image {
  margin: 0 auto;
  width: 47px;
  height: 27px;
  display: block;
}
.center_item {
  flex: 1;
  text-align: center;
  font-size: 24rpx;
  color: #676767;
  border-right: #e2e5ef 2px solid;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
}
.active {
  color: #f4912f;
}
</style>