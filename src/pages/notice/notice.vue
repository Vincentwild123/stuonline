<template>
 <div>通知</div>
</template>
<script>
import { getUserNoticeNumber  } from './service.js'
export default { 
    data(){
        return {

        }
    },
    async onLoad(){
        const res = await getUserNoticeNumber();
        console.log(res);
    }
}


</script>
<style><style>