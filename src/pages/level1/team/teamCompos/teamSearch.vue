<template>
	<view class="search letColumnCenter">
		<view class="set1">
			<text>{{title[titleIndex]}}</text>
		</view>
		<view class="set2">
			<uniIcon type="sousuo" size="16" color="#CCCCCC"></uniIcon>
		</view>
	</view>
</template>

<script>
import uniIcon from "@/src/pages/level2/team/icon/uniIcon.vue"
export default{
	name:"teamSearch",
	components:{
		uniIcon
	},
	data(){
		return{
			title:["搜索我的团队","搜索感兴趣的团队"],
		};
	},
	props:{
		'titleIndex':Number
	}
}
</script>

<style lang="scss">
	@import url("@/src/pages/level1/team/CSS/total.scss");
	.search{
		background-color: #F7F9FB;
		border-radius: 50px;
		height: 24px;
		.set1{
			margin-left: 20px;
			font-size: 10px;
			font-weight: bold;
			letter-spacing: 0.5px;
			color: #B2B2B2;
		}	
		.set2{
			position: absolute;
			right: 10%;
		}

	}
</style>
