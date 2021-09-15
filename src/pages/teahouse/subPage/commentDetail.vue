<!-- 评论详情 -->
<template>
  <view class="comment_detail">
    <!--头部导航栏开始-->
    <navigator-bar>
      <view slot="right">
        <view @click="back"
          ><image
            src="../../../UI/backButton.png"
            mode="widthFix"
            style="width: 10px; vertical-align: middle; display: inline-block"
          ></image
          ><text style="padding-left: 4px">帖子详情</text></view
        >
      </view>
      <view slot="center"> 全部回复 </view>
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
      <!-- 单个评论的展开展示 -->
      <Comment :FirstComment="FirstComment" />
      <view class="gap_line"></view>
      <!-- 单个评论的二级展开展示 -->
      <Comment
        class="item"
        v-for="(item, index) in SecondComment"
        :FirstComment="item"
      />
    </mescroll-body>
  </view>
</template>

<script>
import NavigatorBar from "../components/content/NavigatorBar.vue";
import Comment from "../components/Comment";
import MescrollMixin from "../components/content/mescroll-uni/mescroll-mixins";
import MescrollBody from "../components/content/mescroll-uni/mescroll-body.vue"; // 非uni_modules版本
import { getPostSecondComment } from "../service.js";
export default {
  name: "commentDetail",
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
      postId: 1, //当前这个帖子的Id
      comSecond: 1, //一级评论的Id
      pageSize: 10, //一次加载的数量
      comId: 0, //当前页最后一条评论的id,若要获取最新的就是传0
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
      SecondComment: [], //二级评论
    };
  },

  components: {
    NavigatorBar,
    Comment,
    MescrollBody,
  },
  methods: {
    //返回上一级目录
    back() {
      uni.navigateBack({ delta: 1 });
    },
    /*下拉刷新的回调 */
    downCallback() {
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
      this.comId = 0;
      //手动制空数据
      this.SecondComment = [];
      this.mescroll.resetUpScroll();
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      //联网加载数据
      getPostSecondComment(this.postId, this.comSecond, this.comId, page.size)
        .then((res) => {
          let curPageData = res.data;
          //必传参数(当前页的数据个数)
          this.mescroll.endSuccess(curPageData.length);
          this.comId = curPageData[curPageData.length - 1].comId;
          //设置列表数据
          this.SecondComment.push(...curPageData);
        })
        .catch((err) => {
          //  联网失败, 结束加载
          this.mescroll.endErr();
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
};
</script>
<style scoped>
.comment_detail {
  margin-top: 6vh;
  padding: 0 10px;
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