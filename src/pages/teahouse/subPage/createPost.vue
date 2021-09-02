<!-- 发布帖子  -->
<template>
  <scroll-view scroll-y="true" class="scrollY">
    <view class="main">
      <view class="taskHall">
        <!--头部导航栏开始-->
        <navigator-bar>
          <view slot="right">
            <navigator
              url="../teahouse"
              open-type="switchTab"
              ><image
                src="../../../UI/backButton.png"
                mode="widthFix"
                style="
                  width: 10px;
                  vertical-align: middle;
                  display: inline-block;
                "
              ></image
              ><text style="padding-left: 4px">茶馆</text></navigator
            >
          </view>
          <view slot="center"> 发布帖子 </view>
        </navigator-bar>
        <!--头部导航栏结束-->
        <!--任务输入框开始-->
        <navigator-bar>
          <view
            @click="cancel"
            slot="right"
            style="font-size: 12px; color: #757575"
          >
            取消
          </view>
          <view slot="left">
            <image
              src="../../../UI/post.png"
              mode="widthFix"
              style="width: 50px"
              @click="createPost"
            ></image>
          </view>
        </navigator-bar>
        <textarea
          id="text_area"
          placeholder="请输入..."
          class="text_area"
          v-model:value="postText"
        />
        <!--从手机中获取图片-->
        <view class="showimg_box">
          <view class="hadPostImg">
            <view v-for="(item, index) in imgList" :key="index" class="imgarr">
              <view class="icon-cuo" @tap="delect(index)"
                ><image src="../../../UI/close.png" mode=""></image
              ></view>
              <image class="images" :src="item" @click="lookImg(index)"></image>
            </view>
          </view>
        </view>
        <!-- 发布类型限定是否匿名开始 -->
        <view class="post_type">
          <view class="anonymous_post" @click="anonymousPost">
            <view v-if="anonymous">
              <image src="../../../UI/anonymous.png" mode="widthFix"></image
              ><image src="../../../UI/unselected.png" mode="widthFix"></image>
            </view>
            <view v-else>
              <image
                src="../../../UI/anonymousSelected.png"
                mode="widthFix"
              ></image
              ><image src="../../../UI/selected.png" mode="widthFix"></image>
            </view>
          </view>
          <view class="check_limit">
            公开可见<image
              src="../../../UI/turnRight.png"
              mode="widthFix"
            ></image>
          </view>
        </view>
        <!-- 发布类型限定是否匿名结束 -->
        <view class="show_img">
          <view class="post_type">
            <image
              src="../../../UI/postPic.png"
              @tap="ChooseImage('album')"
            ></image>
            <image src="../../../UI/postMoji.png" @tap="ChooseEmoji"></image>
          </view>
          <view class="post_tag"> #打标签 </view>
        </view>
        <image
          class="postPhoto"
          src="../../../UI/photo.png"
          @tap="ChooseImage('camera')"
        ></image>
        <!--任务输入框结束-->
        <swiper
          class="slider"
          :current="emojiData.length - 1"
          v-if="showEmoji == true"
        >
          <swiper-item
            v-for="(item, key) in emojiData"
            :key="key"
            class="slider-emoji"
            :class="[key == emojiData.length - 1 ? 'lastbox' : '']"
          >
            <text
              v-for="(emoji, index) in item"
              :key="index"
              @click="selemoji(emoji)"
              class="slider-emoji-icon"
              >{{ emoji }}</text
            >
          </swiper-item>
        </swiper>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import NavigatorBar from "../components/content/NavigatorBar.vue";
import emoji from "../../../../js_sdk/m-emoji/m-emoji_2.0.0/emoji.js";
import { createPost } from "../service.js";
export default {
  name: "createPost",
  components: {
    NavigatorBar,
  },
  data() {
    return {
      imgList: [],//图片临时路径
      imageFile: [],//图片文件
      imgMaxNum: 3,//最多上传图片数量
      emojiData: [],//表情数组
      showEmoji: false,//是否展示表情
      text: "", //文本域中的值，
	  postText:"",//输入框中的值
      anonymous: false,
    };
  },
  methods: {
    //选择图片
    //#region 
    ChooseImage(type) {
      var _this = this;
      uni.chooseImage({
        count: 3, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: [type], //从相册选择和拍照
        success: (res) => {
          console.log(res);
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
    cancel() {
      this.postText = "";
      this.imgList = [];
    },
    // 匿名发布
    anonymousPost() {
      this.anonymous = !this.anonymous;
    },
    //发布帖子
    createPost() {
      let data = {
        postHidename: this.anonymous?1:0,
        postText: this.postText,
        postModule: "3",
        tagNameList: ["我","你","它"]
      };
      let files = [];
      for(let i=0;i<this.imageFile.length;i++){
      		files[i]={
      			name:"image"+(i+1),
      			file:this.imageFile[i],
      			uri:this.imgList[i]
      		}
      }
	  createPost(data,files).then(res=>{
		  console.log(res);
	  },err=>{
		  console.log(err);
	  })
    },
  },
};
</script>
<style scoped>
.main {
  padding: 0 10px;
}
.scrollY {
  margin-top: 6vh;
  height: 94vh;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
.text_area {
  height: 140px;
  width: 100%;
}
/* 图片添加样式开始*/
.showimg_box {
  /* display: flex; */
  /* align-items: center; */
  margin-top: 20upx;
}
.show_img {
  height: 25px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
.show_img image {
  width: 25px;
  height: 25px;
  margin-right: 13px;
}
.post_type {
}
.post_tag {
  font-size: 11px;
  color: #cacaca;
  text-align: center;
  line-height: 26px;
  border-radius: 10px;
  width: 60px;
  height: 25px;
  border: #cacaca 1px solid;
}
.postPhoto {
  width: 80px;
  height: 80px;
}
.hadPostImg {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.imgarr {
  position: relative;
}
.icon-cuo image {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  z-index: 10;
}
.images {
  border-radius: 14px;
  width: 80px;
  height: 80px;
}
/* 图片添加样式结束*/
/* 发布选项样式开始 */
.post_type {
  display: flex;
  justify-content: space-between;
}
.anonymous_post {
  width: 80px;
}
.anonymous_post image:first-child {
  width: 60px;
}
.anonymous_post image:last-child {
  width: 20px;
}
.check_limit {
  color: #bebebe;
  font-size: 12px;
}
.check_limit image {
  margin-left: 5px;
  width: 6px;
  vertical-align: middle;
}
/* 发布选项样式结束 */
/* 表情部分开始 */
.slider {
  width: 100%;
  height: 100px;
}
.slider-emoji {
  width: 375px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f7f9fb;
}
.slider-emoji-icon {
  width: 53%;
  text-align: center;
  padding: 10.5px 0;
}
.lastbox {
  justify-content: flex-start;
}
/* 表情部分结束 */
</style>