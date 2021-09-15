<!-- 头部标题栏 -->
<template>
  <view class="navigatorBar">
 	<view class="left">
  		<slot name="left"></slot>
  	</view>
	<view class="center">
		<slot name="center"></slot>
	</view>
	<view class="right">
		<slot name="right"></slot>
	</view>
  </view>
</template>

<script>
export default {
name:'NavigatorBar',
  data () {
    return {
		
    };
  }
}

</script>
<style scoped>
.navigatorBar{
    justify-content: space-between;
	font-size: 12px;
	font-weight: bolder;
    display: flex;
    width: 100%;
	margin-bottom: 10rpx;
	border-bottom: 1px solid #f7f9fb;
}
.right{
	line-height: 32px;
    flex: 1;
	text-align: right;
}
.center{
	line-height: 32px;
    flex: 1;
	text-align: center;
}
.left{
	line-height: 32px;
    flex: 1;
	text-align: left;
}
</style>