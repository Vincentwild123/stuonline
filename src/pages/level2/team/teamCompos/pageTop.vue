<template>
	<view class="contain flex-row">
		<view class="jiantou flex-row">
			<view class="letColumnCenter" @click="backClick">
				<uniIcon type="youjiantou" color='#829FEA' size='18'></uniIcon>
			</view>
			<view class="letColumnCenter name">
				<text>{{backTitle}}</text>
			</view>
		</view>
		<view class="timu letallCenter">
			<text>{{title}}</text>
		</view>
		<view class="guangli letallCenter" >
			<text v-if="isLeader" @click="managedIsClicked(managedTitle[managedTitleIndex].name)" :style="{'color':managedTitle[managedTitleIndex].color}">{{managedTitle[managedTitleIndex].name}}</text>
		</view>
	</view>
	
</template>

<script>
import uniIcon from "../icon/uniIcon.vue";
export default{
	name:'pageTop',
	components:{
		uniIcon
	},
	data(){
		return {
			managedTitle:[
				{
					name:"管理",
					color: "#FF860F"
				},
				{
					name:"完成",
					color: "#6B82AA"
				},
				],
		}
	},
	methods:{
		//当点击管理，加入管理状态
		managedIsClicked(value){
			console.log(value);
			if(value === "管理"){
				console.log("进入管理模式");
				uni.$emit('manageIsClicked');
				
			}else if(value === "完成"){
				uni.$emit('finishIsClicked');
				console.log("退出管理模式");
			}else{
				console.log("出错！");
			}
		},
		backClick(){
			uni.$emit(this.eventName);
		}
	},
	created() {
	},
	props:{
		managedTitleIndex : Number,
		'isLeader': Boolean,
		'backTitle': String,
		'title': String,
		'eventName': String
	}
}
</script>

<style lang="scss">
	@import url("@/src/pages/level1/team/CSS/total.scss"); 
	.contain{
		height: 25px;

		.jiantou{
			flex: 1.5; 
			padding-left: 18px;
			.name{
				
				font-size: 13px;
				font-weight: bold;
				letter-spacing: 1px;
				text-overflow: ellipsis;
			}
		}
		.timu{
			flex: 3;
			font-size: 13px;
			font-weight: bold;
			// letter-spacing: 2px;
		
		}
		.guangli{
			flex: 1.5;
			font-size: 11px;
		}
		
		
	}
</style>