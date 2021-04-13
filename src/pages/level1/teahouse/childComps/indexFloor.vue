<template>
  <!-- 楼层 开始 -->
  <view class="index_floor">
    <view class="floor_item">
      <!--个人信息-->
      <view class="floor_person">
        <view class="person_detial">
          <view class="admin_pic">
            <img v-bind:src="list.userSimple.userHead" mode="widthFix"></img>
          </view>
          <view class="admin_detial">
            <view class="admin_name">{{list.userSimple.userName}}</view>
            <view class="admin_time">6分钟前</view>
          </view>
        </view>
        <view class="grade">
          <image src="../../../../UI/grade.png" mode="widthFix"></image>
        </view>
      </view>
      <view class="floor_ques">{{list.postSimple.postText}}</view>
      <view class="floor_type">
        <text v-for="(item,index) in list.tagList">#{{item}}</text>
      </view>
      <view class="floor_pic"> </view>
      <view class="others">
        <view class="common">
          <image src="../../../../UI/pinglun.png" mode=""></image>评论
        </view>
        <view class="dianzan">
          <image src="../../../../UI/dianzan.png" mode=""></image>点赞
        </view>
      </view>
    </view>
  </view>
  <!-- 楼层 结束 -->
</template>

<script>


export default {
  name: "IndexFloor",
  data() {
    return { 
		
	}
  },
  props:{
	   list: {
	          type: Object,
	          default() {
	            return []
	          }
	        }
  },
  methods:{
	show(){
		console.log(list.userSimple.userHead)
	}
  }
};
</script>
<style scoped>
.index_floor{

	}
	.floor_person{
		
	}
	.floor_item{
		border-bottom: 10px solid #fff0d9;
		padding-bottom: 10px;
	}
	.person_detial{
		float: left;
		display: flex;
		padding: 10px 0;
		align-items: center;
	}
	.grade{
		float: right;
		padding: 10px 0;
	}
	.floor_person:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
	.grade image{
		width: 29px;
		height: 29px;
	}
	.admin_pic{
		flex: 1;
	}
	.admin_pic img{
		width: 47px;
		height: 47px;
		border-radius: 47px;
	}
	.admin_detial{
		flex: 1;
		padding: 0 8px;
	}
	.admin_name{
		font-size: 12px;
		color: black;
	}
	.admin_time{
		font-size: 12px;
		color: darkgray;
	}
	.floor_ques{
		font-size: 12px;
		font-weight: 900;
		padding-bottom: 9px;
	}
	.floor_type{
		border-bottom: 1px solid #d9d9d9;
		padding-bottom: 6px;
	}
	.floor_type text{
		margin-right: 5px;
		text-align: center;
		line-height: 21px;
		display: inline-block;
		font-size: 8px;
		border: #b5caff 1px solid;
		height: 21px;
		width: 49px;
		border-radius: 21px;
	}
	.floor_pic{

	}
	.others{
		display: flex;
		font-size: 10px;
		padding-top: 6px;
	}
	.others image{
		width: 14px;
		height: 12px;
		vertical-align: middle;
		margin-right: 4px;
	}
	.common{
		flex: 1;
		text-align: center;	
	}
	.dianzan{
		flex: 1;
		text-align: center;
	}
</style>
