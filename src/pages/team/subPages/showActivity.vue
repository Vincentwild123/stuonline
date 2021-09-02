<template>
  <view class="contain">
    <view class="compos-pageTop">
      <page-top
        class="compos-pageTop-item"
        backTitle="滑轮社"
        title="往期活动"
      ></page-top>
    </view>
    <scroll-view scroll-y class="compos-scroll">
      <activity-item
        v-for="index in 10"
        class="compos-scroll-item"
      ></activity-item>
    </scroll-view>
  </view>
</template>

<script>
import activityItem from "./teamCompos/activityItem.vue";
import pageTop from "./teamCompos/pageTop.vue";
export default {
  name: "showAticity",
  components: {
    activityItem,
    pageTop,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import url("../CSS/total.scss");
.contain {
  .compos-pageTop {
    height: 40px;
    padding: 10px 0;
    border-bottom: 1px solid #cbd5ef;
    .compos-pageTop-item {
      margin-top: 20px;
    }
  }

  .compos-scroll {
    height: calc(100vh - 64px);
  }
}
.compos-scroll .compos-scroll-item:not(:last-child) {
  margin-bottom: 10px;
}
.compos-scroll .compos-scroll-item:first-child {
  margin-top: 15px;
}
</style>
