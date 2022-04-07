<template>
	<view class="home flex-column">
		<!-- 引入teamTop -->
		<view>
			<team-top class="compos-top"  :clickIndex="clickIndex"></team-top>
		</view>

		<!-- 引入搜索组件 -->
		<view class="compos flex-column">
			<teamSearch class="compos-search" :titleIndex="clickIndex"></teamSearch>
		</view>
		<!-- 创建团队 -->
		<view class="create" @click="gotoCreateTeam">
			<image src="../../UI/team/create.png" class="create_img"></image>
			<text class="create_text">创建团队</text>
			<view class="create_icon letColumnCenter" >
				<image src="../../UI/turnRight.png" class="turnRight"></image>
			</view>
		</view>
		<!-- 引入各个团队简介 -->
		<!-- <team-list class="item-scroll"  v-if="clickIndex === 1"></team-list> -->
		<swiper @change="changeItem" :current="clickIndex" class="compos-swiper" v-if="!isLoad">
			<swiper-item class="compos-swiper-item" item-id="swiper-0">
				<team-list class="item-scroll" v-if="clickIndex === 0 " :teams="teams" :myTeam="false"></team-list>
			</swiper-item>
			<swiper-item item-id="swiper-1">
				<team-list class="item-scroll" v-if="clickIndex === 1 " :teams="teams" :myTeam="true"></team-list>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import teamTop from "./teamCompos/teamTop.vue";
	import teamSearch from "./teamCompos/teamSearch.vue";
	import teamList from "./teamCompos/teamList.vue";
	import {gotoPage,pageUrl} from "./subPages/service.js";
	import {
		getMandate,
		getHaveJoinedTeam,
		getAllTeam,
		getTeamInfoById,
	} from "./service.js";
	import axios from "../../axios/axios.js";
	export default {
		name: "team",
		components: {
			teamSearch,
			teamTop,
			teamList
		},
		data() {
			return {
				clickIndex: 1,
				myTeam: true,
				teams: [],
				isLoad: true,
			};
		},

		methods: {
			changeItem(e) {
				this.clickIndex = e.detail.current;
			},
			
			gotoCreateTeam(){
				if(this.$store.getters["user/isLogin"] === 0){
					uni.showToast({
						title:"请先登录！",
						icon: "none",
					});
					return;
				}
				gotoPage(pageUrl.createTeam);
			},
			//页面初始化
			async init() {
				//表单鉴权
				await getMandate()
					.then((res) => {
						// console.log(res);
					})
					.catch((err) => {
						console.log(err);
					});
				//获取已经加入的团队
				this.getHavaJoinedTeams();
			},
			
			getHavaJoinedTeams(){
				getHaveJoinedTeam().then(
					(res) => {
						this.teams = res.data.data;
						//如果没有加入任何团队
						this.isLoad = false;
						console.log(this.teams)
					},
					(err) => {
						console.log(err);
					}
				);
			}
		},

		created() {
			uni.$on("indexClick0", () => {
				this.clickIndex = 0;
			});
			uni.$on("indexClick1", () => {
				this.clickIndex = 1;
			});
			uni.$on("refreshData",(value)=>{
				this.getHavaJoinedTeams();
			})
		},
		computed: {
			userInfo() {
				return this.$store.getters['user/userData']
			}
		},

		onShow() {
			this.init();
		},
	};
</script>

<style lang="scss">
	@import url("./CSS/total.scss");

	.home {
		height: 100%;
		overflow: hidden;
	}

	.compos-top {
		border-bottom: 1.5px solid #cbd5ef;
	}

	.create {
		height: 50px;
		margin: 0 20px;
		border-bottom: 1px solid #E8E8E8;
		.create_img {
			position: relative;
			top: 50%;
			transform: translateY(-50%);
			height: 30px;
			width: 30px;
			
		}

		.create_text {
			margin-left: 10px;
			font-size: 10px;
			color: #676767;
		}
		
		.create_icon{
			float: right;
			height: 100%;
		}
	}
	
	.turnRight{
		height: 16px;
		width: 8px;
	}
	.compos {
		padding: 0 20px;
	}

	.compos-search {
		margin-top: 8px;
	}

	.item-scroll {}

	.compos-swiper {
		// height: 300px;
		// height: calc(100vh - 166px);
		height: calc(100vh - 240px);
		margin-top: 20px;
	}

</style>
