<!-- 帖子详情 -->
<template>
  <view class="post_detail">
    <!--头部导航栏开始-->
    <navigator-bar class="navi_bar">
      <view slot="left">
        <navigator url="/src/pages/teahouse/teahouse" open-type="switchTab"
          ><image
            src="../../../UI/backButton.png"
            mode="widthFix"
            style="width: 10px; vertical-align: middle; display: inline-block"
          ></image
          ><text style="padding-left: 4px">茶馆</text></navigator
        >
      </view>
      <view slot="center"> 帖子详情 </view>
    </navigator-bar>
    <!--头部导航栏结束-->
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
      :up="upOption"
      @emptyclick="emptyClick"
    >
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
        :key="item.comId"
      ></Comment-floor>
      <!-- 评论结束 -->
    </mescroll-body>
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
import MescrollMixin from "../components/content/mescroll-uni/mescroll-mixins";
import MescrollBody from "../components/content/mescroll-uni/mescroll-body.vue"; // 非uni_modules版本
import { getPostComment, setLike, setUnLike } from "../service.js";
import "../../../utils/dateFormat.js";
export default {
  name: "postDetail",
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        page: {
          size: 10, // 每页数据的数量,默认10
        },
        noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
        empty: {
          use: true,
          tip: "暂无相关数据",
          btnText: "抢沙发",
        },
      },
      postMes: {}, //原帖子的详细信息
      FirstComment: {
        comId: 0, //当前页最后一条评论的id，若为0则是获取最新的
        FirstList: [],
      },
    };
  },
  components: {
    IndexFloor,
    NavigatorBar,
    CommentFloor,
    PostBar,
    MescrollBody,
  },
  methods: {
    //点击弹出输入框
    createComment() {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open("bottom");
      //通过事件总线发布一级评论
      // this.$nextTick(() => {
      //   this.$bus.$emit("replyPost", this.postMes);
      // });
      //通过全局状态发布一级评论
      this.$nextTick(() => {
        this.$store.commit("postBar/setPostMes", this.postMes);
        this.$store.commit("postBar/setIsFirstCommment", true);
        this.$store.commit("postBar/setIsFocus", true);
      });
    },
    //跳转到评论的细节展示
    getCommentDetail(data) {
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
    //回复评论参数一级评论
    replyComment(data) {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open("bottom");
      let param = {
        commentMes: data,
        postId: this.postMes.postSimple.postId,
      };
      // //通过事件总线发布二级评论
      // this.$nextTick(() => {
      //   this.$bus.$emit("replyComment", param);
      // });
      //通过全局状态发布二级评论
      this.$nextTick(() => {
        this.$store.commit("postBar/setComMes", param);
        this.$store.commit("postBar/setIsFirstCommment", false);
        this.$store.commit("postBar/setIsFocus", true);
      });
    },
    /*下拉刷新的回调 */
    downCallback() {
      this.FirstComment.comId = 0;
      //手动制空数据
      this.FirstComment.FirstList = [];
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
      this.mescroll.resetUpScroll();
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      //联网加载数据
      getPostComment(
        this.postMes.postSimple.postId,
        this.FirstComment.comId,
        page.size
      )
        .then((res) => {
          let curPageData = res.data;
          //必传参数(当前页的数据个数)
          this.mescroll.endSuccess(curPageData.length);
          this.FirstComment.comId = curPageData[curPageData.length - 1].comId;
          //设置列表数据
          this.FirstComment.FirstList.push(...curPageData);
        })
        .catch((err) => {
          //  联网失败, 结束加载
          this.mescroll.endErr();
        });
    },
    //点击空布局按钮的回调
    emptyClick() {
      console.log("点你妈？");
      uni.showToast({
        title: "点尼玛？",
        icon: "none",
      });
    },
  },
  //获取参数
  onLoad(option) {
    this.postMes = JSON.parse(option.postMes);
  },
  mounted() {
    //监听是否要关闭输入弹窗以及更新一级评论
    this.$bus.$on("reflashFirstComment", (data) => {
      // console.log(data)
      this.upOption.empty.use = false;
      this.$refs.popup.close();
      this.FirstComment.FirstList.unshift({
        comId: data.comId,
        comText: data.comText,
        comTime: new Date(),
        //这两个等全局登陆状态做好再更新
        userSimple: this.$store.state.user.userData,
        userBadges: this.$store.state.user.userData.badgeUrls,
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
};
</script>

<style scoped>
.post_detail {
  padding: 0 10px;
  margin-top: 6vh;
  background-color: #fff;
  z-index: 999;
}
</style>
