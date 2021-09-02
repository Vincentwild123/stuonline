<!-- 选项栏 -->
<template>
  <view class="cate">
    <view class="textitem">
      <view
        class="cateitem"
        v-for="(item, index) in titles"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
        >{{ item }}</view
      >
    </view>
    <view class="imgcate">
      <navigator url="/src/pages/level2/teahouse/createAssignment">
        <image src="/UI/faburenwu.png" mode="widthFix"></image>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  name: "Cate",
  data() {
    return {
      titles: ["闲聊", "学业", "组队", "比赛"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("changeType", index);
    },
  },
};
</script>
<style scoped>
.cate {
  height: 44px;
  display: flex;
  border-bottom: 2px solid #fff0d9;
}
.textitem {
  margin-top: 10px;
  display: flex;
  height: 24px;
  flex: 5;
}
.imgcate {
  flex: 2;
}
.cateitem {
  line-height: 24px;
  flex: 1;
  text-align: center;
  border-right: solid 2px #e2e5ef;
}
.imgcate {
  text-align: center;
}
.imgcate image {
  margin-top: 8px;
  width: 65px;
}
.active {
  color: #f4912f;
}
</style>
