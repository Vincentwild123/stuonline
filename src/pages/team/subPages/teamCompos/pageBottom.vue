<template>
  <view class="contain flex-row">
    <view class="item1 letallCenter"
      ><text @click="cancelClick">取消</text></view
    >
    <view class="item2 letallCenter"
      ><text @click="deleteClick">删除</text></view
    >
  </view>
</template>

<script>
export default {
  name: "pageBottom",
  data() {
    return {};
  },
  props: {},
  methods: {
    deleteClick() {
      uni.$emit("deleteClick");
    },
    cancelClick() {
      uni.$emit("cancelClick");
    },
  },
};
</script>

<style lang="scss">
@import url("../../CSS/total.scss");
.contain {
  height: 56px;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  border-top: 1px solid #d1d6db;
  .item1 {
    height: 28px;
    width: 53px;
    border: 2rpx solid #6b82aa;
    border-radius: 20px;
    font-size: 10px;
    color: #6b82aa;
  }
  .item2 {
    height: 28px;
    width: 53px;
    border: 2rpx solid #f4912f;
    border-radius: 20px;
    font-size: 10px;
    color: #f07272;
  }
}
</style>
