<!-- 评论组件 -->
<template>
  <view class="comment">
    <!-- 一级评论及其个人信息的展示开始 -->
    <view class="user_detail">
      <view class="user_header">
        <image :src="FirstComment.userSimple.userHead"></image>
      </view>
      <view class="comment_content">
        <view class="user_name">
          {{ FirstComment.userSimple.userName }}
        </view>
        <view class="comment_text">
          {{ FirstComment.comText }}
        </view>
        <view class="crea_time">
          {{ getTime }}
        </view>
      </view>
      <view class="user_label" v-for="(item, index) in FirstComment.userBadges">
        <image :src="item" mode="widthFix"></image>
      </view>
    </view>
    <!-- 一级评论及其个人信息的展示结束 -->
    <!-- 二级评论开始 -->
    <view class="sec_comment">
      <view v-for="(item, index) in secondComment">
        <view class="someone_reply" v-if="false">
          <text class="replier_name">{{ item.userSimple.userName }}</text
          >回复<text class="replier_name">臭臭</text
          ><text class="reply_content">:这么凶的吗???</text>
        </view>
        <view class="homeowner_comment" v-else>
          <text class="replier_name">{{ item.userSimple.userName }}:</text
          ><text class="reply_content">{{ item.comText }}</text>
        </view>
      </view>
      <view
        class="comment_size"
        @click="getCommentDetail"
        v-show="isShowMoreComment"
      >
        查看更多回复>
      </view>
    </view>
    <!-- 二级评论结束 -->
  </view>
</template>
<script>
import { getPostSecondComment } from "../service.js";
export default {
  name: "commentFloor",
  data() {
    return {
      secondComment: [],
    };
  },
  methods: {
    getCommentDetail() {
      let data = {
        postId: this.postId,
        comSecond: this.FirstComment.comId,
        FirstComment: this.FirstComment,
      };
      //获取所有的二级评论
      this.$emit("getCommentDetail", data);
    },
    getPostSecondComment(postId, comSecond, comId, limit) {
      getPostSecondComment(postId, comSecond, comId, limit).then(
        (res) => {
          this.secondComment.push(...res.data);
        },
        (res) => {
          console.log(res);
        }
      );
    },
  },
  props: ["FirstComment", "postId"],
  components: {},
  computed: {
    //格式化时间
    getTime() {
      let date = new Date(this.FirstComment.comTime);
      return date.format("MM-dd hh-mm");
    },
    //是否展示共几条回复（大于2条才有这个）
    isShowMoreComment() {
      return this.secondComment.length > 2;
    },
  },
  mounted() {
    //初次加载获取一定的评论数
    this.getPostSecondComment(this.postId, this.FirstComment.comId, 0, 5);
    //监听是否要刷新二级评论
    this.$bus.$on("reflashSecondComment", (data) => {
      if (this.FirstComment.comId === data.comSecond) {
		//这里也是等登陆状态好了之后更改
        this.secondComment.push({
          comId: 5,
          comTime: "2021-02-25T11:12:33",
          comText: data.comText,
          userSimple: {
            userId: 2,
            userName: "Joseph",
            userHead:
              "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/f65856b8-91f0-47f5-b082-dac194808eff.jpg",
            userLevel: 0,
          },
          userBadges: [],
        });
      }
    });
  },
};
</script>
<style scoped>
.comment {
  border-bottom: 8rpx solid #fff7ec;
}
/* 一级评论及其个人信息的展示开始 */
.user_detail {
  margin-top: 20rpx;
  display: flex;
}
.user_header {
  margin-left: 40rpx;
}
.user_header image {
  width: 94rpx;
  height: 94rpx;
  border-radius: 94rpx;
  vertical-align: middle;
}
.comment_content {
  margin-top: 16rpx;
  margin-left: 24rpx;
}
.user_name {
  font-size: 12px;
  color: #676767;
  font-weight: bold;
}
.comment_text {
  width: 440rpx;
  font-size: 12px;
  color: #3b3b3b;
  font-weight: bold;
  margin: 20rpx 0 36rpx 0;
}
.crea_time {
  color: #ada7a7;
  font-size: 16rpx;
  margin-bottom: 12rpx;
}
.user_label {
  margin-top: 16rpx;
  margin-left: 30rpx;
}
.user_label image {
  width: 59rpx;
  height: 59rpx;
}

/* 一级评论及其个人信息的展示结束 */
/* 二级评论开始 */
.sec_comment {
  background-color: #f7f9fb;
  width: 520rpx;
  margin-left: 158rpx;
  margin-bottom: 10rpx;
}
.someone_reply {
  padding: 10rpx;
  font-size: 10px;
  color: #868686;
}
.replier_name {
  font-size: 11px;
  color: #f4912f;
}
.homeowner_comment {
  padding: 10rpx;
  font-size: 10px;
  color: #868686;
}
.reply_content {
}
.comment_size {
  padding-left: 10rpx;
  font-size: 11px;
  color: #f4912f;
}
/* 二级评论结束 */
</style>