<!-- 任务大厅  -->
<template>
  <scroll-view scroll-y="true" class="scrollY">
    <view class="main">
      <view class="taskHall">
        <!--头部导航栏开始-->
        <navigator-bar>
          <view slot="right">
            <navigator
              url="../teahouse"
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
          <view slot="center"> 任务大厅 </view>
          <view slot="left">
            <navigator url="../subPage/createAssignment"
              ><image
                src="../../../UI/postTask.png"
                mode="widthFix"
                style="
                  width: 72rpx;
                  vertical-align: middle;
                  display: inline-block;
                "
              ></image
            ></navigator>
          </view>
        </navigator-bar>
        <!--头部导航栏结束-->

        <!--搜索栏开始-->
        <search-bar><text slot="text">搜索任务</text></search-bar>
        <!--搜索栏结束-->
        <!--选项栏结束-->
        <!-- <cate @changeType="changeType"></cate> -->
        <!--选项栏结束-->
        <!-- 楼层数据开始-->
        <task-floor v-for="(item, index) in mission" :list="item"></task-floor>
        <view>
          <load-more :loadStatus="loadStatus"></load-more>
        </view>
        <!--楼层数据结束-->
        <!--通知栏开始-->
        <!--通知栏结束-->
      </view>
    </view>
  </scroll-view>
</template>

<script>
import SearchBar from "../components/content/SearchBar.vue";
import NavigatorBar from "../components/content/NavigatorBar.vue";
// import Cate from "../../../components/content/Cate.vue";
import TaskFloor from "./childComp/taskFloor.vue";
import LoadMore from "../components/content/LoadMore.vue";

import {
  getMissionList,
  getLastMissionId,
} from "../service.js";
export default {
  name: "TaskHall",
  data() {
    return {
      mission: [],
      pageSize: 5,//一次加载的数量
      loadStatus: "more", //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
      isLoadMore: false, //是否加载中
	  lastMissionId:20,//数据库中最后议一条任务的id
    };
  },
  components: {
    SearchBar,
    NavigatorBar,
    // Cate,
    TaskFloor,
    LoadMore,
  },
  methods: {
    getMissionList(lastMissionId, pageSize) {
      return getMissionList(lastMissionId, pageSize)
        .then((res) => {
          let { data } = res.data;
          this.isLoadMore = true;
          this.loadStatus = "loading";
          this.mission.push(...data);
		  console.log(data[data.length-1].mission.missionId)
		  this.lastMissionId = data[data.length-1].mission.missionId;
          this.isLoadMore = false;
          this.loadStatus = "more";
          return Promise.resolve(1);
        })
        .catch((err) => {
          this.isLoadMore = false;
          this.loadStatus = "nomore";
          console.log(err, "teahouse");
           return Promise.reject(1);
        });
    },
  },
  mounted() {
    //查询最后的任务的ID
    getLastMissionId().then(res=>{
		this.lastMissionId = res.data.data;
		return Promise.resolve(1);
    }).then(res=>{
		//页面一但挂在就要初始话加载一定的数据量
		this.getMissionList(this.lastMissionId, this.pageSize);
	}).catch(err=>{
		console.log("服务器崩了")
	})
  },
  onReachBottom() {
    //上拉触底函数
    if (!this.isLoadMore) {
      //此处判断，上锁，防止重复请求
      this.isLoadMore = true;
      this.getMissionList(this.lastMissionId, this.pageSize).catch(err=>{
		  uni.showToast({
		  	title:"试试下拉刷新数据吧"
		  })
	  });
      // this.getFloor(this.postId, this.pageSize);
    }
    this.isLoadMore = false;
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
	this.mission=[];
	getLastMissionId().then(res=>{
		this.lastMissionId = res.data.data;
		return Promise.resolve(1);
	}).then(success=>{
		this.getMissionList(this.lastMissionId, this.pageSize).then(
		  (res) => {
		    uni.stopPullDownRefresh(); //停止当前页面下拉刷新
		    uni.showToast({ title: "刷新成功", icon: "none" });
		  },
		  (err) => {
		    uni.stopPullDownRefresh(); //停止当前页面下拉刷新
		    uni.showToast({ title: "出了点小状况", icon: "none" });
		  }
		);
	})
  },
};
</script>
<style scoped>
.main {
  padding: 0 10px;
}
.scrollY {
  margin-top: 6vh;
  height: 100%;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>