<template>
  <view class="container">
    <editor
      id="editor"
      class="ql-container"
      :placeholder="placeholder"
      @ready="onEditorReady"
    ></editor>
    <button type="warn" @tap="undo">撤销</button>
    <button type="warn" @tap="getSystemInfo">获取系统信息</button>
    <view class="box">hello world</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      placeholder: "开始输入...",
    };
  },
  methods: {
    onEditorReady() {
      // #ifdef MP-BAIDU
      this.editorCtx = requireDynamicLib("editorLib").createEditorContext(
        "editorId"
      );
      // #endif

      // #ifdef APP-PLUS || H5 ||MP-WEIXIN
      uni
        .createSelectorQuery()
        .select("#editor")
        .context((res) => {
          this.editorCtx = res.context;
        })
        .exec();
      // #endif
    },
    undo() {
      this.editorCtx.undo();
    },
    getSystemInfo() {
      uni.setNavigationBarTitle({
        title: "主页",
      });
    },
  },
};
</script>

<style>
.container {
  padding: 10px;
}

#editor {
  width: 100%;
  height: 100px;
}

button {
  margin-top: 10px;
}
</style>