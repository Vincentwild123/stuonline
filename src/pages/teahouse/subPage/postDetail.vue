<!-- 帖子详情 -->
<template>
  <view class="post_detail">
    <scroll-view scroll-y="true" class="scrollY">
      <view class="main">
        <!--头部导航栏开始-->
        <navigator-bar>
          <view slot="right">
            <navigator
              url="/src/pages/teahouse/teahouse"
              open-type="switchTab"
              ><image
                src="../../../UI/backButton.png"
                mode="widthFix"
                style="
                  width: 10px;
                  vertical-align: middle;
                  display: inline-block;
                "
              ></image
              ><text style="padding-left: 4px">茶馆</text></navigator
            >
          </view>
          <view slot="center"> 帖子详情 </view>
        </navigator-bar>
        <!--头部导航栏结束-->
        <!-- 原帖子的展示开始 -->
        <index-floor
          :list="postMes"
          @createComment="createComment"
          @likeIt="likeIt"
          @unlikeIt="unlikeIt"
        ></index-floor>
        <!-- 原帖子的展示结束-->
        <!-- 评论开始 -->
        <Comment-floor
          v-for="(item, index) in FirstComment.FirstList"
          :FirstComment="item"
          :postId="postMes.postSimple.postId"
          @getCommentDetail="getCommentDetail"
          @click.native="replyComment(item)"
        ></Comment-floor>
        <view>
          <load-more :loadStatus="loadStatus"></load-more>
        </view>
        <!-- 评论结束 -->
      </view>
    </scroll-view>
    <!-- 点击评论后输入框弹出开始 -->
    <uni-popup ref="popup">
      <post-bar />
    </uni-popup>
    <!-- 点击评论后输入框弹出结束 -->
  </view>
</template>

<script>
import NavigatorBar from "../components/content/NavigatorBar.vue";
import IndexFloor from "../components/IndexFloor.vue";
import CommentFloor from "../components/CommentFloor.vue";
import PostBar from "../components/PostBar.vue";
import LoadMore from "../components/content/LoadMore.vue";
import {
  getPostComment,
  setLike,
  setUnLike,
} from "../service.js";
import "../../../utils/dateFormat.js"
export default {
  name: "postDetail",
  data() {
    return {
      postMes: {}, //原帖子的详细信息
      FirstComment: {
        comId: 0, //当前页最后一条评论的id，若为0则是获取最新的
        FirstList: [],
      },
      loadStatus: "more", //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
      isLoadMore: false, //是否加载中
      pageSize: 20, //一次加载多少评论
    };
  },
  methods: {
    //点击弹出输入框
    createComment() {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open("bottom");
      //通过事件总线发布一级评论
      this.$nextTick(() => {
        this.$bus.$emit("replyPost", this.postMes);
      });
    },
    //跳转到评论的细节展示
    getCommentDetail(data) {
      console.log(data);
      uni.navigateTo({
        url: "./commentDetail?param=" + JSON.stringify(data),
      });
    },
    //点赞
    likeIt(postId) {
      this.$bus.$emit("sycnlike", postId); //同步点赞
      setLike(postId).catch((err) => {
        console.log(err);
      });
    },
    //取消点赞
    unlikeIt(postId) {
      this.$bus.$emit("sycnlike", postId); //同步点赞
      setUnLike(postId).catch((err) => {
        console.log(err);
      });
    },
    //获取帖子的一级评论
    getPostComment(postId, comId, limit) {
      return getPostComment(postId, comId, limit)
        .then((res) => {
          console.log(res);
          this.FirstComment.FirstList.push(...res.data);
          this.FirstComment.comId = res.data[res.data.length - 1].comId;
          return Promise.resolve(1);
        })
        .catch((err) => {
          this.isLoadMore = false;
          this.loadStatus = "nomore";
          return Promise.reject(1);
        });
    },
    //回复评论参数一级评论
    replyComment(data) {
      console.log(data);
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open("bottom");
      let param={
          commentMes:data,
          postId:this.postMes.postSimple.postId
      }
      //通过事件总线发布二级评论
      this.$nextTick(() => {
        this.$bus.$emit("replyComment", param);
      });
    },
  },
  components: {
    IndexFloor,
    NavigatorBar,
    CommentFloor,
    PostBar,
    LoadMore,
  },
  //获取参数
  onLoad(option) {
    this.postMes = JSON.parse(option.postMes);
  },
  mounted() {
    //页面挂载就加载一定的一级评论出来
    this.getPostComment(this.postMes.postSimple.postId, 0, this.pageSize);
    //监听是否要关闭输入弹窗以及更新一级评论
    this.$bus.$on("reflashFirstComment", (data) => {
      this.$refs.popup.close();
      this.FirstComment.FirstList.unshift({
        comId: 666,
        comText: data,
        comTime: new Date(),
        //这两个等全局登陆状态做好再更新
        userSimple: {
          userId: 2,
          userName: "Joseph",
          userHead:
            "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/f65856b8-91f0-47f5-b082-dac194808eff.jpg",
          userLevel: 0,
        },
        userBadges: [],
      });
    });
    //监听是否要关闭输入弹窗以及更新二级评论
    this.$bus.$on("reflashSecondComment", (data) => {
      this.$refs.popup.close();
    });
  },
  //销毁事件
  beforeDestroy() {
    this.$bus.$off("reflashFirstComment");
    this.$bus.$off("reflashSecondComment");
  },
  //上拉触底函数
  onReachBottom() {
    if (!this.isLoadMore) {
      //此处判断，上锁，防止重复请求
      this.isLoadMore = true;
      this.getPostComment(
        this.postMes.postSimple.postId,
        this.FirstComment.comId,
        this.pageSize
      ).catch((err) => {
        console.log(err);
      });
    }
    this.isLoadMore = false;
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.FirstComment.FirstList = [];
    this.FirstComment.comId = 0;
    console.log("下拉刷新");
    this.loadStatus = "more";
    this.getPostComment(this.postMes.postSimple.postId, 0, this.pageSize).then(
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
