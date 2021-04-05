<!-- 选项卡 -->
<template>
  <view class="index_cate">
    <navigator url="/src/pages/level2/teahouse/taskHall" class="left">
      <image src="../../../../UI/rewudating.png" mode="widthFix"></image>
    </navigator>
    <view class="center">
      <view class="center_item" 
	  v-for="(item,index) in titles"
	  :class="{active: index === currentIndex}"
	  @click="itemClick(index)"
	  >{{item}}</view>
    </view>
    <navigator url="" class="right">
      <image src="../../../../UI/fatie.png" mode="widthFix"></image>
    </navigator>
  </view>
</template>

<script>
export default {
  name: "indexCate",
  data() {
    return {
        titles:['闲聊','学业','组队','比赛'],
		currentIndex: 0
    };
  },
  methods:{
	  itemClick(index){
		  this.currentIndex = index;
	  }
  }
};
</script>
<style scoped>
	.index_cate{
		display: flex;
		padding: 20px 0 5px 0;
		align-items: center;
		border-bottom: 2px solid #fff0d9;
	}
	.left{
		flex:2;
	}
	.left image{
		width: 100%;
		display:block
	}
	.center{
		flex:3;
		display: flex;
		align-items: center;
	}
	.right{
		flex:1.5;
	}
	.right image{
		margin: 0 auto;
		width: 47px;
		height: 27px;
		display:block
	}
	.center_item{
		flex:1;
		text-align: center;
		font-size: 12px;
		border-right: #ccc 2px solid;
	}
	.active{
		color: #f4912f;
	}
</style>