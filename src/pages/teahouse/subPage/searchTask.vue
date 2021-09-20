<!-- 搜索帖子 -->
<template>
  <view class="ser_task">
    <!--头部导航栏开始-->
    <navigator-bar>
      <view slot="left">
        <navigator url="./taskHall"
          ><image
            src="../../../UI/backButton.png"
            mode="widthFix"
            style="width: 10px; vertical-align: middle; display: inline-block"
          ></image
          ><text style="padding-left: 4px">任务大厅</text></navigator
        >
      </view>
      <view slot="center"> 搜索帖子 </view>
    </navigator-bar>
    <!--头部导航栏结束-->
    <!-- 搜索栏开始 -->
    <view class="ser_bar">
      <input
        type="number"
        class="ser_text"
        :placeholder="placeholder"
        v-model="content"
        :focus="isFocus"
      />
      <view class="ser_img">
        <image
          src="../../../UI/searchIcon.png"
          mode="heightFix"
          v-show="!content"
        />
        <image
          src="../../../UI/searchIconActive.png"
          mode="heightFix"
          v-show="content"
          @click="searchMission"
        />
      </view>
    </view>
    <!-- <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
      :up="upOption"
      @emptyclick="emptyClick"
      :down="downOption"
    > -->
    <!-- 搜索栏结束 -->
    <!-- 选择搜索类型开始 -->
    <view class="ser_type">
      <view class="type_title"> 搜索类型选择 </view>
      <view class="type_content">
        <view
          class="type_item"
          :class="{ active: index === currenIndex }"
          v-for="(item, index) in searchTypes"
          @click="changeType(index)"
          >{{ item }}</view
        >
      </view>
    </view>
    <!-- 选择搜索类型结束 -->
    <!-- 搜索到的数据开始 -->
    <view class="post_floor">
      <task-floor
        v-for="(item, index) in mission"
        :list="item"
        @handleMission="handleMission"
      ></task-floor>
    </view>
    <!-- 搜索到的数据结束 -->
    <!-- </mescroll-body> -->
  </view>
</template>

<script>
// import MescrollMixin from "../components/content/mescroll-uni/mescroll-mixins";
// import MescrollBody from "../components/content/mescroll-uni/mescroll-body.vue"; // 非uni_modules版本
import NavigatorBar from "../components/content/NavigatorBar.vue";
import TaskFloor from "./childComp/taskFloor.vue";
import {
  getMissionByMisID,
  getMissionByUserId,
  acceptMission,
} from "../service.js";
export default {
  name: "SearchTask",
  //   mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      searchTypes: ["按任务ID搜索", "按发布者ID搜索"],
      currenIndex: 0, //发布方式默认选择0
      placeholder: "按任务ID搜索...",
      isFocus: false,
      content: "", //输入框内容
      mission: [], //任务的列表
      //   lastMissionId: 0, //数据库中最后议一条任务的id
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      //   upOption: {
      //     page: {
      //       size: 10, // 每页数据的数量,默认10
      //     },
      //     noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
      //     empty: {
      //       use: true,
      //       tip: "暂无相关数据",
      //       btnText: "马上搜索看看",
      //     },
      //     auto: true,
      //   },
      //   downOption: {
      //     use: false,
      //   },
      //   firstLoad: true, //初次加载
    };
  },
  components: {
    NavigatorBar,
    TaskFloor,
  },
  methods: {
    //更改搜索方式
    changeType(index) {
      this.currenIndex = index;
      this.placeholder = this.searchTypes[index] + "...";
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    // upCallback(page) {
    //   if (this.firstLoad) {
    //     this.mescroll.endSuccess(0);
    //     this.firstLoad = false;
    //     return;
    //   }
    //   //联网加载数据
    //   getPostByTag(this.content, this.posts.postId, page.size)
    //     .then((res) => {
    //       let curPageData = res.data;
    //       //必传参数(当前页的数据个数, 是否有下一页true/false)
    //       this.mescroll.endSuccess(curPageData.length);
    //       this.posts.postId =
    //         curPageData[curPageData.length - 1].postSimple.postId;
    //       //设置列表数据
    //       this.posts.list.push(...curPageData);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       //  联网失败, 结束加载
    //       this.mescroll.endErr();
    //     });
    // },
    // //点击空布局按钮的回调
    // emptyClick() {
    //   this.isFocus = true;
    // },
    //搜索任务
    searchMission() {
      this.mission = [];
      if (this.currenIndex === 0) {
        //按照按任务ID搜索
        getMissionByMisID(this.content)
          .then((res) => {
            if (res.data.status === 473) {
              uni.showToast({
                title: "任务数据不存在",
                icon: "none",
              });
              return;
            }
            let item = res.data.data;
            this.mission =[{
                mission: item,
                complexUser: item.complexUser,
                executed: item.executed,
                pusher: item.pusher,
            }];
            console.log(res)
          })
          .catch((err) => {
            uni.showToast({
              title: "搜索出错",
              icon: "none",
            });
          });
      } else {
        //按发布者ID搜索
        getMissionByUserId(this.content)
          .then((res) => {
            if (res.data.status === 473) {
              uni.showToast({
                title: "任务数据不存在",
                icon: "none",
              });
              return;
            }
            this.mission = res.data.data.map((item) => {
              return {
                mission: item,
                complexUser: item.complexUser,
                executed: item.executed,
                pusher: item.pusher,
              };
            });
          })
          .catch((err) => {
            uni.showToast({
              title: "搜索出错",
              icon: "none",
            });
          });
      }
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
  },
  mounted() {},
};
</script>
<style scoped>
.active {
  background-color: #f3912f;
}
.ser_task {
  padding: 0 10px;
  padding-top: 4vh;
}
.ser_bar {
  display: flex;
  height: 50rpx;
  border-radius: 50rpx;
  background-color: #efefef;
  align-content: center;
}
.ser_text {
  flex: 8;
  padding-left: 40rpx;
  height: 50rpx;
  line-height: 50rpx;
  font-size: 25rpx;
}
.ser_img {
  text-align: right;
  margin-right: 25rpx;
  flex: 1;
}
.ser_img image {
  height: 35rpx;
  vertical-align: middle;
}
.ser_type {
}
.type_title {
  color: #3cba1f;
  font-size: 20rpx;
  margin: 20rpx 0;
  font-weight: 600;
}
.type_content {
  height: 61rpx;
  line-height: 61rpx;
  display: flex;
  flex: 3;
  justify-content: space-between;
  margin-bottom: 40rpx;
}
.type_item {
  padding: 0 30rpx;
  height: 61rpx;
  border-radius: 61rpx;
  border: 1px solid #829fea;
  color: #676767;
  font-size: 24rpx;
  font-weight: 600;
}
</style>