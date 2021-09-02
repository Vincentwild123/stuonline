<!-- 发布导航栏 -->
<template>
  <view class="post_bar">
    <view class="post_input">
      <textarea
        type="text"
        class="post_input_text"
        ref="inputContent"
        v-model="content"
        :placeholder="placeholder"
        :focus="isFocus"
      />
    </view>
    <view class="post_button" @click="submitReply"> 发布 </view>
  </view>
</template>

<script>
import { createComment } from "../service.js";
export default {
  name: "PostBar",
  data() {
    return {
      content: "",
      placeholder: "输入你的评论...", //输入提示框
      isFocus: false, //是否聚焦
      isFirstCommment: true, //默认是一级评论的回复
      postMes: {}, //一级评论所需要的信息
      commentMes: {}, //二级评论所需要的信息
    };
  },
  methods: {
    //点击发布按钮//创建一级评论或者二级评论
    submitReply() {
      if (this.isFirstCommment) {
        let data = {
          comText: this.content,
          comSourceId: this.postMes.userSimple.userId,
          comLv: 0,
        };
        //发布一级评论
        createComment(this.postMes.postSimple.postId, data).then(
          (res) => {
            uni.showToast({
              title: "回复成功",
              icon: "none",
            });
            this.$bus.$emit("reflashFirstComment", this.content);
          },
          (err) => {
            console.log("回复失败");
          }
        );
      } else {
        let data = {
          comText: this.content,
          comSourceId: this.commentMes.commentMes.userSimple.userId,
          comLv: 1,
          comSecond: this.commentMes.commentMes.comId,
        };
        //发布二级评论
        createComment(this.commentMes.postId, data).then(
          (res) => {
            uni.showToast({
              title: "回复成功",
              icon: "none",
            });
            this.$bus.$emit("reflashSecondComment", data);
          },
          (err) => {
            console.log("回复失败");
          }
        );
      }
    },
  },
  mounted() {
    //监听是否发布一级评论
    this.$bus.$on("replyPost", (data) => {
      this.isFirstCommment = true; //设置为一级评论
      this.isFocus = true;
      this.postMes = data;
    });
    //监听是否发布二级评论
    this.$bus.$on("replyComment", (data) => {
      this.isFirstCommment = false; //设置为二级评论
      this.isFocus = true;
      this.commentMes = data;
      this.placeholder=`请输入回复${data.commentMes.userSimple.userName}的评论`
    });
  },
  beforeDestroy() {
    this.$bus.$off("replyPost");
    this.$bus.$off("replyComment");
  },
};
</script>

<style scoped>
.post_bar {
  background-color: #ffffff;
  box-shadow: 0px -1px 10px 1px #eef3f2;
  height: 188rpx;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
}
.post_input {
  margin-left: 28rpx;
  height: 132rpx;
  width: 570rpx;
  background-color: #f7f9fb;
  margin-right: 20rpx;
  border-radius: 16rpx;
}
.post_input_text {
  height: 132rpx;
  width: 100%;
  margin-left: 20rpx;
}
.post_pic {
  margin: 0 20rpx;
}
.post_pic image {
  width: 64rpx;
}
.post_button {
  font-size: 9px;
  color: #f07272;
  width: 88rpx;
  height: 42rpx;
  border-radius: 46rpx;
  border: 1px solid #f4912f;
  text-align: center;
  line-height: 42rpx;
}
</style>
