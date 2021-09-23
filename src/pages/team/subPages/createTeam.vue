<template>
	<view class="contain">
		<pageTop       
			title="创建团队"
			backTitle="团队"
			class="top"
			eventName="showTeamMembersBack"
		></pageTop>
		<!--  -->
		<view v-for="index in 2" class="menu flex-row" @click="clickFriendList">
			<image src="../../../UI/team/709.png" class="menu-img"></image>
			<view class="letColumnCenter menu-text"><text>hello</text></view>
		</view>
		
		<view class="bottom"></view>
	</view>
</template>

<script>
	import pageTop from "./teamCompos/pageTop.vue";
	export default{
		name:"createTeam",
		components:{
			pageTop
		},
		data(){
			return{
				title: [
					{
						name:"",
						url:""
					},
					{
						name:"",
						url:""
					}
				]
			}
		},
		methods:{
			clickFriendList(){
				console.log("isCreate!");
				uni.navigateTo({
					url:"./friendList"
				})
			}
		}
		
	}
</script>

<style lang="scss">
	@import url("../CSS/total.scss");
	.contain{
		.top{
			margin-top: 40px;
			border-bottom: 1px solid #007AFF;
		}
		.menu{
			.menu-img{
				height: 30px;
				width: 30px;
			}
			.menu-text{
				font-size: 10px;
			}
		}
		.bottom{
			height: 8px;
			background-color: #FFF0D9;
		}
	}
</style>
