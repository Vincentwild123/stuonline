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
      <index-cate @changeType="changeType"></index-cate>
      <!-- 导航 结束 -->
      <!--楼层开始-->
      <index-floor
        v-for="(item, index) in posts[activeType].list"
        :list="item"
        @likeIt="likeIt"
        @unlikeIt="unlikeIt"
        @click.native="getPostDetail(item)"
        @createComment="createComment"
      ></index-floor>
      <view>
        <load-more :loadStatus="loadStatus"></load-more>
      </view>
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
import IndexFloor from "./components/IndexFloor.vue";
import IndexCate from "./components/IndexCate.vue";

import NoticeBar from "./components/content/NoticeBar.vue";
import LoadMore from "./components/content/LoadMore.vue";
import SearchBar from "./components/content/SearchBar.vue";

import { getModulePostList, setLike, setUnLike } from "./service.js";
export default {
  name: "teahouse",
  data() {
    return {
      posts: {
        talk: {
          list: [],
          postId: 0,
        },
        study: {
          list: [],
          postId: 0,
        },
        team: {
          list: [],
          postId: 0,
        },
        race: {
          list: [],
          postId: 0,
        },
      },
      activeType: "talk",
      postModule: 0,
      pageSize: 10,
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
    SearchBar,
    PostBar,
  },
  methods: {
    //点击弹出输入框
    createComment(data) {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open("bottom");
      //通过事件总线发布一级评论
      this.$nextTick(() => {
        this.$bus.$emit("replyPost", data);
      });
    },
    //获取各个模块的数据
    getModulePostList(postModule, postId, limit) {
      return getModulePostList(postModule, postId, limit)
        .then((res) => {
          this.isLoadMore = true;
          this.loadStatus = "loading";
          console.log(res);
          if (postModule == 0) {
            this.posts["talk"].list.push(...res.data);
          } else if (postModule == 1) {
            this.posts["study"].list.push(...res.data);
          } else if (postModule == 2) {
            this.posts["team"].list.push(...res.data);
          } else {
            this.posts["race"].list.push(...res.data);
          }
          this.isLoadMore = false;
          this.loadStatus = "more";
          this.posts[this.activeType].postId =
            res.data[res.data.length - 1].postSimple.postId; //保存当前页最后一条评论的id
          return Promise.resolve(1);
        })
        .catch((err) => {
          this.isLoadMore = false;
          this.loadStatus = "nomore";
          console.log(err, "teahouse");
          return Promise.reject(1);
        });
    },
    //修改当前激活模块
    changeType(index) {
      let type = ["talk", "study", "team", "race"];
      this.activeType = type[index];
      this.postModule = index;
    },
    //点赞
    likeIt(postId) {
      setLike(postId).catch((err) => {
        console.log(err);
      });
    },
    //取消点赞
    unlikeIt(postId) {
      setUnLike(postId).catch((err) => {
        console.log(err);
      });
    },
    //跳转到帖子详情页面
    getPostDetail(postMes) {
      uni.navigateTo({
        url:
          "./subPage/postDetail?postMes=" + JSON.stringify(postMes),
      });
    },
  },
  mounted() {
    //监听是否要关闭输入弹窗
    this.$bus.$on("reflashFirstComment", (data) => {
      this.$refs.popup.close();
    }),
      this.$bus.$on("sycnlike", (data) => {
        for (const item of this.posts[this.activeType].list) {
          if (item.postSimple.postId === data) {
            item.like = !item.like;
            break;
          }
        }
      });
    //页面一但挂在就要初始话加载一定的数据量
    this.getModulePostList(
      // this.postModule,
      // this.posts[this.activeType].postId,
      // this.pageSize
      0,
      0,
      10
    );
    this.getModulePostList(1, 0, 10);
    this.getModulePostList(2, 0, 10);
    this.getModulePostList(3, 0, 10);
  },
  beforeDestroy() {
    this.$bus.$off("sycnlike");
    this.$bus.$off("reflashFirstComment");
  },
  //上拉触底函数
  onReachBottom() {
    if (!this.isLoadMore) {
      //此处判断，上锁，防止重复请求
      this.isLoadMore = true;
      this.getModulePostList(
        this.postModule,
        this.posts[this.activeType].postId,
        this.pageSize
      ).catch((err) => {
        console.log("没有更多数据了");
      });
      // this.getFloor(this.postId, this.pageSize);
    }
    this.isLoadMore = false;
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.posts[this.activeType].list = [];
    this.posts[this.activeType].postId = 0;
    console.log("下拉刷新");
    this.loadStatus = "more";
    this.getModulePostList(this.postModule, 0, 10).then(
      (res) => {
        uni.stopPullDownRefresh(); //停止当前页面下拉刷新
        uni.showToast({ title: "刷新成功", icon: "none" });
      },
      (err) => {
        uni.stopPullDownRefresh(); //停止当前页面下拉刷新
        uni.showToast({ title: "出了点小状况", icon: "none" });
      }
    );
  },
};
</script>

<style scoped>
.main {
  padding: 0 10px;
}
.scrollY {
  margin-top: 6vh;
  height: 94vh;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>
