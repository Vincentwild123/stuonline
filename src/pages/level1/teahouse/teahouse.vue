<template>
<<<<<<< HEAD
  <view class="main">
    <!-- 轮播图 开始 -->
	<!--滚动条开始-->
	<view class="indexNotice">
		<notice-bar></notice-bar>
	</view>
	<!--滚动条结束-->
	<view class="indexSwiper">
		<index-swiper></index-swiper>
	</view>
    <!-- 轮播图 结束 -->
    <!-- 导航 开始 -->
	<index-cate></index-cate>
    <!-- 导航 结束 -->
    <!--楼层开始-->
    <index-floor></index-floor>
	<index-floor></index-floor>
	<index-floor></index-floor>
	<index-floor></index-floor>
	<index-floor></index-floor>
    <!--楼层结束-->
  </view>
</template>

<script>
import indexSwiper from "./childComps/indexSwiper.vue";
import IndexFloor from "./childComps/indexFloor.vue";
import IndexCate from "./childComps/indexCate.vue";
import NoticeBar from '../../../components/content/NoticeBar.vue'; 
export default {
  data() {
    return {
      
    };
  },
  components: {
    IndexFloor,
    indexSwiper,
    IndexCate,
	NoticeBar
=======
  <div>TEAHOUSE</div>
</template>

<script>
export default {
  data() {
    return {};
>>>>>>> 431ea731e4effdf94b192f780614fdb7249fa46b
  },
};
</script>

<<<<<<< HEAD
<style scoped>
.main{
	padding: 0 10px;
}
=======
<style>
>>>>>>> 431ea731e4effdf94b192f780614fdb7249fa46b
</style>
