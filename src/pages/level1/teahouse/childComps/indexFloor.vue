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
            <view class="admin_time">{{getTime}}</view>
          </view>
        </view>
        <view class="grade">
			<img v-for="(item,index) in list.userBadges" v-bind:src="item" mode="widthFix"></img>
        </view>
      </view>
      <view class="floor_ques">{{list.postSimple.postText}}</view>
	  <view class="floor_pic">
        <img v-for="(item,index) in list.postImages" :src="item" alt="" mode="widthFix">
      </view>
      <view class="floor_type">
        <text v-for="(item,index) in list.tagList">#{{item}}</text>
      </view>
      <view class="others">
        <view class="common">
          <image src="../../../../UI/pinglun.png" mode=""></image>评论
        </view>
        <view class="dianzan" @click="likeIt(list.postSimple.postId)">
          <image v-if="list.like" src="../../../../UI/undianzan.png" mode=""></image>
		  <image v-else src="../../../../UI/dianzan.png" mode=""></image>点赞
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
  computed:{
            getTime(){
				let postDate = this.list.postSimple.postDatetime;
				let nowDate = new Date();
				let date = Date.parse(nowDate) - Date.parse(postDate);
				let diffdate=new Date(date);
				if(diffdate.getMonth()>0){
					return "很久以前";
				}else if(diffdate.getDate()>0){
					return diffdate.getDate()+"天前";
				}else if(diffdate.getHours()>0){
					return diffdate.getHours()+"小时前";
				}else if(diffdate.getMinutes()>0){
					return diffdate.getMinutes()+"分钟前"
				}else{
					return "刚刚发布";
				}
            }
            
        },
  methods:{
	likeIt(postId){
		console.log(postId);
		if(this.list.like){
			this.$emit('unlikeIt',postId);
		}else{
			this.$emit('likeIt',postId);
		}
		this.list.like=!this.list.like;//状态取反
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
		width: 55px;
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
.floor_pic {

}
.floor_pic img{
  height: 80px;
  padding: 3px 5px;
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
