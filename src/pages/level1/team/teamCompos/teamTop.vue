<template>
		
	<view class="contain letallCenter">
		<!-- 所有团队和我的团队上标 -->
		<view class = "contain-center flex-column" v-for="(item,index) in titles">
			<view v-bind:src="item.nameImg" class="contain-center-title letRowCenter" @click="imgClick(index)">
				<text>{{item.name}}</text>
			</view>
			<view class="letRowCenter">
				<view class="contain-center-clickimage" v-if="clickIndex === index"></view>
			</view>
		</view>
		<!-- 最右边的创建团队 -->
		<view class="contain-right">
			<view class="contain-right-create flex-column">
				<view class="letallCenter">
					<image src="../../../../UI/team/createTeam-img.png" class="contain-right-create-img"></image>
				</view>
				<view class="contain-right-create-name"><text>创建团队</text></view>
			</view>
		</view>
	</view>

</template>

<script>
	export default{
		name:"teamSearch",
		props:{
			'clickIndex':Number
		},
		data(){
			return{
					titles:[
						{
							name:"所有团队",	
						},
						{
							name:"我的团队",
						}
					],
				};
		},
		
		methods:{
			//当点击“我的团队”或者“所有团队”
			imgClick(index){
				//indexClick0表示'所有团队'，indexClick1表示'我的团队'
				uni.$emit('indexClick'+index.toString());
			},			
	
			
		},
		
		//组件创建完成之后执行
		created() {

		}
	};
</script>

<style lang="scss">
	@import url("@/src/pages/level1/team/CSS/total.scss");
	.contain{
		padding-top: 30px;
		height: 32px;
		width: 100%;
		background-color: #F7F9FB;
		.contain-center{
			margin-left: 12.5px;
			margin-right: 12.5px;
			.contain-center-title{
				font-size: 13px;
				font-weight: bold;
				color: #000000;
			}
			.contain-center-clickimage{
				margin-top: 2px;
				width: 43px;
				height: 4px;
				background-color: #F4912F;
				border-radius: 10px;
			}
		}
		.contain-right{
			position: absolute;
			right: 5%;
			.contain-right-create{
				.contain-right-create-img{
					width: 16px;
					height: 16px;
				}
				.contain-right-create-name{
					margin-top: 3px;
					font-size: 7px;
					color: #F4912F;
					
				}
			}
		}
	}
	

	

</style>
