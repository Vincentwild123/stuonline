<template>
  <view class="help_page">
    <view class="bgimg_box">
      <image
        class="bgimg"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic.52by.com%2Fyue%2Farticle%2F156870133606344473524.jpeg%3Fsize%3D533%2C399&refer=http%3A%2F%2Fstatic.52by.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633401200&t=b938443c76d476c16189b1c8d6632c17"
      ></image>
    </view>
    <view class="questions">
      <view class="question_title">📢常见问题</view>
      <template v-for="question in QA">
        <view class="question_box">
          <view class="question">🆘 : {{ question.Q }}</view>
          <view class="answer">🆗 : {{ question.A }}</view>
          <image
            class="tag"
            v-if="!!question.tag"
            :src="question.tag"
          >
          </image>
        </view>
      </template>
    </view>
  </view>
</template>
<script>
import { QA } from "./config.js";
export default {
  data() {
    return {
      QA,
    };
  },
};
</script>
<style>
.help_page{
    border-top:50rpx black solid;
}
.bgimg_box {
  padding: 20rpx;
  box-sizing: border-box;
  text-align: center;
}

.bgimg {
  max-width: 90%;
  max-height: 90%;
}
.question_title {
  font-size: 30rpx;
  font-weight: bold;
  padding: 0 10rpx;
}
.question_box {
  position: relative;
  box-sizing: border-box;
  border: #eee 2rpx solid;
  padding: 10rpx 15rpx;
  box-shadow: 6rpx 6rpx 20rpx gray;
  margin: 30rpx 20rpx;
  font-size: 34rpx;
  overflow: hidden;
}
.question,
.answer {
  margin: 10rpx 0;
}
.tag {
  position: absolute;
  top: -20rpx;
  right: -40rpx;
  max-width: 180rpx;
  max-height: 120rpx;
  transform:rotate(45deg);
}
.question {
  color: #e60000;
  font-weight: bold;
}
.answer {
  color: black;
}
</style>
