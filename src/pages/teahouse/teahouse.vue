<template>
  <scroll-view scroll-y="true" class="scrollY">
    <view class="main">
      <search-bar><text slot="text">搜索任务</text></search-bar>
      <!--滚动条开始-->
      <view class="indexNotice">
        <notice-bar></notice-bar>
      </view>
      <!--滚动条结束-->
      <!-- 轮播图 开始 -->
      <view class="indexSwiper">
        <index-swiper></index-swiper>
      </view>
      <!-- 轮播图 结束 -->
      <!-- 导航 开始 -->
      <index-cate :titles="tabs" v-model="tabIndex" @changeType="changeType" class="index_cate"></index-cate>
      <!-- 导航 结束 -->
      <!--楼层开始-->
      <swiper
        :style="{ height: height }"
        :current="tabIndex"
        @change="swiperChange"
      >
        <swiper-item v-for="(tab, i) in tabs" :key="i">
          <mescroll-item
            ref="mescrollItem"
            :i="i"
            :index="tabIndex"
            :tabs="tabs"
          ></mescroll-item>
        </swiper-item>
      </swiper>
      <!--楼层结束-->
    </view>
    <!-- 点击评论后输入框弹出开始 -->
    <uni-popup ref="popup">
      <post-bar />
    </uni-popup>
    <!-- 点击评论后输入框弹出结束 -->
  </scroll-view>
</template>

<script>
import PostBar from "./components/PostBar.vue";
import indexSwiper from "./components/IndexSwiper.vue";
import IndexCate from "./components/IndexCate.vue";
import NoticeBar from "./components/content/NoticeBar.vue";
import SearchBar from "./components/content/SearchBar.vue";
import MescrollItem from "./components/mescroll-item.vue";
import MescrollMixin from "./components/content/mescroll-uni/mescroll-mixins";
import MescrollMoreItemMixin from "./components/content/mescroll-uni/mixins/mescroll-more-item";
import MescrollUni from "./components/content/mescroll-uni/mescroll-uni.vue";
export default {
  name: "teahouse",
  mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
  data() {
    return {
      //左右滑动
      tabs: [
        { name: "闲聊" },
        { name: "学业" },
        { name: "组队" },
        { name: "比赛" },
      ], //导航栏内容
      height: "400px", // 需要固定swiper的高度
      tabIndex: 0, // 当前tab的下标
    };
  },
  components: {
    indexSwiper,
    IndexCate,
    NoticeBar,
    SearchBar,
    PostBar,
    MescrollItem,
    MescrollUni,
  },
  methods: {
    // 轮播菜单
    swiperChange(e) {
      this.tabIndex=e.detail.current;
    },
    //点击弹出输入框
    createComment(data) {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open("bottom");
      //通过事件总线发布一级评论
      this.$nextTick(() => {
        this.$bus.$emit("replyPost", data);
      });
    },
    //修改当前激活模块
    changeType(index) {
      this.tabIndex = index; // 当前tab的下标
    },
  },
  onLoad() {
    // 需要固定swiper的高度
    this.height = uni.getSystemInfoSync().windowHeight + "px";
  },
};
</script>

<style scoped>
.main {
  padding: 0 10px;
  padding-top: 4vh;
}
.scrollY {
  margin-top: 4vh;
  height: 96vh;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
.index_cate{
  position:sticky;
  top: 0;
  z-index: 999;
  background-color: #fff;
}
</style>
