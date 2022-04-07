<template>
	<view class="contain">
		<pageTop title="创建团队" backTitle="团队" class="top" eventName="backTeam"></pageTop>
		<!--  -->
		<view v-for="index in 2" class="menu flex-row" @click="clickFriendList">
			<image src="../../../UI/team/709.png" class="menu-img"></image>
			<view class="letColumnCenter menu-text"><text>hello</text></view>
		</view>
		<view class="button1" @click="getImage"></view>
		<view class="button2" @click="createTeam1">创建团队</view>
		<view class="bottom"></view>
	</view>
</template>

<script>
	import pageTop from "./teamCompos/pageTop.vue";
	import {
		createTeam
	} from "../service.js"
	export default {
		name: "createTeam",
		components: {
			pageTop
		},
		data() {
			return {
				title: [{
						name: "",
						url: ""
					},
					{
						name: "",
						url: ""
					}
				],
				tempFilePaths: Array,
				tempFiles: Array
				
			}
		},
		methods: {
			clickFriendList() {
				console.log("isCreate!");
				uni.navigateTo({
					url: "./friendList"
				})
			},

			async createTeam1() {
				
				let files = [];
				let token = uni.getStorageSync("userToken");
				console.log("==================================")
				console.log(token);
				for (let i = 0; i < this.tempFiles.length; i++) {
				  files[i] = {
				    name: "badge" ,
				    file: this.tempFiles[i],
				    url: this.tempFilePaths[i],
				  };
				}
				var data = {
					teamName: "hello",
					teamIntro: "这是一个测试",
					token: token
				}
				await createTeam(data,files)
					.then((res) => {
						console.log(res);
					})
					.catch((err) => {
						console.log(err)
					})
			},

			getImage() {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res)=>{
						console.log("1");
						that.tempFilePaths = res.tempFilePaths;
						that.tempFiles = res.tempFiles;
					}
				});
			},
			
			eventListen(){
				uni.$on("backTeam",()=>{
					uni.switchTab({
						url:'../team'
					})
				})
			}
		},

		created() {
			this.eventListen();
		},
		onShow() {
			// this.createTeam1();
		}

	}
</script>

<style lang="scss">
	@import url("../CSS/total.scss");

	.contain {
		.top {
			margin-top: 40px;
			border-bottom: 1px solid #007AFF;
		}

		.menu {
			.menu-img {
				height: 30px;
				width: 30px;
			}

			.menu-text {
				font-size: 10px;
			}
		}

		.bottom {
			height: 8px;
			background-color: #FFF0D9;
		}
	}

	.button1 {
		background-color: #FFF055;
		height: 100px;
	}
	
	.button2{
		background-color: #007AFF;
		height: 100px;
	}
</style>
