<template>
  <!-- 楼层 开始 -->
  <view class="index_floor">
    <view class="floor_item">
      <!-- 个人信息 -->
      <view class="floor_person">
        <view class="person_detial">
          <view class="admin_pic">
            <img v-bind:src="list.complexUser.userHead" mode="widthFix"></img>
          </view>
          <view class="admin_detial">
            <view class="admin_name">{{list.complexUser.userName}}</view>
            <view class="admin_time">{{getTime}}</view>
          </view>
        </view>
        <view class="grade">
          <img v-for="(item,index) in list.complexUser.badgeUrls" v-bind:src="item" mode="widthFix"></img>
        </view>
        <view class="accept"@click="handleMission">
          <image src="../../../../UI/unaccept.png" mode="" v-if="list.executed"></image>
          <image src="../../../../UI/accept.png" mode="" v-else></image>
        </view>
      </view>
      <view class="floor_ques">{{list.mission.missionText}}</view>
      <view class="floor_pic">
        <img :src="list.mission.missionPicture1" alt="" mode="widthFix" @click="lookImg(list.mission.missionPicture1)"></img>
        <img :src="list.mission.missionPicture2" alt="" mode="widthFix" @click="lookImg(list.mission.missionPicture2)"></img>
        <img :src="list.mission.missionPicture3" alt="" mode="widthFix" @click="lookImg(list.mission.missionPicture3)"></img>
      </view>
      <view class="floor_file" v-if="list.mission.attachmentName">
       <view class="file_item">
       	<view class="file_id">附件1：</view>
       	<view class="file_pic">
       	  <image src="../../../../UI/fileType.png" mode="heightFix" />
       	</view>
       	<view class="file_name">
       	  {{list.mission.attachmentName}}
       	</view>
       </view>
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
    //格式化时间
    getTime() {
      let postDate = new Date(Date.parse(this.list.mission.createTime));
      let nowDate = new Date();
      let date = Date.parse(nowDate) - Date.parse(postDate);
      if (nowDate.getMonth() - postDate.getMonth() > 0) {
        return "很久以前";
      } else if (nowDate.getDate() - postDate.getDate() > 0) {
        return nowDate.getDate() - postDate.getDate() + "天前";
      } else if (nowDate.getHours() - postDate.getHours() > 0) {
        return nowDate.getHours() - postDate.getHours() + "小时前";
      } else if (nowDate.getHours() - postDate.getHours() > 0) {
        return nowDate.getHours() - postDate.getHours() + "分钟前";
      } else {
        return "刚刚发布";
      }
    },
  },
  methods: {
    //查看图片
    lookImg(val) {
      let postImages = [];
      if (this.list.mission.missionPicture1) {
        postImages.push(this.list.mission.missionPicture1);
      }
      if (this.list.mission.missionPicture2) {
        postImages.push(this.list.mission.missionPicture2);
      }
      if (this.list.mission.missionPicture3) {
        postImages.push(this.list.mission.missionPicture3);
      }
      const urls = postImages;
      const current = val;
      uni.previewImage({
        urls,
        current,
      });
    },
    //任务的接受与取消
    handleMission() {
      if (this.list.executed) {
        //取消接受任务
        console.log("取消不了哈哈哈");
        return;
      } else {
        //接受任务
        let _this = this;
        uni.showModal({
          content: "确定接受该任务吗？",
          success: function (res) {
            if (res.confirm) {
              _this.$emit(
                "handleMission",
                _this.list.mission.missionId,
                _this.list.executed
              );
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
      }
    },
  },
};
</script>
<style scoped>
.index_floor {
  background-color: #f7f9fb;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
}
.floor_person {
}
.floor_item {
  /* border-bottom: 10px solid #fff0d9; */
  padding-bottom: 10px;
  margin: 0 20rpx;
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
.floor_pic img {
  height: 80px;
  padding: 3px 5px;
}
.floor_file {
}
.file_item {
  display: flex;
}
.file_id {
  font-size: 18rpx;
  color: #b9b4b5;
}
.file_pic {
}
.file_pic image {
  height: 24rpx;
  vertical-align: top;
}
.file_name {
  font-size: 18rpx;
  color: #b9b4b5;
  text-decoration: underline;
}
</style>
