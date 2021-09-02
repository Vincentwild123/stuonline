<template>
  <view class="contain flex-column" v-if="isLoad">
    <!-- 包括返回图标的页面顶部，固定不动的部分 -->
    <pageTop
      :managedTitleIndex="managedTitleIndex"
      :isLeader="isLeader"
      title="团队成员"
      :backTitle="teamInfo.teamName"
      class="top"
      eventName="showTeamMembersBack"
    ></pageTop>
    <!-- 顶部结束 -->

    <!-- 团队成员的滚动条 -->
    <view class="scroll">
      <scroll-view
        scroll-y
        class="list-scroll flex-column"
        :class="isManagedState"
      >
        <!-- 团队的队长 -->
        <view class="biaoti letallCenter"><text>队长</text></view>
        <member-item
          class=""
          :isManaged="isManaged"
          :isLeader="true"
          :isShow="true"
          :teamMemberInfo="teamInfo.leaderInfo"
        ></member-item>
        <!-- 队长结束 -->
        <!-- 团队的普通成员，多个，使用for -->
        <view class="biaoti letallCenter"><text>队员</text></view>
        <memberItem
          v-for="(item, index) in teamMembers"
          class="member-item"
          :isManaged="isManaged"
          :index="index"
          :isLeader="false"
          :teamMemberInfo="item"
        ></memberItem>
        <!-- 普通成员结束 -->
      </scroll-view>
    </view>
    <!-- 滚动条结束 -->

    <pageBottom v-if="isManaged"></pageBottom>
  </view>
</template>

<script>
import memberItem from "./teamCompos/memberItem.vue";
import pageTop from "./teamCompos/pageTop.vue";
import pageBottom from "./teamCompos/pageBottom.vue";
import axios from "@/src/axios/axios.interceptors.js";
import {
  getTeamMembers,
  getTeamInfoById,
  deleteMemberInTeam,
} from "../service.js"
export default {
  name: "teamItem",
  components: {
    memberItem,
    pageTop,
    pageBottom,
  },
  data() {
    return {
      managedTitleIndex: 0, //0表示"管理"，1表示"完成"
      isLeader: false, //是否是该队伍的队长，
      isManaged: false, //是否处于队长管理状态
      isManagedState: "state1", //队长管理状态以及非管理状态下的css类名：state1:处于非管理状态，state2:处于管理状态
      selectMembers: [], //在管理状态下的被选中的团队成员的id
      teamMembers: [], //除去队长的所有成员
      teamInfo: Object, //该团队的详情信息：teamId\leaderInfo等等
      teamId: Number,
      isLoad: false, //表示页面是否已经加载完成，完成才展示页面，如果为true，则表示加载完成
    };
  },
  methods: {
    /**
     * 把teamMembers数组中的队长清除
     */
    deleteLeaderInTeamMembers() {
      for (let i = 0; i < this.teamMembers.length; i++) {
        if (this.teamInfo.leaderInfo.userId == this.teamMembers[i].userId) {
          this.teamMembers.splice(i, 1);
          break;
        }
      }
    },

    /**
     * @param {Array} selectMembers 记录团队队员userId的地址
     * 删除被选中团队队员
     */
    async deleteMembers(selectMembers) {
      if (this.isLeader) {
        for (item in selectMembers) {
          deleteInSelectMembers(this.teamId, item); //删除相应团队里的成员
        }
        //更新团队成员数组teamMembers
        getTeamMembers(this.teamId)
          .then((res) => {
            this.teamMembers = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
        //清空被选中的成员数组
        this.emptySelectMembers(this.selectMembers);
      }
    },

    /**
     * @param {Array} selectMembers
     * 清空selectMember[],清空被选择的成员
     */
    emptySelectMembers(selectMembers) {
      const length = selectMembers.length;
      selectMembers.splice(0, length);
      if (!selectMembers) return true;
      else return false;
    },

    /**
     * @param {Object} index
     * 管理状态下将添加被选择的成员的userId加入“被选择”数组：selectMembers
     */
    addInSelectMembers(index) {
      this.selectMembers.push(this.members[index].userId);
      console.log(this.selectMembers);
    },

    /**
     * @param {Object} index
     * 管理状态下将被选择的成员的userId从“被选择”数组删除：selectMembers
     */
    deleteInSelectMembers(index) {
      for (let i = 0; i < this.selectMembers.length; i++) {
        if (this.members[index].userId === this.selectMembers[i]) {
          this.selectMembers.splice(i, 1);
          break;
        }
      }
      console.log(this.selectMembers);
    },

    /**
     * 页面初始化
     */
    async init() {
      //获取团队成员
      await getTeamMembers(this.teamId)
        .then((res) => {
          //赋值teamMembers, 将获取到的团队成员数组
          this.teamMembers = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });

      //获取团队信息
      getTeamInfoById(this.teamId).then((res) => {
        //赋值teamInfo, 将获取到的团队信息
        this.teamInfo = res.data.data;
        //将teamMembers[]里的成员的队长删除
        this.deleteLeaderInTeamMembers();
        this.isLoad = true;
      });
    },
  },
  created() {
    //监听顶部固定部分的返回图标
    uni.$on("showTeamMembersBack", () => {
      uni.navigateBack({
        delta: 1,
      });
    });

    //只需要队长，才需要监控这些事件
    if (this.isLeader) {
      //监听点击固定顶部的"管理"
      uni.$on("manageIsClicked", () => {
        console.log("进入管理模式");
        this.managedTitleIndex = 1;
        this.isManaged = true;
        this.isManagedState = "state2";
      });

      //监听点击固定顶部的"完成"
      uni.$on("finishIsClicked", () => {
        console.log("完成管理模式");
        this.managedTitleIndex = 0;
        this.isManaged = false;
        this.isManagedState = "state1";
        //将selectMembers[]清空
        this.emptySelectMembers(this.selectMembers);
      });

      //在管理状态下的,点击"没有被选中"圆形图标事件监听
      uni.$on("selectIconClick", (value) => {
        console.log("检测到icon1被点击" + value);
        this.addInSelectMembers(value.index);
      });

      //在管理状态下的,点击"没有被选中"圆形图标事件监听
      uni.$on("noselectIconClick", (value) => {
        console.log("检测到icon2被点击" + value);
        this.deleteInSelectMembers(value.index);
      });

      //监听管理状态下的,点击pageBottom的删除按钮
      uni.$on("deleteClick", (value) => {
        //点击删除按钮时的提示框
        uni.showModal({
          title: "确认删除该成员？",
          content: "删除后不可恢复，需重新添加",
          confirmText: "确认",
          confirmColor: "#E2E5EF",
          cancelText: "我再想想",
          cancelColor: "#E2E5EF",
          async success(res) {
            if (res.confirm) {
              await this.deleteMembers();
              if (this.selectMembers.length == 0) {
                uni.showToast({
                  title: "已删除",
                });
              } else {
                uni.showToast({
                  title: "出现错误",
                });
              }
            } else if (res.cancel) {
            }
          },
          fail(err) {
            console.log(err);
          },
        });
      });
      uni.$on("confirmClick", (res) => {
        this.deleteMembers(this.selectMembers);
        //清空被选中的selectMembers
      });

      //监听管理状态下的,点击pageBottom的取消按钮
      uni.$on("cancelClick", (res) => {
        uni.$emit("finishIsClicked");
      });
    }
  },

  onLoad(option) {
    this.teamId = option.teamId;
    this.isLeader = option.isLeader;
    this.init();
  },
};
</script>

<style lang="scss">
@import url("../CSS/total.scss");
.contain {
  .top {
    margin-top: 36px;
    margin-bottom: 8px;
  }

  .member-item {
    margin-bottom: 5px;
  }
  .biaoti {
    height: 12.11px;
    font-size: 5px;
    background-color: #fff0d9;
  }
}
.state1 {
  height: calc(100vh - 73px);
}
.state2 {
  height: calc(100vh - 129px);
}
</style>
