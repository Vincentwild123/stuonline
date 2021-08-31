<template>
	<!-- 团队介绍下滑列表，作为swiper的组件-->
	<view class="contain">
		<scroll-view scroll-y class="scroll flex-column">
			<!-- 各个团队介绍 -->
			<view class="list-item">
				<team-intro class="teamIntro" v-for="(item,index) in teams" :teaminfor="teams[index]" :myTeam="myTeam" showRow="bottom_show1"></team-intro>
			</view>
			<!-- "到底"提示符 -->
			<view class="allteambottom letallCenter">
				<view class="letColumnCenter">
					<image src="../../../../UI/team/straightline8.png" class="img1"></image>
				</view>
				<view class="setmargin letColumnCenter">
					<image src="../../../../UI/team/isbottom.png" class="img2"></image>
				</view>
				<view class="letColumnCenter">
					<image src="../../../../UI/team/straightline9.png" class="img1"></image>
				</view>
			</view>	
		</scroll-view>	
	</view>
</template>

<script>
	import teamIntro from "./teamIntro.vue";

	export default{
		name: "teamList",		
		data(){
			return{

			};
		},
		components:{
			teamIntro,
			
		},
		
		props:{
			teams: Array,
			myTeam: Boolean
		},
		
		methods:{

		},
	}
	
</script>

<style lang="scss">
	@import url('@/src/pages/level1/team/CSS/total.scss');
	.contain{
		// border: 2px solid #007AFF;
		height: 100%;
		.scroll{
			height: 100%;
		}
	}
	.teamIntro{
		padding: 16px 10px 20px 20px;
		
		// padding-bottom: 20px;
	}
	
	.allteambottom{
		width: 100%;
	}
	.img1{
		height: 1px;
		width: calc((100vh - 30)/2);
	}
	.img2{
		height: 14px;
		width: 30px;
	}
	.setmargin{
		margin: 0 7px;
	}
	.list-item .teamIntro:not(:last-child){
		border-bottom: 1px solid #E8E8E8;
	}
	
	.list-item .teamIntro:not(:first-child){
		padding: 16px 10px 20px 20px;
	}
	.list-item .teamIntro:first-child{
		padding: 0 10px 20px 20px;
	}
</style>
