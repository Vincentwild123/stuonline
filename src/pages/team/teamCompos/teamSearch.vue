<template>
	<view class="searchBar" @click="gotoSearch">
		<text class="text">{{title[titleIndex]}}</text>
		<view class="img-contain letColumnCenter">
			<image src="../../../UI/searchIcon.png" class="img"></image>
		</view>
	</view>
</template>

<script>
	import SearchBar from "../../../components/SearchBar.vue"
	import {gotoPage,pageUrl} from "../subPages/service.js"
	export default {
		name: "teamSearch",
		components: {
			SearchBar,
		},
		data() {
			return {
				title: ["搜索感兴趣的团队", "搜索我的团队"],
			};
		},
		props: {
			titleIndex: Number,
		},
		methods:{
			gotoSearch(){
				if(this.titleIndex === 0){
					gotoPage(pageUrl.searchBar)
				}else{
					gotoPage(pageUrl.searchBar)
				}
			}
		}
	};
</script>

<style lang="scss">
	@import url("../CSS/total.scss");

	.searchBar {
		height: 24px;
		border-radius: 16px;
		background-color: #F7F9FB;
		position: relative;
		
		.text {
			margin-left: 20px;
			font-size: 10px;
			color: #B2B2B2;
			line-height: 24px;
		}

		.img-contain {
			height: 100%;
			float: right;
			.img {
				margin-right: 15px;
				width: 16px;
				height: 16px;
			}
		}

	}
</style>
