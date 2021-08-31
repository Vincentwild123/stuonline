<!-- 轮播图 -->
<template>
  <view class="index_swiper">
    <swiper autoplay indicator-dots circular>
      <swiper-item v-for="(item, id) in banners" :key="id">
        <navigator url="www.baidu.com">
          <image mode="widthFix" src="../../UI/swiper.png"></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: "indexSwiper",
  data() {
    return {
		banners: [{}, {}, {}, {}, {}],
	};
  },
};
</script>
<style scoped>
	.index_swiper image{
		background-color: #007AFF;
		width: 100%;
	}
</style>