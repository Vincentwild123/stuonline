<template>
  <!-- 楼层 开始 -->
  <view class="index_floor">
    <view class="floor_item">
      <!--个人信息-->
      <view class="floor_person">
        <view class="person_detial">
          <view class="admin_pic">
            <image src="../../../../UI/touxiang.png" mode="widthFix"></image>
          </view>
          <view class="admin_detial">
            <view class="admin_name">Care</view>
            <view class="admin_time">6分钟前</view>
          </view>
        </view>
        <view class="grade">
          <image src="../../../../UI/grade.png" mode="widthFix"></image>
        </view>
        <view class="accept">
          <image src="../../../../UI/accept.png" mode=""></image>
        </view>
      </view>
      <view class="floor_ques"> 什么时候出考试安排？ </view>
      <view class="acceptPart">
        <view class="acceptNum">
          <image src="../../../../UI/touxiang.png" mode="widthFix"></image>
        </view>
        <view class="acceptmesg">3人接收任务</view>
      </view>
      <view class="floor_pic"> </view>
     
      </view>
    </view>
  </view>
  <!-- 楼层 结束 -->
</template>

<script>
export default {
  name: "TaskFloor",
  data() {
    return {};
  },
};
</script>
<style scoped>
.index_floor {
}
.floor_person {
}
.floor_item {
  border-bottom: 10px solid #fff0d9;
  padding-bottom: 10px;
}
.person_detial {
  float: left;
  display: flex;
  padding: 10px 0;
  align-items: center;
}
.grade {
  float: left;
  padding: 10px 0;
}
.floor_person:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.grade image {
  width: 29px;
  height: 29px;
}
.accept {
  float: right;
  padding: 10px 0;
}
.accept image {
  height: 25px;
  width: 77px;
}
.admin_pic {
  flex: 1;
}
.admin_pic image {
  width: 47px;
  height: 47px;
}
.admin_detial {
  flex: 1;
  padding: 0 8px;
}
.admin_name {
  font-size: 12px;
  color: black;
}
.admin_time {
  font-size: 12px;
  color: darkgray;
}
.floor_ques {
  font-size: 12px;
  font-weight: 900;
  padding-bottom: 8px;
}
.acceptPart{
	font-size: 9px;
    display: flex;
}
.acceptNum{
    flex: 1;
}
.acceptmesg{
	padding-right:5px ;
    text-align: right;
    flex: 1;
}
.acceptNum image {
  height: 25px;
  width: 25px;
}
.floor_pic {
}

</style>
