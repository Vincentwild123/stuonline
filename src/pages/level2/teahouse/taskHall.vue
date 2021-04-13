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
		<cate @changeType></cate>
		<!--选项栏结束-->
		<!--楼层数据开始-->
        <task-floor 
		v-for="(item, index) in posts[activeType].list"
		:list="item"
		></task-floor> 
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

import { getFloor } from "../../../axios/teahouse/teahouse.js";
export default {
name:'TaskHall',
  data () {
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
  components:{
	  SearchBar,
	  NavigatorBar,
	  Cate,
      TaskFloor,
    TaskFloor
  },
  methods:{
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
  }
}

</script>
<style scoped>
</style>