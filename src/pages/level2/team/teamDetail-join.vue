<template>
	<view class="contain" v-if="!isLoad">
		<pageTop class="Compos-top" eventName = "teamDetail-joinback" backTitle="我的团队" :title="teamInfo.teamName"></pageTop>
		<!-- 团队详情区 -->
		<view class="item letColumnCenter">
			<view class="item-left letRowCenter">
				<image :src="teamInfo.badgeUrl" class="item-left-img"></image>
			</view>
			<view class="item-right flex-column">
				<text class="item-right-teamName">{{teamInfo.teamName}}</text>
				<text class="item-right-teamIntro">简介：{{teamInfo.teamIntro}}</text>
			</view>
		</view>
		<!-- 显示团队成员头像区 -->
		<view class="compos-teamMembers" >
			<team-member class="compos-teamMembers-item" :teamLeaderInfo="teamInfo.leaderInfo" :teamMembers="teamInfo.membersInfo"></team-member>
		</view>
		<!-- 3个选择操作区 -->
		<view class="letColumnCenter item-xuanze" v-for="(item,index) in xuanze1" v-if="item.isShow" @click="navigateToOtherPage(index)">
			<text class="item-xuanze-text">{{item.name}}</text>
			<view class="item-members-right letColumnCenter">
				<uniIcon type="jiantou" size="15" color="#ADB7D1" eventName="teamDetail-join" :index="index"></uniIcon>
			</view>
		</view>
		<!-- 解散团队或退出团队 -->
		<view class="letallCenter item-xuanze"><text class="item-xuanze-text1">{{xuanze2[xuanze2_index]}}</text></view>
	</view>
</template>

<script>
import pageTop from "./teamCompos/pageTop.vue";
import uniIcon from "./icon/uniIcon.vue";
import teamMember from "./teamCompos/teamMembersImgList.vue";
import {getTeamInfoById,
		findInStorage,
		deleteMemberInTeam,
		findMenbersByTeamID,
		isLeader} 
		from "@/src/API/interfaceAPIs/chenguangteng/teamApi.js"
import {isJoin} from "@/src/API/interfaceAPIs/chenguangteng/teamDetailApi.js"
export default{
	name:'teamDetail',
	components:{
		pageTop,
		uniIcon,
		teamMember
	},
	data(){
		return {
			isLeader: false,//是否是该团队的队长
			isJoin: true, //是否已经加入该团队
			teamInfo:{},	//团队的信息
			teamMembers:[],	//所有团队成员
			teamId: Number,	//团队id	
			eventName:'',
			isLoad:true,
			xuanze1:[
				{
					name:"查看往期活动",
					isShow: true,
					index:0
				},
				{
					name:"修改团队信息",
					isShow: false,
					index:1
				},
				{
					name:"队长权限转移",
					isShow: false,
					index:2
				}
			],
			xuanze2:["解散团队","退出团队"],
			xuanze2_index: 1
		}
	},
	created() {
		//返回上一页监控事件：对pageTop的左箭头
		uni.$on('teamDetail-joinback',()=>{
			console.log('返回teamDetail-join的上一个页面');
			uni.navigateBack();
		})
		
		//团队成员右箭头监听
		uni.$on('teamDetail-join3',()=>{
			console.log('打开团队成员管理页面');
			uni.navigateTo({	//跳转到管理团队页面
				url:"showTeamMembers?teamId="+this.teamId+"&isLeader="+this.isLeader,
			})
		})

	},
	onLoad(option) {
		this.teamId = option.teamId;
		console.log(this.teamId);
		this.init();
	},
	
	methods:{
		/**
		 * @param {Number} index 数组下标
		 * 3个选择操作区 单击事件监听，跳转页面
		 */
		navigateToOtherPage(index){
			if(index === 0){
				console.log("查看往期活动被点击！");
				uni.navigateTo({
					url:'/src/pages/level2/team/showActivity'
				})
			}	
			else if(index === 1){
				console.log("修改团队信息被点击！");
				uni.navigateTo({
					
				})
			}else if(index === 2){
				console.log("队长权限转移被点击！");
				uni.navigateTo({
					
				})
			}		
		},
		
		/**
		 * 判断用户是否是该团队的队长
		 */
		isLeaderJudge(){
			let userId = 1;//用户的userId,暂定，后期从本地获取
			if(this.teamInfo.leaderInfo.userId === userId){//判断和团队队长的userId是否相同
				this.isLeader = true;
			}else{
				this.isLeader = false;
			}
		},
		
		/**
		 * 判断是否已经加入该团队
		 */
		isjoinOr(){
			this.isJoin = isJoin();
		},

		/**
		 * 数据初始化
		 */
		init(){
			getTeamInfoById(this.teamId)//通过团队id或取团队信息
			.then((res)=>{
				this.teamInfo = res.data.data;
				console.log(this.teamInfo);
				this.isLeaderJudge();
				//判断是否已经加入该团队
				if(!this.isJoin){
					console.log(this.teamId)
					uni.navigateTo({
						url:"./teamDetail-nojoin?teamId="+this.teamId
					})
				}
				//初始时要对是否是团队队长进行判断并执行相应操作
				if(this.isLeader){	//是团队队长
					this.xuanze2_index = 0;//xuanze2的下标，0表示"解散团队"字符串，
					this.xuanze1[1].isShow = true;//展示"修改团队信息"
					this.xuanze1[2].isShow = true;//展示"队长权限转移"
				}else{	//不是团队队长
					this.xuanze2_index = 1;//1表示"退出团队"字符串
					this.xuanze1[1].isShow = false;
					this.xuanze1[2].isShow = false;
				}
				
				this.isLoad = false;
			})
			.catch((err)=>{
				console.log(err);
			})
		}
	}

}
</script>

<style lang="scss">
	@import url("@/src/pages/level1/team/CSS/total.scss"); 
	.contain{
		overflow: hidden;
		.Compos-top{
			margin-top: 30px;
			margin-bottom: 8px;
		}
		.item{
			height: 78px;
			background-color: #F7F9FB;
			.item-left{
				height: 45px;
				width: 45px;
				margin-left: 20px;
				margin-right: 8px;
				// border: #A71D5D solid 1px;
				background: url(../../../UI/team/background.png);
				background-size: 100%;
				border-radius: 50%;
				object-fit: cover; 
				object-position: center;
				.item-left-img{
					height: 28px;
					width: 28px;
					margin-top: 5px;
					border-radius: 50%;  
					object-fit: cover; 
					object-position: center;
					
				}
			}
			.item-right{
				// width: 100%;
				
				.item-right-teamName{
					font-size: 12px;
					font-weight: bold;
					// letter-spacing: 1px;
					color: #676767;
					margin-bottom: 4px;
				}
				
				.item-right-teamIntro{
					font-size: 9px;
					color: #ADA7A7;
					// width: 76%;
				}
			}
		}
	
		.item-xuanze{
			height: 56px;
			background-color: #F7F9FB;
			margin-top: 10px;
			.item-xuanze-text{
				font-size: 12px;
				color: #676767;
				font-weight: bold;
				padding-left: 30px;
				overflow: hidden;
				width: 82%;
			}
			.item-xuanze-text1{
				font-size: 10px;
				color: #F07272;
				
			}
		}
	}
	
</style>
