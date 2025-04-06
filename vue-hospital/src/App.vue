<template>
    <el-config-provider :locale="zhCn">
        <div class="container">
            <!-- 顶部的全局组件，已经在main.ts中引入 -->
            <HospitalTop />


            <!-- 展示路由组件区域 -->
            <div class="content">
                <RouterView></RouterView>
            </div>


            <!-- 底部信息 -->
            <HospitalBottom />

            <!-- 登录组件 -->
            <Login v-if="userStore.visiable" />
        </div>
    </el-config-provider>
</template>

<script setup lang="ts" name="App">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import useUserStore from './store/modules/user';
let userStore = useUserStore()

</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content {
    width: 1200px;
    min-height: 700px;
}
</style>