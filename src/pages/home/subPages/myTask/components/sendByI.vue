<template>
  <view class="container">
    <view v-for="task in taskList">
      <Task :createTime="task.createTime" :key="task.id"></Task>
    </view>
    <view class="bottom">---到底了---</view>
  </view>
</template>
<script>
import { queryTaskSendByI } from "../service.js";
import Task from "./Task";
export default {
  data() {
    return {
      taskList: [
        {
          createTime: "2020.9.28",
          id: 0,
        },
      ],
    };
  },
  components: {
    Task,
  },
  async created() {
    const res = await queryTaskSendByI();
    this.$data.taskList = res;
  },
};
</script>
<style scoped>
.bottom {
  margin-top: 30rpx;
  text-align: center;
  color: gray;
}
</style>
