<!-- 任务大厅  -->
<template>
  <view class="taskHall">
    <!--头部导航栏开始-->
    <navigator-bar>
      <view slot="left">
        <navigator url="../teahouse" open-type="switchTab"
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
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
      :up="upOption"
      @emptyclick="emptyClick"
    >
      <!--搜索栏开始-->
      <search-bar><text slot="text">搜索任务</text></search-bar>
      <!--搜索栏结束-->
      <!--发布导航栏开始-->
      <view class="post_task" @click="createAssignment">
        <view class="post_icon">
          <image
            src="../../../UI/postTask.png"
            mode="heightFix"
            style="height: 60rpx;vertical-align:middle;"
          />
        </view>
        <view class="post_text">发布任务</view>
        <view class="next_icon">
          <image
            src="../../../UI/rightBack.png"
            mode="heightFix"
            style="height: 28rpx;vertical-align:middle;"
          ></image>
        </view>
      </view>
      <!--发布导航栏结束-->
      <!-- 楼层数据开始-->
      <task-floor
        v-for="(item, index) in mission"
        :list="item"
        @handleMission="handleMission"
      ></task-floor>
      <!--楼层数据结束-->
      <!--通知栏开始-->
      <!--通知栏结束-->
    </mescroll-body>
  </view>
</template>

<script>
import SearchBar from "../components/content/SearchBar.vue";
import NavigatorBar from "../components/content/NavigatorBar.vue";
import TaskFloor from "./childComp/taskFloor.vue";
import MescrollMixin from "../components/content/mescroll-uni/mescroll-mixins";
import MescrollBody from "../components/content/mescroll-uni/mescroll-body.vue"; // 非uni_modules版本
import { getMissionList, getLastMissionId, acceptMission } from "../service.js";
export default {
  name: "TaskHall",
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
      mission: [], //人物的列表
      lastMissionId: 0, //数据库中最后议一条任务的id
    };
  },
  components: {
    SearchBar,
    NavigatorBar,
    TaskFloor,
    MescrollBody,
  },
  methods: {
	  //创建任务
	  createAssignment(){
		  uni.navigateTo({
		  	url:"createAssignment"
		  })
	  },
    //取消任务或者接受任务
    handleMission(MisData, executed) {
      if (executed) {
        //发送请求取消任务
        return;
      } else {
        //接受任务
        acceptMission(MisData).then(
          (res) => {
            for (const item of this.mission) {
              if (item.mission.missionId === MisData) {
                item.executed = true;
                break;
              }
            }
            uni.showToast({
              title: "任务接受成功！",
              duration: 2000,
              icon: "none",
            });
          },
          (err) => {
            uni.showToast({
              title: "任务接受失败！",
              duration: 2000,
              icon: "none",
            });
          }
        );
      }
    },
    /*下拉刷新的回调 */
    downCallback() {
      //查询最后的任务的ID
      getLastMissionId()
        .then((res) => {
          this.lastMissionId = res.data.data+1;
          //手动制空数据
          this.mission = [];
          // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
          this.mescroll.resetUpScroll();
        })
        .catch((err) => {
          //  联网失败, 结束加载
          this.mescroll.endErr();
        });
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      //联网加载数据
      getMissionList(this.lastMissionId, page.size)
        .then((res) => {
          let curPageData = res.data.data;
          //必传参数(当前页的数据个数)
          this.mescroll.endSuccess(curPageData.length);
          this.lastMissionId =
            curPageData[curPageData.length - 1].mission.missionId;
          //设置列表数据
          this.mission.push(...curPageData);
        })
        .catch((err) => {
          //  联网失败, 结束加载
          this.mescroll.endErr();
        });
    },
  },
};
</script>
<style scoped>
.taskHall {
  padding: 0 10px;
  margin-top: 6vh;
}
/* 发布任务条开始 */
.post_task {
  display: flex;
  align-items: center;
  height: 100rpx;
  justify-content: space-between;
}
.post_icon{
}
.post_text {
  font-size: 24rpx;
  font-weight: 600;
  margin-left: -470rpx;
}
.next_icon {
}
/* 发布任务条结束 */
</style>