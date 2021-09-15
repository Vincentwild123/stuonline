<!-- 发布帖子  -->
<template>
  <view class="main">
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
        <view slot="center"> 发布帖子 </view>
        <view slot="right" @click="createPost">
          <text
            style="
              background-color: #f3912f;
              display: inline-block;
              height: 46rpx;
              line-height: 46rpx;
              width: 128rpx;
              text-align: center;
              border-radius: 46rpx;
              font-size: 20rpx;
              font-weight: 600;
              color: #ffffff;
            "
            >发布</text
          ></view
        >
      </navigator-bar>
      <!--头部导航栏结束-->
      <!-- 发布类型的选择开始 -->
      <view class="post_type">
        <view class="post_model">
          <view
            class="model_item"
            :class="{ active: index === currenIndex }"
            v-for="(item, index) in postModel"
            @click="changeModel(index)"
            >{{ item }}</view
          >
        </view>
        <view class="hide_name">
          <checkbox
            @click="anonymousPost"
            :checked="anonymous"
            color="#FFCC33"
          />匿名
        </view>
      </view>
      <!-- 发布类型的选择结束 -->
      <!-- 标签栏开始 -->
      <view
        class="sel_lab"
        v-if="$store.state.selectedLabels.selectedLabels.length !== 0"
      >
        <view class="lab_icon">
          <image src="../../../UI/lableList.png" mode="heightFix"></image>
        </view>
        <view class="lab_list">
          <view
            class="lab_item"
            v-for="(item, index) in $store.state.selectedLabels.selectedLabels"
            >#{{ item }}</view
          >
        </view>
      </view>
      <!-- 标签栏结束 -->
      <!-- 文本输入框开始 -->
      <view class="task_content">
        <textarea
          id="text_area"
          placeholder="请输入..."
          class="text_area"
          v-model:value="postText"
          @click="createContent"
        />
      </view>
    </view>
    <!-- 文本输入框开始 -->
    <!-- 图片预览区开始 -->
    <view class="pre_pic">
      <view class="pic_list">
        <view class="pic_item" v-for="(item, index) in imgList">
          <image :src="item" mode="heightFix" @click="lookImg(index)"></image>
          <image
            @click="delect(index)"
            src="../../../UI/delPic.png"
            mode="widthFix"
            class="det_pic"
          />
        </view>
      </view>
    </view>
    <!-- 图片预览区结束 -->
    <!-- 点击评论后输入框弹出开始 -->
    <!-- <view class="post_bar" :style="{bottom:postHeight+'px'}" v-show="postHeight!==53"> -->
    <view class="post_bar" :style="{ bottom: postHeight + 'px' }">
      <PostPostBar @openBigBar="openBigBar"></PostPostBar>
    </view>
    <!-- 点击评论后输入框弹出结束 -->
    <!-- 点击加号后弹出来的大菜单开始 -->
    <uni-popup ref="bigIconBar">
      <BigIconBar
        @ChooseImage="ChooseImage"
        @ChooseLabels="ChooseLabels"
      ></BigIconBar>
    </uni-popup>
    <!-- 点击加号后弹出来的大菜单结束 -->
  </view>
</template>

<script>
import NavigatorBar from "../components/content/NavigatorBar.vue";
import emoji from "../../../../js_sdk/m-emoji/m-emoji_2.0.0/emoji.js";
import PostPostBar from "../components/PostPostBar.vue";
import BigIconBar from "../components/BigIconBar.vue";
import { createPost } from "../service.js";
export default {
  name: "createPost",
  components: {
    NavigatorBar,
    PostPostBar,
    BigIconBar,
  },
  data() {
    return {
      currenIndex: 0, //发布模块默认选择0
      postModel: ["闲聊", "学业", "组队", "比赛"],
      imgList: [], //图片临时路径
      imageFile: [], //图片文件
      imgMaxNum: 3, //最多上传图片数量
      emojiData: [], //表情数组
      showEmoji: false, //是否展示表情
      text: "", //文本域中的值，
      postText: "", //输入框中的值
      anonymous: false,
      postHeight: 53, //弹出输入框的高度
      // selectedLabels: [], //已经选择的标签
    };
  },
  methods: {
    //更改发布模块
    changeModel(index) {
      this.currenIndex = index;
    },
    //点击弹出输入框
    createContent() {
      uni.onKeyboardHeightChange((res) => {
        this.postHeight = res.height + 53;
      });
    },
    //点击弹出大的菜单
    openBigBar() {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.bigIconBar.open("bottom");
    },
    //选择图片
    //#region
    ChooseImage(type) {
      var _this = this;
      uni.chooseImage({
        count: 3, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: [type], //从相册选择和拍照
        success: (res) => {
          var tempFilePaths = res.tempFilePaths;
          if (_this.imgList.length + tempFilePaths.length > _this.imgMaxNum) {
            uni.showToast({
              title: "超过上传图片的最大数量",
              icon: "none",
            });
          } else {
            if (_this.imgList.length != 0) {
              _this.imgList = _this.imgList.concat(res.tempFilePaths);
              _this.imageFile = _this.imageFile.concat(res.tempFiles);
            } else {
              _this.imgList = res.tempFilePaths;
              _this.imageFile = res.tempFiles;
            }
          }
        },
      });
    },
    //#endregion
    //查看图片
    lookImg(val) {
      const urls = this.imgList;
      const current = val;
      uni.previewImage({
        urls,
        current,
      });
    },
    //删除图片
    delect(index) {
      uni.showModal({
        title: "提示",
        content: "是否要删除该图片",
        success: (res) => {
          if (res.confirm) {
            this.imgList.splice(index, 1);
            this.imageFile.splice(index, 1);
          }
        },
      });
    },
    //展示表情
    ChooseEmoji() {
      var page = Math.ceil(emoji.length / 21);
      for (let i = 0; i < page; i++) {
        this.emojiData[i] = [];
        for (let k = 0; k < 21; k++) {
          emoji[i * 21 + k] ? this.emojiData[i].push(emoji[i * 21 + k]) : "";
        }
      }
      this.showEmoji = !this.showEmoji;
    },
    //添加表情
    selemoji(m) {
      console.log(this.postText);
      this.postText += m;
    },
    // 匿名发布
    anonymousPost() {
      this.anonymous = !this.anonymous;
      // console.log(this.anonymous)
    },
    //选择标签
    ChooseLabels() {
      uni.navigateTo({
        url: "./defineLabel",
        fail(err) {
          console.log(err);
        },
      });
    },
    //发布帖子
    createPost() {
      uni.showLoading({
        title: "加载中",
      });
      if (this.postText === "") {
        uni.showToast({
          title: "不能发布空帖噢",
          duration: 2000,
          icon: "none",
        });
      }
      let data = {
        postHidename: this.anonymous ? 1 : 0,
        postText: this.postText,
        postModule: this.currenIndex,
        tagNameList: this.$store.state.selectedLabels.selectedLabels,
      };
      let files = [];
      for (let i = 0; i < this.imageFile.length; i++) {
        files[i] = {
          name: "image" + (i + 1),
          file: this.imageFile[i],
          uri: this.imgList[i],
        };
      }
      createPost(data, files)
        .then((res) => {
          // this.$bus.$emit("flashPost",this.currenIndex);
          uni.switchTab({
            url: "../teahouse",
            success() {
              uni.showToast({
                title: "发布成功",
                icon: "none",
              });
            },
          });
        })
        .catch((err) => {
          uni.showToast({
            title: "出了点小问题",
            duration: 2000,
            icon: "none",
          });
        });
    },
  },
};
</script>
<style scoped>
.active {
  background-color: #f3912f;
}
.taskHall {
  padding: 0 10px;
  padding-top: 6vh;
}
.post_type {
  height: 90rpx;
  line-height: 90rpx;
  display: flex;
  align-items: center;
}
.post_model {
  height: 61rpx;
  line-height: 61rpx;
  display: flex;
  flex: 3;
  justify-content: space-between;
}
.model_item {
  padding: 0 30rpx;
  height: 61rpx;
  border-radius: 61rpx;
  border: 1px solid #829fea;
  color: #676767;
  font-size: 24rpx;
  font-weight: 600;
}
.hide_name {
  text-align: right;
  flex: 1;
  color: #f3912f;
  font-weight: 600;
}
.sel_lab {
  height: 90rpx;
  line-height: 90rpx;
  display: flex;
  align-items: center;
}
.lab_icon {
}
.lab_icon image {
  height: 61rpx;
  vertical-align: middle;
}
.lab_list {
  display: flex;
}
.lab_item {
  color: #676767;
  font-weight: 600;
  border-radius: 42rpx;
  padding: 0 10rpx;
  height: 42rpx;
  line-height: 42rpx;
  font-size: 16rpx;
  border: 1px solid #b5caff;
  margin-left: 20rpx;
}
.task_content {
  padding-right: 10px;
}
.text_area {
  margin: 0 auto;
  height: 400rpx;
  width: 670rpx;
  border-radius: 50rpx;
  padding: 20rpx 20rpx;
  background-color: #f7f9fb;
}
.pre_pic {
}
.pic_list {
  display: flex;
}
.pic_item {
  width: 220rpx;
  height: 220rpx;
  overflow: hidden;
  position: relative;
  margin-left: calc((100vw - 660rpx) / 4);
  /* margin-left: 10rpx; */
}
.pic_item image {
  height: 220rpx;
  /* vertical-align: middle; */
}
.det_pic {
  top: 0;
  right: 0;
  position: absolute;
  height: 33rpx;
  width: 33rpx;
}
.post_bar {
  position: fixed;
  /* bottom: 600rpx; */
  width: 100%;
}
</style>