<template>
  <view class="item-members flex-row" style="">
    <view class="item-members-left">
      <view class="item-members-left-title letColumnCenter"
        ><text>团队成员({{ teamMembers.length + 1 }})</text></view
      >
      <scroll-view scroll-x class="scroll-list" show-scrollbar="true">
        <view class="letColumnCenter">
          <!-- 添加成员 -->
          <view class="flex-column scroll-item1" @click="addTeamMembers">
            <image
              src="../../../../UI/team/createTeam-img.png"
              class="img"
            ></image>
            <view class="letRowCenter member-name1"><text>添加成员</text></view>
          </view>
          <!-- 已加入成员 -->
          <!-- 队长 -->
          <view class="flex-column scroll-item2">
            <view class="teamImg-body letallCenter"><text>队长</text></view>
            <image :src="teamLeaderInfo.userHead" class="img"></image>
            <view class="letRowCenter member-name"
              ><text>{{ teamLeaderInfo.userName }}</text></view
            >
          </view>
          <!-- 一般成员 -->
          <view
            class="flex-column scroll-item1"
            v-for="(item, index) in teamMembers"
          >
            <image :src="item.userHead" class="img"></image>
            <view class="letRowCenter member-name"
              ><text>{{ item.userName }}</text></view
            >
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="item-members-right letColumnCenter">
      <uniIcon
        type="jiantou"
        size="15"
        color="#ADB7D1"
        eventName="teamDetail-join"
        index="3"
      ></uniIcon>
    </view>
  </view>
</template>

<script>
import uniIcon from "../icon/uniIcon.vue";
export default {
  name: "teamMember",
  components: {
    uniIcon,
  },
  data() {
    return {};
  },
  props: {
    teamMembers: Array,
    teamLeaderInfo: Object,
  },

  methods: {
    /**
     * 把teamMembers数组中的队长清除
     */
    deleteLeaderInTeamMembers() {
      for (let i = 0; i < this.teamMembers.length; i++) {
        if (this.teamLeaderInfo.userId == this.teamMembers[i].userId) {
          this.teamMembers.splice(i, 1);
          break;
        }
      }
    },

    /**
     * 点击添加成员监听
     */
    addTeamMembers() {
      console.log("添加成员");
    },
  },

  watch: {
    /**
     * @param {Array} newValue teamMembers的新值
     * @param {Array} oldValue teamMembers的旧值
     * 监听teamMembers数组的变化
     */
    teamMembers(newValue, oldValue) {
      this.deleteLeaderInTeamMembers(); //从teamMembers删除队长
    },
  },

  created() {
    this.deleteLeaderInTeamMembers();
  },
};
</script>

<style lang="scss">
@import url("../../CSS/total.scss");
.item-members {
  height: 82px;
  margin-top: 10px;
  background-color: #f7f9fb;
  .item-members-left {
    width: 82%;
    padding-left: 20px;
    padding-right: 10px;
    .item-members-left-title {
      height: 30%;
      font-size: 12px;
      font-weight: bold;
      color: #676767;
      letter-spacing: 1px;
    }
    .scroll-list {
      margin-top: 8px;
      .scroll-item1 {
        width: 28px;
        margin-right: 13px;
      }
      .scroll-item2 {
        height: 43px;
        width: 28px;
        margin-right: 13px;
        margin-top: 5px;
      }
    }
  }
}

.img {
  height: 28px;
  width: 28px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
.member-name {
  font-size: 7px;
  color: #888888;
  margin-top: 2px;
}
.member-name1 {
  font-size: 7px;
  color: #ff860f;
  margin-top: 2px;
}

.scroll-item2 .teamImg-body {
  position: absolute;
  // top: 13px;
  top: 0px;
  left: 45px;
  z-index: 999;
  height: 8px;
  width: 19px;
  border: 1px solid #ff860f;
  background-color: #faf1e5;
  border-radius: 8px;
  font-size: 5px;
  letter-spacing: 1px;
  color: #ff860f;
}
scroll-view ::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>
