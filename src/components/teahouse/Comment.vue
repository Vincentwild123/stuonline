<!-- 单个评论组件 -->
<template>
  <view class="comment">
     <!-- 一级评论及其个人信息的展示开始 -->
    <view class="user_detail">
    	<view class="user_header">
    		<image :src="FirstComment.userSimple.userHead"></image>
    	</view>
		<view class="comment_content">
			<view class="user_name">
				{{FirstComment.userSimple.userName}}
			</view>
			<view class="comment_text">
				{{FirstComment.comText}}
			</view>
			<view class="crea_time">
				{{getTime}}
			</view>
		</view>
		<view class="user_label" v-for="(item,index) in FirstComment.userBadges">
			<image :src="item" mode="widthFix"></image>
		</view>
    </view>
  	<!-- 一级评论及其个人信息的展示结束 -->
  </view>
</template>

<script>
import "../../utils/dateFormat.js"
export default {
name:'Commetn',
  data () {
    return {
    };
  },
  props:["FirstComment"],
  components: {},
  computed:{
    getTime(){
      let date = new Date(this.FirstComment.comTime);
      return date.format("MM-dd hh-mm");
    }
  }
}

</script>
<style scoped>
	/* 一级评论及其个人信息的展示开始 */
	.user_detail{
		margin-top: 20rpx;
		display: flex;
	}
	.user_header{
		margin-left: 40rpx;
	}
	.user_header image{
		width: 94rpx;
		height: 94rpx;
		border-radius: 94rpx;
		vertical-align: middle;
	}
	.comment_content{
		margin-top: 16rpx;
		margin-left: 24rpx;
	}
	.user_name{
		font-size: 12px;
		color: #676767;
		font-weight: bold;
	}
	.comment_text{
		width: 440rpx;
		font-size: 12px;
		color: #3b3b3b;
		font-weight: bold;
		margin: 20rpx 0 36rpx 0;
	}
	.crea_time{
		color: #ada7a7;
		font-size: 16rpx;
		margin-bottom: 12rpx;
	}
	.user_label{
		margin-top: 16rpx;
		margin-left: 30rpx;
	}
	.user_label image{
		width: 59rpx;
		height: 59rpx;
	}

	/* 一级评论及其个人信息的展示结束 */
</style>