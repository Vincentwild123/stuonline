<!-- 评论详情 -->
<template>
  <view class="comment_detail">
    <scroll-view scroll-y="true" class="scrollY">
      <view class="main">
        <!--头部导航栏开始-->
        <navigator-bar>
          <view slot="right">
            <view @click="back"
              ><image
                src="../../../UI/backButton.png"
                mode="widthFix"
                style="
                  width: 10px;
                  vertical-align: middle;
                  display: inline-block;
                "
              ></image
              ><text style="padding-left: 4px">帖子详情</text></view
            >
          </view>
          <view slot="center"> 全部回复 </view>
        </navigator-bar>
        <!--头部导航栏结束-->
        <!-- 单个评论的展开展示 -->
        <Comment :FirstComment="FirstComment" />
        <view class="gap_line"></view>
        <!-- 单个评论的二级展开展示 -->
        <Comment
          class="item"
          v-for="(item, index) in SecondComment"
          :FirstComment="item"
        />
        <view>
          <load-more :loadStatus="loadStatus"></load-more>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import NavigatorBar from "../components/content/NavigatorBar.vue";
import Comment from "../components/Comment";
import LoadMore from "../components/content/LoadMore.vue";
import { getPostSecondComment } from "../service.js"
export default {
  name: "commentDetail",
  data() {
    return {
      postId: 1, //当前这个评论的Id
      comSecond: 1, //一级评论的Id
      pageSize: 10, //一次加载的数量
      comId: 0, //当前页最后一条评论的id,若要获取最新的就是传0
      loadStatus: "more", //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
      isLoadMore: false, //是否加载中
      FirstComment: {
        //一级评论
        comId: 2,
        comTime: "2021-02-25T09:03:10",
        comText: "comment testssssss",
        userSimple: {
          userId: 2,
          userName: "Joseph",
          userHead:
            "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/f65856b8-91f0-47f5-b082-dac194808eff.jpg",
          userLevel: 0,
        },
      },
      SecondComment: [],//二级评论
    };
  },

  components: {
    NavigatorBar,
    Comment,
    LoadMore,
  },
  methods: {
    //返回上一级目录
    back() {
      uni.navigateBack({ delta: 1 });
    },
    //获取二级评论
    getPostSecondComment(postId, comSecond, comId, limit) {
      return getPostSecondComment(postId, comSecond, comId, limit).then(
        (res) => {
          this.SecondComment.push(...res.data);
          this.comId=res.data[res.data.length-1].comId;
          return Promise.resolve(1);
        }).catch((err) => {
          this.isLoadMore = false;
          this.loadStatus = "nomore";
          return Promise.reject(1);
        });
    },
  },
  onLoad(option) {
    //获取页面跳转的参数
    const { postId, comSecond } = JSON.parse(option.param);
    this.postId = postId;
    this.comSecond = comSecond;
    this.FirstComment = JSON.parse(option.param).FirstComment;
    console.log(this.commentDetail);
  },
  mounted() {
    //初次挂载页面加载一定的数据量上来
    this.getPostSecondComment(
      this.postId,
      this.comSecond,
      0,
      this.pageSize
    );
  },
  //上拉触底函数
  onReachBottom() {
    if (!this.isLoadMore) {
      //此处判断，上锁，防止重复请求
      this.isLoadMore = true;
      this.getPostSecondComment(
        this.postId,
        this.comSecond,
        this.comId,
        this.pageSize
      ).catch((err) => {
        console.log(err);
      });
    }
    this.isLoadMore = false;
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.comId=0;
    this.SecondComment=[];
    console.log("下拉刷新");
    this.loadStatus = "more";
    this.getPostSecondComment(
      this.postId,
      this.comSecond,
      0,
      this.pageSize
    ).then(
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
.gap_line {
  background-color: #fff0d9;
  width: 100%;
  height: 16rpx;
}
.item {
  border-bottom: 4rpx #fff0d9 solid;
}
</style>