<!-- 任务大厅  -->
<template>
  <view class="taskHall">
    <!--头部导航栏开始-->
    <navigator-bar>
      <view slot="right">
        <navigator
          url="/src/pages/level1/teahouse/teahouse"
          open-type="switchTab"
          ><image
            src="../../../UI/backButton.png"
            mode="widthFix"
            style="width: 10px; vertical-align: middle; display: inline-block"
          ></image
          ><text style="padding-left: 4px">茶馆</text></navigator
        >
      </view>
      <view slot="center"> 任务大厅 </view>
    </navigator-bar>
    <!--头部导航栏结束-->

    <!--搜索栏开始-->
    <search-bar></search-bar>
    <!--搜索栏结束-->
    <!--选项栏结束-->
    <cate @changeType="changeType"></cate>
    <!--选项栏结束-->
    <!--楼层数据开始-->
    <task-floor
      v-for="(item, index) in posts[activeType].list"
      :list="item"
    ></task-floor>
	 <view>
      <load-more :loadStatus="loadStatus"></load-more>
    </view>
    <!--楼层数据结束-->
    <!--通知栏开始-->
    <!--通知栏结束-->
  </view>
</template>

<script>
import SearchBar from "../../../components/content/SearchBar.vue";
import NavigatorBar from "../../../components/content/NavigatorBar.vue";
import Cate from "../../../components/content/Cate.vue";
import TaskFloor from "./childComp/taskFloor.vue";
import LoadMore from "../../../components/content/LoadMore.vue";

import { getFloor } from "../../../axios/teahouse/teahouse.js";
export default {
  name: "TaskHall",
  data() {
    return {
      posts: {
        talk: {
          list: [],
        },
        study: {
          list: [],
        },
        team: {
          list: [],
        },
        race: {
          list: [],
        },
      },
      activeType: "talk",
      postId: 0,
      pageSize: 4,
      loadStatus: "more", //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
      isLoadMore: false, //是否加载中
      lastPostId: 999,
      firstLoad: true,
    };
  },
  components: {
	  SearchBar,
	  NavigatorBar,
	  Cate,
	  TaskFloor,
	  LoadMore

  },
  mounted() {
    this.getFloor(this.postId, this.pageSize);
  },
  methods: {
    getFloor(postId, pageSize) {
      getFloor(postId, pageSize).then((res) => {
        console.log(res);
        this.isLoadMore = true;
        this.loadStatus = "loading";
        if (this.firstLoad) {
          this.lastPostId = res.data[pageSize - 1].postSimple.postId;
        }
        if (
          this.lastPostId == res.data[res.data.length - 1].postSimple.postId &&
          !this.firstLoad
        ) {
          //判断当前的页码是不是已经是最后一页
          this.isLoadMore = false;
          this.loadStatus = "nomore";
          return;
        }
        this.firstLoad = false;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].postSimple.postModule == 0) {
            this.posts["talk"].list.push(res.data[i]);
          } else if (res.data[i].postSimple.postModule == 1) {
            this.posts["study"].list.push(res.data[i]);
          } else if (res.data[i].postSimple.postModule == 2) {
            this.posts["team"].list.push(res.data[i]);
          } else {
            this.posts["race"].list.push(res.data[i]);
          }
        }
        this.isLoadMore = false;
        this.loadStatus = "more";
        this.postId += this.pageSize;
      });
    },
    changeType(index) {
      let type = ["talk", "study", "team", "race"];
      this.activeType = type[index];
    }
  },
  onReachBottom() {
    //上拉触底函数
    if (!this.isLoadMore) {
      //此处判断，上锁，防止重复请求
      this.isLoadMore = true;
      this.getFloor(this.postId, this.pageSize);
    }
    this.isLoadMore = false;
  },
};
</script>
<style scoped>
.taskHall {
  padding: 0 10px;
}
</style>