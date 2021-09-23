<template>
	<view class="contain">
		<pageTop       
			title="创建团队"
			backTitle="团队"
			class="top"
			eventName="showTeamMembersBack"
		></pageTop>
		<!-- 搜索框 -->
		<teamSearch :titleIndex="2" class="team-search"></teamSearch>
		<!--  -->
		<view class="name letColumnCenter">我的好友列表</view>
		<!-- 我的好友列表 -->
		<scroll-view scroll-y class="scroll-list">
			<view v-for="index in 20" class="member">
				<memberItem :isCreateUI="true" :teamMemberInfo="teamMemberInfo" ></memberItem>
			</view>
		</scroll-view>		
		
	</view>
</template>

<script>
	import pageTop from "./teamCompos/pageTop.vue";
	import teamSearch from "../teamCompos/teamSearch.vue";
	import memberItem from "./teamCompos/memberItem.vue";
	export default{
		name:"createTeam",
		components:{
			pageTop,
			teamSearch,
			memberItem
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
				],
				teamMemberInfo:{
					userName:"星叶",
					userHead:"https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg"
				}
			}
		},
		methods:{
			
		}
		
	}
</script>

<style lang="scss">
	@import url("../CSS/total.scss");
	.contain{
		overflow: hidden;
		.top{
			margin-top: 40px;
			border-bottom: 1px solid #007AFF;
		}
		.team-search{
			margin: 10px 20px 0;
		}
		.name{
			height: 20px;
			font-size: 10px;
			color: #3AAA20;
			margin-left: 20px;
		}
	
	}
	
	.scroll-list .member:not(:last-child){
		margin-bottom: 5px;
	}
	
</style>

