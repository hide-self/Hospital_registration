<template>
    <div>
        <span>获取验证码({{ time }}s)</span>
    </div>
</template>

<script setup lang="ts" name="Countdown">

import { ref,watch } from 'vue';
let time=ref<number>(5)
let props=defineProps(['flag'])

// 监听父组件传递过来的props数据变化
watch(()=>props.flag,()=>{
    // 开启定时器
    let timer=setInterval(()=>{
        time.value--;
        if(time.value==0){
            $emit('getFlag',false)
            clearInterval(timer)
        }
    },1000)
    
},{immediate:true})

let $emit=defineEmits(['getFlag'])

</script>

<style scoped>

</style>