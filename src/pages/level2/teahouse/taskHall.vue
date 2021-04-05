<!-- 任务大厅  -->
<template>
    <view class="taskHall">
    	<!--头部导航栏开始-->
    	<navigator-bar>
    		<view slot="right">
    			<navigator url="/src/pages/level1/teahouse/teahouse" open-type="switchTab"><image src="../../../UI/backButton.png" mode="widthFix" style="width: 10px; vertical-align: middle; display: inline-block;"></image><text style="padding-left: 4px;">茶馆</text></navigator>
    		</view>
			<view slot="center">
				任务大厅
			</view>
    	</navigator-bar>
    	<!--头部导航栏结束-->
    	
    	<!--搜索栏开始-->
    	<search-bar></search-bar>
    	<!--搜索栏结束-->
		<!--选项栏结束-->
		<cate></cate>
		<!--选项栏结束-->
		<!--楼层数据开始-->
        <task-floor></task-floor> 
		<!--楼层数据结束-->
		<!--通知栏开始-->
		<!--通知栏结束-->
    </view>
</template>

<script>
import SearchBar from '../../../components/content/SearchBar.vue';
import NavigatorBar from '../../../components/content/NavigatorBar.vue';
import Cate from '../../../components/content/Cate.vue';
import TaskFloor from './childComp/taskFloor.vue';
export default {
name:'TaskHall',
  data () {
    return {
    };
  },
  components:{
	  SearchBar,
	  NavigatorBar,
	  Cate,
      TaskFloor,
    TaskFloor
  }
}

</script>
<style scoped>
</style>