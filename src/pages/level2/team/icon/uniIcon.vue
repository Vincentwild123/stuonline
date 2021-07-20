<!-- 图标无法正常显示 -->
<template>
	<view :class="'icon-'+type" :style="{color: color,'font-size':size+'px'}" class="iconfont" @click="_iconOnClick" />
</template>

<script>
	
export default{
	name: 'uniIcon',
	props:{
		type:{
			type: String,
			default: 'xuanze'
		},
		color:{
			type: String,
			default: '#333333'
		},
		size:{
			type: String,
			default: '16'
		},
		'index': Number,
		'eventName': String
	},
	methods:{
		_iconOnClick(){
			console.log(this.eventName+this.index.toString());
			uni.$emit(this.eventName+this.index.toString(),{index:this.index});
		}
	},
	created() {
	
	}
}
</script>

<style>
	@import url("//at.alicdn.com/t/font_2641164_6zctso8bbto.css");
</style>
