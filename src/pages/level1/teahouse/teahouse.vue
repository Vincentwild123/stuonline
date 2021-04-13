<template>
  <view class="main">
    <!-- 轮播图 开始 -->
    <!--滚动条开始-->
    <view class="indexNotice">
      <notice-bar></notice-bar>
    </view>
    <!--滚动条结束-->
    <view class="indexSwiper">
      <index-swiper></index-swiper>
    </view>
    <!-- 轮播图 结束 -->
    <!-- 导航 开始 -->
    <index-cate @changeType="changeType"></index-cate>
    <!-- 导航 结束 -->
    <!--楼层开始-->
    <index-floor
	 v-for="(item, index) in posts[activeType].list"
	 :list="item"
	 ></index-floor>
    <!--楼层结束-->
  </view>
</template>

<script>
import indexSwiper from "./childComps/indexSwiper.vue";
import IndexFloor from "./childComps/indexFloor.vue";
import IndexCate from "./childComps/indexCate.vue";
import NoticeBar from "../../../components/content/NoticeBar.vue";

import { getFloor } from "../../../axios/teahouse/teahouse.js";
export default {
  name:"teahouse",
  data() {
    return {
      posts: {
        "talk": {
          page: 0,
          list: [],
        },
        "study": {
          page: 0,
          list: [],
        },
        "team": {
          page: 0,
          list: [],
        },
        "race": {
          page: 0,
          list: [],
        },
      },
	  activeType:"talk"
    };
  },
  components: {
    IndexFloor,
    indexSwiper,
    IndexCate,
    NoticeBar,
  },
  mounted() {
  	this.getFloor();
   },
  methods: {
    getFloor() {
      getFloor(0, 10).then((res) => {
		  console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].postSimple.postModule == 0) {
                this.posts['talk'].list.push(res.data[i])
          } else if (res.data[i].postSimple.postModule == 1) {
                this.posts['study'].list.push(res.data[i])
          } else if (res.data[i].postSimple.postModule == 2) {
                this.posts['team'].list.push(res.data[i])
          } else {
                this.posts['race'].list.push(res.data[i])
          }
        }
      });
    },
	changeType(index){
		let type = ["talk","study","team","race"];
		this.activeType = type[index]
	}
  },
};
</script>


<style scoped>
.main {
  padding: 0 10px;
}
</style>
