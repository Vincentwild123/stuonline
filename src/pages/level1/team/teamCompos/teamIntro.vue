<template>
	<!-- 开始一个团队的介绍 -->
	<view class="contain flex-column" @click="teamIsClick" >
		<view class="top flex-row">
			<view class="top-left flex-row">
				<!-- 团队头像 -->
				<view class="">
					<image class="teamImg" :src="teaminfor.badgeUrl"></image>
				</view>
				<!-- 团队名字、队长以及队徽 -->
				<view class="teamImg-right flex-column">
					<!-- 团队名字 -->
					<view class="teamName letColumnCenter">{{teaminfor.teamName}}({{teamMembersLength}})</view>
					<!-- 团队队徽和队长 -->
					<view class="teamName-bottom letColumnCenter">
						<image class="teamIcon" :src="teamIconUrl"></image>
						<view class="teamLeader">队长：{{teamLeader.userName}}</view>
					</view>
				</view>
			</view>
			<!-- 加入团队的图标 -->
			<view class="top-right flex-row-reverse" v-if="!myTeam">
				<view class="joinImg letallCenter"><view>加入</view></view>
			</view>
		</view>
		<!-- 团队的介绍 -->
		<view class="bottom" :class="showRow"><text>{{teaminfor.teamIntro}}</text></view>
	</view>	
	<!-- 一个团队介绍完毕 -->
	
</template>

<script> 
import {getTeamInfoById} from "@/src/API/interfaceAPIs/chenguangteng/teamApi.js"

export default{
	name:"teamIntro",
	data(){
		return{
			teamIconUrl: require("../../../../UI/team/teamicon.png"),
			isShow: false,
			teamLeader: Object,
			
		};
	},
	
	methods:{	
		teamIsClick(id){
			
			if(!this.isNoJoin){
				if(this.myTeam){
					uni.navigateTo({				
						url: '/src/pages/level2/team/teamDetail-join?teamId=' + this.teaminfor.teamId,
					})
				}
				else{
					uni.navigateTo({
						url: '/src/pages/level2/team/teamDetail-nojoin?teamId=' + this.teaminfor.teamId,
					})
				}
			}
		},
	},
	
	props:{
		teaminfor: Object,
		myTeam: Boolean,
		showRow: String,
		isNoJoin: {
			isNoJoin : Boolean,
			default : false
		}
	},
	
	watch:{
		teaminfor(newValue, oldValue) {
			console.log("teaminfor",newValue,oldValue)
		}
	},
	created() {

		getTeamInfoById(this.teaminfor.teamId)
		.then((res)=>{
			this.teamLeader = res.data.data.leaderInfo;
			this.teamMembersLength = res.data.data.membersInfo.length;
		})
		.catch((err)=>{
			console.log(err);
		})
	}
}
</script>

<style lang="scss">
@import "@/src/pages/level1/team/CSS/total.scss";
	.contain{
		height: 100%;
		
		.top{
			height: 100%;
			.top-left{
				flex:1;
				.teamImg{
					width: 47.6px;
					height: 47.6px;
					border-radius: 50%;
					background: url('https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg');
					background-size: 100%;
				}
				.teamImg-right{
					height: 100%;
					margin-left: 10px;
					.teamName{
						flex: 1;
						font-size: 12px;
						color: #676767;
						font-weight: bold;
						border-top: 3px;
					}
					.teamName-bottom{
						flex: 1;
						display: flex;
						.teamIcon{
							width: 15.7px;
							height: 14.7px;
							margin-right: 4px;
						}
						.teamLeader{
							font-size: 10px;
							color: #676767;
							font-weight: bold;
						
						}
						
					}
				}
			}
			.top-right{
				flex: 1;
				.joinImg{
					font-size: 9px;
					height: 21px;
					width: 53px;
					border: 1px solid #F4912F;
					border-radius: 30px;
					color: #F4912F;
				}
			}

		}
		.bottom{
			font-size: 10px;
			color: #AFAAAA;
			margin-top: 8.12px;
			text-align: justify;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
		}
		.bottom_show1{
			-webkit-line-clamp: 1;
		}

	}
	
	.teamImg .teamImg-body{
		position: relative;
		top:-5px;
		height: 13px;
		width: 25px;
		border: 1px solid #FF860F;
		background-color: #FAF1E5;
		border-radius: 15px;
		font-size: 7px;
		letter-spacing: 1px;
		color: #FF860F;
	}
</style>