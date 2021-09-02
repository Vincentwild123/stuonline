<template>
  <view class="contain flex-column" v-if="!isLoad">
    <view class="compos-pageTop">
      <page-top
        backTitle="所有团队"
        :title="teaminfor.teamName"
        class="compos-pageTop-item"
      ></page-top>
    </view>
    <view class="compos-teaminfor">
      <team-intro
        :teaminfor="teaminfor"
        class="compos-teaminfor-item"
        :isNoJoin="true"
      ></team-intro>
    </view>
    <view class="compos-teamMembers">
      <team-member
        class="compos-teamMembers-item"
        :teamMembers="teaminfor.membersInfo"
        :teamLeaderInfo="teaminfor.leaderInfo"
      ></team-member>
    </view>
    <view class="compos-activity flex-column">
      <view class="compos-activity-title"><text>团队活动</text></view>
      <activity-item
        class="compos-activity-item"
        v-for="index in 3"
      ></activity-item>
    </view>
  </view>
</template>

<script>
import teamIntro from "../teamCompos/teamIntro";
import pageTop from "./teamCompos/pageTop.vue";
import teamMember from "./teamCompos/teamMembersImgList.vue";
import activityItem from "./teamCompos/activityItem.vue";
import {
  getTeamInfoById,
  getTeamMembers,
} from "../service.js";
export default {
  name: "teamItem-all",
  components: {
    teamIntro,
    pageTop,
    teamMember,
    activityItem,
  },

  data() {
    return {
      teaminfor: Object,
      teamId: Number,
      isLoad: true,
    };
  },
  created() {},
  methods: {
    /**
     * 初始化
     */
    async init() {
      getTeamInfoById(this.teamId).then((res) => {
        this.teaminfor = res.data.data;
        console.log("===================================");
        console.log(this.teamMembers);
        this.isLoad = false;
      });
    },
  },
  onLoad(option) {
    this.teamId = option.teamId;
    this.init();
  },
};
</script>

<style lang="scss">
@import url("../CSS/total.scss");
.contain {
  .compos-pageTop {
    background-color: #f7f9fb;
    height: 40px;
    padding: 10px 0;
    border-bottom: 1px solid #cbd5ef;
    .compos-pageTop-item {
      margin-top: 20px;
    }
  }
  .compos-teaminfor {
    // height: 104px;
    background-color: #f7f9fb;
    padding: 25px 20px;
    .compos-teaminfor-item {
    }
  }
  .compos-teamMembers {
    // padding-bottom: 30px;
    .compos-teamMembers-item {
      padding-bottom: 5px;
    }
  }
  .compos-activity {
    background-color: #f7f9fb;
    margin-top: 10px;
    .compos-activity-title {
      margin: 5px 20px;
      color: #676767;
      font-size: 12px;
    }
  }
}

.compos-activity .compos-activity-item:not(:last-child) {
  margin-bottom: 10px;
}
</style>
