<!-- 发布任务  -->
<template>
  <scroll-view scroll-y="true" class="scrollY">
    <view class="main">
      <view class="taskHall">
        <!--头部导航栏开始-->
        <navigator-bar>
          <view slot="right">
            <navigator
              url="/src/pages/teahouse/teahouse"
              open-type="switchTab"
              ><image
                src="/UI/backButton.png"
                mode="widthFix"
                style="
                  width: 10px;
                  vertical-align: middle;
                  display: inline-block;
                "
              ></image
              ><text style="padding-left: 4px">任务大厅</text></navigator
            >
          </view>
          <view slot="center"> 发布任务 </view>
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
              src="/UI/post.png"
              mode="widthFix"
              style="width: 50px"
            ></image>
          </view>
        </navigator-bar>
        <textarea
          id="text_area"
          placeholder="请输入..."
          class="text_area"
          v-model="text"
        />
        <!--从手机中获取图片-->
        <view class="showimg_box">
          <view class="hadPostImg">
            <view v-for="(item, index) in imgList" :key="index" class="imgarr">
              <view class="icon-cuo" @tap="delect(index)"
                ><image src="/UI/close.png" mode=""></image
              ></view>
              <image class="images" :src="item" @click="lookImg(index)"></image>
            </view>
          </view>
        </view>
        <view class="show_img">
          <image
            src="/UI/postPic.png"
            @tap="ChooseImage('album')"
          ></image>
          <image src="/UI/postMoji.png" @tap="ChooseEmoji"></image>
        </view>
        <image
          class="postPhoto"
          src="/UI/photo.png"
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
export default {
  name: "createAssignment",
  components: {
    NavigatorBar,
  },
  data() {
    return {
      imgList: [],
      imgArr: "",
      imgMaxNum: 3,
      emojiData: [],
      showEmoji: false,
      text: "", //文本域中的值
    };
  },
  methods: {
    //选择图片
    ChooseImage(type) {
      var _this = this;
      uni.chooseImage({
        count: 4, //默认9
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
            } else {
              _this.imgList = res.tempFilePaths;
            }
            for (var i = 0; i < tempFilePaths.length; i++) {
              console.log(tempFilePaths[i]);
              // uni.uploadFile({
              //   url: "http://192.168.13.46:30080/post/createPost", //上传的服务器地址
              //   postHidename:"0",
              //   postText:"啊手动阀手动阀·1",
              //   postModule:"0",
              //   tagNameList:"好呀",
              //   filePath: tempFilePaths[i],
              //   method: "POST",
              //   name: "file",
              //   formData: {
              //     timestamp: timestamp,
              //     enMsg: enMsg,
              //   },
              //   success: (res) => {
              //     let img = JSON.parse(res.data).data;
              //     _this.imgArr += img + ",";
              //     console.log("上传图片", _this.imgArr);
              //   },
              // });
            }
          }
        },
      });
    },
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
      console.log(this.text);
      this.text += m;
    },
    cancel() {
      this.text = "";
      this.imgList = [];
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
  margin: 20px 0;
}
.show_img image {
  width: 25px;
  height: 25px;
  margin-right: 13px;
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