<template>
  <view class="flex-row contain">
    <view class="left flex-row">
      <view class="letColumnCenter imgItem">
        <view class="teamImg-body letallCenter" v-if="isShow"
          ><text>队长</text></view
        >
        <image :src="teamMemberInfo.userHead" class="img"></image>
      </view>
      <view class="letColumnCenter name">{{ teamMemberInfo.userName }}</view>
      <view class="level">
        <image src="../../../../UI/team/level.png" class="level-v"></image>
        <view class="level-num letallCenter">1</view>
      </view>
    </view>
    <view class="selectIcon letColumnCenter" v-if="isManaged && !isLeader">
      <uniIcon
        type="xuanze"
        color="#F4912F"
        size="15"
        v-if="!isSelect"
        :index="index"
      ></uniIcon>
      <uniIcon
        type="xuanze1"
        color="#F4912F"
        size="15"
        v-if="isSelect"
        :index="index"
      ></uniIcon>
    </view>
  </view>
</template>

<script>
import uniIcon from "../icon/uniIcon.vue";
export default {
  name: "memberItem",
  props: {
    isManaged: Boolean,
    index: Number, //表示传过来的团队的成员的编号
    isLeader: Boolean,
    isShow: Boolean,
    teamMemberInfo: Object,
  },
  data() {
    return {
      isSelect: false,
      member: {
        imgUrl: "/src/UI/team/02.png",
        userName: "陈业维",
        userId: 1,
      },
    };
  },
  created() {
    //监听事件：图标被选择
    uni.$on("iconClick" + toString(this.index), (value) => {
      if (this.index === value.index) {
        console.log("iconclick" + value.index + "被检测到");
        this.isSelect = !this.isSelect;
        if (!this.isSelect) {
          uni.$emit("selectIconClick", { index: this.index }); //触发事件，增加被选择的成员
        } else {
          uni.$emit("noselectIconClick", { index: this.index }); //触发事件，删除已经被选择的成员
        }
      }
    });
    uni.$on("finishIsClicked", () => {
      this.isSelect = false;
    });
  },
  methods: {},
  components: {
    uniIcon,
  },
};
</script>

<style lang="scss">
@import url("../../CSS/total.scss");

.contain {
  background-color: #f7f9fb;
  height: 56px;
  .left {
    width: 90%;
    .imgItem {
      margin-left: 20px;
      .img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
      }
    }
    .name {
      margin-left: 20px;
      font-size: 12px;
    }
    // .level{
    // 	position: relative;
    // 	left: 50px;
    // 	top: 40px;
    // 	.level-v{
    // 		z-index: 3;
    // 		height: 11px;
    // 		width: 11px;
    // 	}
    // 	.level-num{
    // 		position: absolute;
    // 		z-index: 4;
    // 		bottom: 5px;
    // 		right: -3px;
    // 		height: 7px;
    // 		width: 7px;
    // 		border-radius: 50%;
    // 		background-color: #FFC75D;
    // 		font-size: 4px;
    // 	}
    // }

    .level {
      position: relative;
      left: -48px;
      bottom: -28px;
      .level-v {
        z-index: 3;
        height: 11px;
        width: 11px;
      }
      .level-num {
        position: relative;
        z-index: 4;
        bottom: 11px;
        right: -7px;
        height: 7px;
        width: 7px;
        border-radius: 50%;
        background-color: #ffc75d;
        font-size: 4px;
        color: #f4912f;
      }
    }
  }
}

.imgItem .teamImg-body {
  position: absolute;
  top: 13px;
  left: 25px;
  z-index: 2;
  height: 13px;
  width: 25px;
  border: 1px solid #ff860f;
  background-color: #faf1e5;
  border-radius: 12px;
  font-size: 7px;
  letter-spacing: 1px;
  color: #ff860f;
}
</style>
