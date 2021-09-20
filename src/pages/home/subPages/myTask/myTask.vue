<template>
  <view class="mytask_page">
    <view class="tabs">
      <template v-for="(tab, index) of tabs">
        <view
          @click="() => setActiveTab(index)"
          :class="index == curIndex ? 'active tab' : 'tab'"
          v-bind:key="tab"
          >{{ tab }}</view
        >
      </template>
    </view>
    <view class="content">
      <component v-bind:is="currentTabComponent"></component>
    </view>
  </view>
</template>
<script>
import FinishByI from "./components/finishByI.vue";
import SendByI from "./components/sendByI.vue";
import Processing from "./components/processing.vue";
export default {
  data() {
    return {
      currentTabComponent: "SendByI",
      tabs: ["我发布的", "进行中", "我完成的"],
      curIndex: 0,
      componentMap: {
        0: "SendByI",
        1: "Processing",
        2: "FinishByI",
      },
    };
  },
  methods: {
    setActiveTab(index) {
      this.$data.curIndex = index;
      this.$data.currentTabComponent = this.$data.componentMap[index];
    },
  },
  components: {
    FinishByI,
    SendByI,
    Processing,
  },
};
</script>
<style>
.mytask_page {
  border-top: 80rpx solid transparent;
}
.tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 80rpx;
  border-bottom: 1rpx solid #c2c2c8;
  position: relative;
}
.tab {
  font-weight: 500;
}
.active {
  color: orange;
}
.tab:nth-child(2)::before {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 33%;
  width: 1rpx;
  height: 100%;
  background-color: #c2c2c8;
}
.tab:nth-child(2)::after {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 66%;
  width: 1rpx;
  height: 100%;
  background-color: #c2c2c8;
}
</style>
