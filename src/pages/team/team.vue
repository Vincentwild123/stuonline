<template>
	<view class="home flex-column">
		<!-- 引入teamTop -->
		<view>
			<teamTop class="compos-top" @teamTop="teamTop" :clickIndex="clickIndex"></teamTop>
		</view>

		<!-- 引入搜索组件 -->
		<view class="compos flex-column">
			<teamSearch class="compos-search" :titleIndex="clickIndex"></teamSearch>
		</view>
		<!-- 创建团队 -->
		<view class="create" @click="gotoCreateTeam">
			<image src="../../UI/team/create.png" class="create_img"></image>
			<text class="create_text">创建团队</text>
			<view class="create_icon letColumnCenter">
				<uniIcon type="jiantou" :isEvent="false"></uniIcon>
			</view>
		</view>
		<!-- 引入各个团队简介 -->
		<!-- <team-list class="item-scroll"  v-if="clickIndex === 1"></team-list> -->
		<swiper @change="changeItem" :current="clickIndex" class="compos-swiper" v-if="!isLoad">
			<swiper-item class="compos-swiper-item" item-id="swiper-0">
				<team-list class="item-scroll" v-if="clickIndex === 0 && isHaveJoined" :teams="teams" :myTeam="false" :v-if="false"></team-list>
				<!-- 没加入任何团队 -->
				<view class="rest-contain letColumnCenter">
					<image src="../../UI/team/rest.png" class="rest"></image>
					<view class="text1">你还有加入任何团队！</view>
					<view class="text2">快去【所有团队】寻找喜欢的组织吧~</view>
				</view>
			</swiper-item>
			<swiper-item item-id="swiper-1">
				<team-list class="item-scroll" v-if="clickIndex === 1 && isHaveJoined" :teams="teams" :myTeam="true"></team-list>
				<view class="rest-contain letColumnCenter" v-if="!isHaveJoined">
					<image src="../../UI/team/rest.png" class="rest"></image>
					<view class="text1">你还有加入任何团队！</view>
					<view class="text2">快去【所有团队】寻找喜欢的组织吧~</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import teamTop from "./teamCompos/teamTop.vue";
	import teamSearch from "./teamCompos/teamSearch.vue";
	import teamList from "./teamCompos/teamList.vue";
	import uniIcon from "./subPages/icon/uniIcon.vue"
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
			teamList,
			uniIcon
		},
		data() {
			return {
				clickIndex: 1,
				myTeam: true,
				teams: [],
				isLoad: true,
				isHaveJoined: false,

			};
		},

		methods: {
			changeItem(e) {
				this.clickIndex = e.detail.current;
			},
			
			gotoCreateTeam(){
				uni.navigateTo({
					url:"./subPages/createTeam"
				})
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
				getHaveJoinedTeam().then(
					(res) => {
						this.teams = res.data.data;
						//如果没有加入任何团队
						if (this.teams)
							this.isHaveJoined = true;
						this.isLoad = false;
					},
					(err) => {
						console.log(err);
					}
				);
			},

		},

		created() {
			uni.$on("indexClick0", () => {
				this.clickIndex = 0;
			});
			uni.$on("indexClick1", () => {
				this.clickIndex = 1;
			});
		},

		computed: {
			userInfo() {
				return this.$store.getters['user/userData']
			}
		},

		onLoad() {
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

	.rest-contain {
		flex-direction: column;

		.rest {
			height: 214px;
			width: 214px;
		}

		.text1 {
			font-size: 12px;
			color: #686868;
		}

		.text2 {
			font-size: 10px;
			color: #AFAAAA;
		}

	}
</style>
