<template>
  <view>{{createTime}}</view>
</template>
<script>
export default {
  props: {
    createTime: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss"></style>
