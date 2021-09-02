<!-- 加载更多 -->
<template>
  <div>
      <uni-load-more  :status="loadStatus"></uni-load-more>
  </div>
</template>

<script>
import UniLoadMore from "../../../../components/uni-load-more"
export default {
name:'LoadMore',
  data () {
    return {
    };
  },
  components: {
      UniLoadMore
  },
  props:{
	  loadStatus:{
		  type:String,
		  default(){
			  return "more"
		  }
	  }
  }
}

</script>
<style scoped>
</style>