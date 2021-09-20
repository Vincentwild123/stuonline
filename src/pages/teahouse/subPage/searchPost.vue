<!-- 搜索帖子 -->
<template>
  <view class="ser_task">
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
      <view slot="center"> 搜索帖子 </view>
    </navigator-bar>
    <!--头部导航栏结束-->
    <!-- 搜索栏开始 -->
    <view class="ser_bar">
      <input
        type="text"
        class="ser_text"
        placeholder="按标签进行筛选..."
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
          @click="searchHotTagPost"
        />
      </view>
    </view>
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
      :up="upOption"
      @emptyclick="emptyClick"
      :down="downOption"
    >
      <!-- 搜索栏结束 -->
      <!-- 搜索提示栏开始 -->
      <view class="type_title">热门标签</view>
      <view class="type_content">
        <view
          @click="chooseHotTag(item)"
          class="type_item"
          v-for="(item, index) in hotTag"
          >#{{ item }}</view
        >
      </view>
      <!-- 搜索提示栏结束 -->
      <!-- 搜索到的数据开始 -->
      <view class="post_floor">
        <IndexFloor
          v-for="(item, index) in posts.list"
          :list="item"
          @likeIt="likeIt"
          @unlikeIt="unlikeIt"
          @click.native="getPostDetail(item)"
        ></IndexFloor>
      </view>
      <!-- 搜索到的数据结束 -->
    </mescroll-body>
    <uni-popup ref="showToast">
      <MyShowToast
        title="登陆状态"
        content="尚未登陆无法执行此操作~马上去登陆？"
        cancel="取消"
        confirm="确定"
        @userCancel="userCancel"
        @userComfire="userComfire"
      />
    </uni-popup>
  </view>
</template>

<script>
import MyShowToast from "../../../components/MyShowToast.vue";
import MescrollMixin from "../components/content/mescroll-uni/mescroll-mixins";
import MescrollBody from "../components/content/mescroll-uni/mescroll-body.vue"; // 非uni_modules版本
import NavigatorBar from "../components/content/NavigatorBar.vue";
import IndexFloor from "../components/IndexFloor.vue";
import { getTopTags, getPostByTag, setLike, setUnLike } from "../service.js";
export default {
  name: "SearchPost",
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      isFocus: false,
      posts: {
        list: [],
        postId: 0,
      }, //帖子
      hotTag: [], //热门标签
      content: "", //文本内容
      num: 5, //热门标签的数量
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        page: {
          size: 10, // 每页数据的数量,默认10
        },
        noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
        empty: {
          use: true,
          tip: "暂无相关数据",
          btnText: "马上搜索看看",
        },
        auto: true,
      },
      downOption: {
        use: false,
      },
      firstLoad: true, //初次加载
    };
  },
  components: {
    NavigatorBar,
    MescrollBody,
    IndexFloor,
    MyShowToast,
  },
  methods: {
    //点击取消具体操作
    userCancel() {
      this.$refs.showToast.close();
    },
    //点击确定具体操作
    userComfire() {
      uni.navigateTo({
        url: "../login/login",
      });
      this.$refs.showToast.close();
    },
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
        url: "./postDetail?postMes=" + JSON.stringify(postMes),
      });
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      if (this.firstLoad) {
        this.mescroll.endSuccess(0);
        this.firstLoad = false;
        return;
      }
      //联网加载数据
      getPostByTag(this.content, this.posts.postId, page.size)
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
      this.isFocus = true;
    },
    //选择热门标签
    chooseHotTag(tagName) {
      this.content += tagName;
    },
    //搜索热门标签的帖子
    searchHotTagPost() {
      this.posts.list=[];
      this.posts.postId=0;
      //联网加载数据
      getPostByTag(this.content, this.posts.postId, this.upOption.page.size)
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
  },
  mounted() {
    getTopTags(this.num).then((res) => {
      this.hotTag = res.data;
    });
  },
  onShow() {
    this.$bus.$on("showLoginState", () => {
      this.$refs.showToast.open("center");
    });
  },
  onHide() {
    this.$bus.$off("showLoginState");
  },
};
</script>
<style scoped>
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
.type_title {
  margin: 20rpx 0;
  font-size: 20rpx;
  color: #3cba1f;
  font-weight: 600;
}
.type_content {
  display: flex;
}
.type_item {
  margin-left: 30rpx;
  border: 2rpx solid #b5caff;
  height: 42rpx;
  padding: 0 20rpx;
  border-radius: 42rpx;
  font-size: 18rpx;
  line-height: 42rpx;
  color: #f4912f;
}
</style>