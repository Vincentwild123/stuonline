<template>
  <view>
    <mescroll-uni
      :ref="'mescrollRef' + i"
      @init="mescrollInit"
      height="100%"
      top="60"
      :down="downOption"
      @down="downCallback"
      :up="upOption"
      @up="upCallback"
      @emptyclick="emptyClick"
    >
      <IndexFloor
        v-for="(item, index) in posts.list"
        :list="item"
        @likeIt="likeIt"
        @unlikeIt="unlikeIt"
        @click.native="getPostDetail(item)"
      ></IndexFloor>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollMixin from "./content/mescroll-uni/mescroll-mixins";
import MescrollMoreItemMixin from "./content/mescroll-uni/mixins/mescroll-more-item";
import MescrollUni from "./content/mescroll-uni/mescroll-uni.vue";
import IndexFloor from "./IndexFloor.vue";
import { getModulePostList, setLike, setUnLike } from "../service.js";
export default {
  name: "teahouse",
  mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
  data() {
    return {
      posts: {
        list: [],
        postId: 0,
      },
      downOption: {
        auto: false, // 不自动加载 (mixin已处理第一个tab触发downCallback)
      },
      upOption: {
        auto: false, // 不自动加载
        // page: {
        // 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
        // 	size: 10 // 每页数据的数量
        // },
        noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: "~ 空空如也 ~", // 提示
          btnText: "去看看",
        },
      },
    };
  },
  components: {
    MescrollUni,
    IndexFloor,
  },
  methods: {
    // //修改当前激活模块
    // changeType(index) {
    //   let type = ["talk", "study", "team", "race"];
    //   this.activeType = type[index];
    //   this.postModule = index;
    // },
    //点赞
    likeIt(postId) {
      setLike(postId).catch((err) => {
        console.log(err);
      });
    },
    //取消点赞
    unlikeIt(postId) {
      setUnLike(postId).catch((err) => {
        console.log(err);
      });
    },
    //跳转到帖子详情页面
    getPostDetail(postMes) {
      uni.navigateTo({
        url: "./subPage/postDetail?postMes=" + JSON.stringify(postMes),
      });
    },
    /*下拉刷新的回调 */
    downCallback() {
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
      this.posts.postId = 0;
      //手动制空数据
      this.posts.list = [];
      this.mescroll.resetUpScroll();
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      //联网加载数据
      getModulePostList(this.i, this.posts.postId, page.size)
        .then((res) => {
          let curPageData = res.data;
          //必传参数(当前页的数据个数, 是否有下一页true/false)
          this.mescroll.endSuccess(curPageData.length);
          this.posts.postId =
            curPageData[curPageData.length - 1].postSimple.postId;
          //设置列表数据
          this.posts.list.push(...curPageData);
        })
        .catch((err) => {
          console.log(err);
          //  联网失败, 结束加载
          this.mescroll.endErr();
        });
    },
    //点击空布局按钮的回调
    emptyClick() {
      uni.showToast({
        title: "点尼玛？",
      });
    },
  },
  mounted() {
    this.$bus.$on("sycnlike", (data) => {
      for (const item of this.posts.list) {
        if (item.postSimple.postId === data) {
          item.like = !item.like;
          break;
        }
      }
    });
    //重新加载新的数据
    // this.$bus.$on("flashPost",(data)=>{
    //   console.log(this.i);
    //   if(this.i===data){
    //     this.downCallback();
    //   }
    // });
  },
  beforeDestroy() {
    // this.$bus.$off("flashPost");
    this.$bus.$off("sycnlike");
    },
};
</script>
<style scoped>
</style>