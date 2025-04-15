<template>

</template>

<script setup lang="ts" name="">
import { SET_TOKEN } from '@/utils/user';
import { useRoute } from 'vue-router';

// 获取路由对象
let $route=useRoute()

// 持久化存储用户信息
SET_TOKEN(JSON.stringify($route.query))

let html:any=document.querySelector('html')
html.style.display='none'
</script>

<style scoped>

</style>