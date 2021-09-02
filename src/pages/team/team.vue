<template>
  <view class="home flex-column" v-if="!isLoad">
    <!-- 引入teamTop -->
    <view>
      <teamTop
        class="compos-top"
        @teamTop="teamTop"
        :clickIndex="clickIndex"
      ></teamTop>
    </view>

    <!-- 引入搜索组件 -->
    <view class="compos flex-column">
      <teamSearch class="compos-search" :titleIndex="clickIndex"></teamSearch>
    </view>

    <!-- 引入各个团队简介 -->
    <!-- <team-list class="item-scroll"  v-if="clickIndex === 1"></team-list> -->
    <swiper @change="changeItem" :current="clickIndex" class="compos-swiper">
      <swiper-item class="compos-swiper-item" item-id="swiper-0">
        <team-list
          class="item-scroll"
          v-if="clickIndex === 0"
          :teams="teams"
          :myTeam="false"
        ></team-list>
      </swiper-item>
      <swiper-item item-id="swiper-1">
        <team-list
          class="item-scroll"
          v-if="clickIndex === 1"
          :teams="teams"
          :myTeam="true"
        ></team-list>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import teamTop from "./teamCompos/teamTop.vue";
import teamSearch from "./teamCompos/teamSearch.vue";
import teamList from "./teamCompos/teamList.vue";
import {
  getMandate,
  getHaveJoinedTeam,
  getAllTeam,
  getTeamInfoById,
} from "./service.js";
import axios from "../../axios/axios.js";
export default {
  name: "team",
  components: {
    teamSearch,
    teamTop,
    teamList,
  },
  data() {
    return {
      clickIndex: 1,
      myTeam: true,
      teams: [],
      isLoad: true,
    };
  },

  props: {},

  methods: {
    changeItem(e) {
      this.clickIndex = e.detail.current;
    },

    //页面初始化
    async init() {
      await getMandate()
        .then((res) => {
          console.log("getMandate");
        })
        .catch((err) => {
          console.log(err);
        }); //表单鉴权

      getHaveJoinedTeam().then(
        (res) => {
          console.log("getHaveJoinedTeam");
          this.teams = res.data.data;
          this.isLoad = false;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //获取已加入的团队,存入之后需要更新，不然可能只显示原先的
  },

  created() {
    uni.$on("indexClick0", () => {
      this.clickIndex = 0;
    });
    uni.$on("indexClick1", () => {
      this.clickIndex = 1;
    });
  },

  onLoad() {
    this.init();
  },
};
</script>

<style lang="scss">
@import url("./CSS/total.scss");
page {
}
.home {
  height: 100%;
  overflow: hidden;
}
.compos-top {
  border-bottom: 1.5px solid #cbd5ef;
}

.compos {
  padding: 0 20px;
}

.compos-search {
  margin-top: 8px;
}

.item-scroll {
}
.compos-swiper {
  // height: 300px;
  height: calc(100vh - 166px);
  margin-top: 20px;
}
</style>
