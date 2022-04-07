<template>
	<!-- 团队介绍下滑列表，作为swiper的组件-->
	<view class="contain">
		<scroll-view scroll-y class="scroll flex-column" :refresher-enabled="true" :refresher-threshold="45"
			:refresher-triggered="refresherTriggered" @refresherrefresh="refresherrefresh"
			@refresherrestore="refresherrestore" @refresherabort="refresherabort">

			<!-- 各个团队介绍 -->
			<view class="list-item">
				<team-intro class="teamIntro" v-for="(item, index) in teams" :teaminfor="teams[index]" :myTeam="myTeam"
					showRow="bottom_show1"></team-intro>
			</view>
			<!-- 没加入任何团队 -->
			<view class="rest-contain letColumnCenter" v-if="!isHaveJoined">
				<image src="../../../UI/team/rest.png" class="rest"></image>
				<view class="text1">你还有加入任何团队！</view>
				<view class="text2">快去【所有团队】寻找喜欢的组织吧~</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import teamIntro from "./teamIntro.vue";

	export default {
		name: "teamList",
		data() {
			return {
				refresherTriggered: false, //true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
				_refresherTriggered: false
			};
		},
		components: {
			teamIntro,
		},

		props: {
			teams: Array,
			myTeam: Boolean,
		},
		
		computed:{
			isHaveJoined(){
				return this.teams ? true : false;
			}
		},
		methods: {
			refresherrefresh() {
				// console.log("自定义下拉刷新被触发");
				let that = this;
				if (that._refresherTriggered) {
					return;
				}
				that._refresherTriggered = true;
				//界面下拉触发，triggered可能不是true，要设为true
				if (!that.refresherTriggered) {
					that.refresherTriggered = true;
				}
				this.loadStoreData();
			},
			refresherrestore() {
				// console.log("自定义下拉刷新被复位");
				let that = this;
				that.refresherTriggered = false;
				that._refresherTriggered = false;
			},
			refresherabort() {
				// console.log("自定义下拉刷新被中止	");
				let that = this;
				that.refresherTriggered = false;
				that._refresherTriggered = false;
			},
			loadStoreData() {
				let that = this;
				this.listData();
				setTimeout(() => {
					that.refresherTriggered = false; //触发onRestore，并关闭刷新图标
					that._refresherTriggered = false;
				}, 1000)
			},
			listData() {
				let that = this;
				//这里是调用后台接口的方法数据
				uni.$emit("refreshData", {
					myTeam: that.myTeam
				})
			},
		},
	};
</script>

<style lang="scss">
	@import url("../CSS/total.scss");

	.contain {
		// border: 2px solid #007AFF;
		height: 100%;

		.scroll {
			height: 100%;
		}
	}

	.teamIntro {
		padding: 16px 10px 20px 20px;

		// padding-bottom: 20px;
	}

	.allteambottom {
		width: 100%;
	}

	.img1 {
		height: 1px;
		width: calc((100vh - 30) / 2);
	}

	.img2 {
		height: 14px;
		width: 30px;
	}

	.setmargin {
		margin: 0 7px;
	}

	.list-item .teamIntro:not(:last-child) {
		border-bottom: 1px solid #e8e8e8;
	}

	.list-item .teamIntro:not(:first-child) {
		padding: 16px 10px 20px 20px;
	}

	.list-item .teamIntro:first-child {
		padding: 0 10px 20px 20px;
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
