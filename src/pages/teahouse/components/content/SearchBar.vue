<!-- 搜索栏 -->
<template>
	<view class="searchBar">
		<image src="/UI/serchBar.png" mode="widthFix"></image>
		<slot name="text"></slot>
	</view>
</template>

<script>
export default {
name:'SearchBar',
  data () {
    return {
    };
  }
}

</script>
<style scoped>
	.searchBar{
		height: 25px;
		line-height: 25px;
		width: 100%;
		background-color: #f7f9fb;
		text-align: center;
		font-size: 12px;
		color: #d0d0d0;
        border-radius: 25px;
	}
    .searchBar image{
        vertical-align: middle;
        width: 11px;
        height: 11px;
    }
</style>