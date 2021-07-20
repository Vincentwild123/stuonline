<template>
	<view class="contain flex-row">
		<view class="item1 letallCenter"><text @click="cancelClick">取消</text></view>
		<view class="item2 letallCenter"><text @click="deleteClick">删除</text></view>
	</view>
</template>

<script>

export default{
	name:'pageBottom',
	data(){
		return{
			
		}
	},
	props:{
		
	},
	methods:{
		deleteClick(){
			uni.$emit('deleteClick');
		},
		cancelClick(){
			uni.$emit('cancelClick');
		}
	}
}
</script>

<style lang="scss">
	@import url("@/src/pages/level1/team/CSS/total.scss"); 
	.contain{
		height: 56px;
		align-items: center;
		justify-content: space-between;
		padding-left: 20px;
		padding-right: 20px;
		border-top: 1px solid #D1D6DB;
		.item1{
			height: 28px;
			width: 53px;
			border: 2rpx solid #6B82AA;
			border-radius: 20px;
			font-size: 10px;
			color: #6B82AA;
		}
		.item2{
			height: 28px;
			width: 53px;
			border: 2rpx solid #F4912F;
			border-radius: 20px;
			font-size: 10px;
			color: #F07272;
		}
		
	}
</style>
