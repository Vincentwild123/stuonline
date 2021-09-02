<!-- 通知栏 -->
<template>
  <view class="notice">
	 <view class="noticeLaba">
	 	<image src="/UI/laba.png" mode="widthFix"></image>
	 </view>
  	<uni-notice-bar scrollable="true" single="true" text="热烈庆祝“头大Online”成功上线！[掌声][掌声][掌声][掌声][掌声][掌声]"></uni-notice-bar>
  </view>
</template>

<script>
import UniNoticeBar from '../../../../components/uni-notice-bar.vue'
export default {
name:'NoticeBar',
  data () {
    return {
    };
  },

  components: {
	  UniNoticeBar
  }
}

</script>
<style scoped>
.notice{
	position: relative;
}
.notice image{
	width: 13px;
	height: 13px;
}
.noticeLaba{
	position: absolute;
	top: 6px;
}
</style>
