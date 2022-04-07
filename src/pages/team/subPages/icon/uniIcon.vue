<!-- 图标无法正常显示 -->
<template>
	<view>
		<image
		  :src="url"
		  class="iconfont"
		  @click="_iconOnClick"
		></image>
	</view>
</template>

<script>
export default {
  name: "uniIcon",
  props: {
    type: {
      type: String,
      default: "xuanze",
    },
    color: {
      type: String,
      default: "#333333",
    },
    size: {
      type: String,
      default: "16",
    },
    index: Number,
    eventName: String,
	isEvent:{
		type:Boolean,
		default: true,
	},
	url: {
		type: String,
	}
  },
  methods: {
    _iconOnClick() {
		if(this.isEvent){
			console.log(this.eventName + this.index.toString());
			uni.$emit(this.eventName + this.index.toString(), { index: this.index });
		}
    },
  },
  created() {},
};
</script>

<style>
	.iconfont{
		height: 16px;
		width: 9px;
	}
</style>
