<template>

	<view class="searchBar">
		<pageTop :backTitle="searchPage[pageIndex1].backTitle" 
				:title="searchPage[pageIndex1].title" 
				eventName="backTo"
				class="page-top">
		</pageTop>
		
		<view class="input-contain flex-row">
			<input type="text"
				class="input"/>
			<view class="img-box letColumnCenter">
				<image src="../../../UI/searchIcon.png" class="img"></image>
			</view>qs
		</view>
	</view>
</template>

<script>
	import pageTop from "./teamCompos/pageTop.vue";
	import {pageUrl} from "../service.js"
	import {findTeamByName} from "../service.js"
	export default {

		name: "searchBar",
		data() {
			return {
				searchPage: [
					{
					backTitle: "我的团队",
					title: "搜索我的团队"
					},
					{
						backTitle: "所有团队",
						title: "搜索所有团队"
					}
				],
				pageIndex1: 0,
				teamName:String
			};
		},
		components: {
			pageTop
		},
		props: {
			pageIndex: {
				pageIndex: Number,
				default: 0
			},
		},
		methods: {
			//通过团队名称查找团队
			findTeamByNameTest(teamName){
				findTeamByName(0,5,teamName)
				.then((res)=>{
					console.log(res);
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			//获取输入框文本内容
			getText(){
				
			}
		},
		created(){
			uni.$on("backTo",()=>{
				uni.switchTab({
					url:'../team'
				})
			})
		},
	};
</script>

<style lang="scss">
	@import url("../CSS/total.scss");
	.page-top{
		margin-top: 40px;
		
	}
	.input-contain{
		margin: 0 20px;
		background-color: #F7F9FB;
		border-radius: 15px;
		height: 24px;
		margin-top: 10px;
	}
	.input{
		flex:8;
		height: 100%;
		padding-left: 20px;
		font-size: 10px;
	}
	
	.img-box{
		height: 100%;
		// float: right;
		flex: 1;
	}
	
	.img{
		
		height: 16px;
		width: 16px;
	}
</style>
