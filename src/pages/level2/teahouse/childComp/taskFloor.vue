<template>
  <!-- 楼层 开始 -->
  <view class="index_floor">
    <view class="floor_item">
      <!--个人信息-->
      <view class="floor_person">
        <view class="person_detial">
          <view class="admin_pic">
            <img v-bind:src="list.userSimple.userHead" mode="widthFix"></img>
          </view>
          <view class="admin_detial">
            <view class="admin_name">{{list.userSimple.userName}}</view>
            <view class="admin_time">{{getTime}}</view>
          </view>
        </view>
        <view class="grade">
          <img v-for="(item,index) in list.userBadges" v-bind:src="item" mode="widthFix"></img>
        </view>
        <view class="accept">
          <image src="../../../../UI/accept.png" mode=""></image>
        </view>
      </view>
      <view class="floor_ques">{{list.postSimple.postText}}</view>
      <view class="floor_pic">
        <img v-for="(item,index) in list.postImages" :src="item" alt="" mode="widthFix">
      </view>
      <view class="acceptPart">
        <view class="acceptNum">
          <image src="../../../../UI/touxiang.png" mode="widthFix"></image>
        </view>
        <view class="acceptmesg">3人接收任务</view>
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
  props: {
    list: {
      type: Object,

      default() {
        return [];
      },
    },
  },
  computed: {
    getTime() {
      let postDate = this.list.postSimple.postDatetime;
      let nowDate = new Date();
      let date = Date.parse(nowDate) - Date.parse(postDate);
      let diffdate = new Date(date);
      if (diffdate.getMonth() > 0) {
        return "很久以前";
      } else if (diffdate.getDate() > 0) {
        return diffdate.getDate() + "天前";
      } else if (diffdate.getHours() > 0) {
        return diffdate.getHours() + "小时前";
      } else if (diffdate.getMinutes() > 0) {
        return diffdate.getMinutes() + "分钟前";
      } else {
        return "刚刚发布";
      }
    },
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
.admin_pic img {
  width: 47px;
  height: 47px;
  border-radius: 47px;
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
  width: 50px;
  font-size: 12px;
  color: darkgray;
}
.floor_ques {
  font-size: 12px;
  font-weight: 900;
  padding-bottom: 8px;
}
.acceptPart {
  font-size: 9px;
  display: flex;
}
.acceptNum {
  flex: 1;
}
.acceptmesg {
  padding-right: 5px;
  text-align: right;
  flex: 1;
}
.acceptNum image {
  height: 25px;
  width: 25px;
}
.floor_pic {

}
.floor_pic img{
  height: 80px;
  padding: 3px 5px;
}
</style>
