<template>
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
    <index-cate @changeType="changeType"></index-cate>
    <!-- 导航 结束 -->
    <!--楼层开始-->
    <index-floor
      v-for="(item, index) in posts[activeType].list"
      :list="item"
      @likeIt="likeIt"
      @unlikeIt="unlikeIt"
    ></index-floor>
    <view>
      <load-more :loadStatus="loadStatus"></load-more>
    </view>
    <!--楼层结束-->
  </view>
</template>

<script>
import indexSwiper from "./childComps/indexSwiper.vue";
import IndexFloor from "./childComps/indexFloor.vue";
import IndexCate from "./childComps/indexCate.vue";
import NoticeBar from "../../../components/content/NoticeBar.vue";
import LoadMore from "../../../components/content/LoadMore.vue";

import {
  getFloor,
  setLike,
  setUnLike,
} from "../../../axios/teahouse/teahouse.js";
export default {
  name: "teahouse",
  data() {
    return {
      posts: {
        talk: {
          list: [],
        },
        study: {
          list: [],
        },
        team: {
          list: [],
        },
        race: {
          list: [],
        },
      },
      activeType: "talk",
      postId: 0,
      pageSize: 4,
      loadStatus: "more", //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
      isLoadMore: false, //是否加载中
      lastPostId: 999,
      firstLoad: true,
    };
  },
  components: {
    IndexFloor,
    indexSwiper,
    IndexCate,
    NoticeBar,
    LoadMore,
  },
  mounted() {
    this.getFloor(this.postId, this.pageSize);
  },
  methods: {
    getFloor(postId, pageSize) {
      getFloor(postId, pageSize).then((res) => {
        console.log(res);
        this.isLoadMore = true;
        this.loadStatus = "loading";
        if (this.firstLoad) {
          this.lastPostId = res.data[pageSize - 1].postSimple.postId;
        }
        if (
          this.lastPostId == res.data[res.data.length - 1].postSimple.postId &&
          !this.firstLoad
        ) {
          //判断当前的页码是不是已经是最后一页
          this.isLoadMore = false;
          this.loadStatus = "nomore";
          return;
        }
        this.firstLoad = false;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].postSimple.postModule == 0) {
            this.posts["talk"].list.push(res.data[i]);
          } else if (res.data[i].postSimple.postModule == 1) {
            this.posts["study"].list.push(res.data[i]);
          } else if (res.data[i].postSimple.postModule == 2) {
            this.posts["team"].list.push(res.data[i]);
          } else {
            this.posts["race"].list.push(res.data[i]);
          }
        }
        this.isLoadMore = false;
        this.loadStatus = "more";
        this.postId += this.pageSize;
      }).catch((err)=>{
		   this.isLoadMore = false;
		   this.loadStatus = "nomore";
		  console.log(err);
	  });
    },
    changeType(index) {
      let type = ["talk", "study", "team", "race"];
      this.activeType = type[index];
    },
    //点赞
    likeIt(postId) {
      setLike(postId).catch(err=>{
		  console.log(err)
	  });
    },
    //取消点赞
    unlikeIt(postId) {
      setUnLike(postId).catch(err=>{
		  console.log(err)
	  });;
    },
  },
  onReachBottom() {
    //上拉触底函数
    if (!this.isLoadMore) {
      //此处判断，上锁，防止重复请求
      this.isLoadMore = true;
      this.getFloor(this.postId, this.pageSize);
    }
    this.isLoadMore = false;
  },
};
</script>

<style scoped>
.main {
  padding: 0 10px;
}
</style>
