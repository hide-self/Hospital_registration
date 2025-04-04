<template>
    <div class="hospital">
        <!-- 左侧导航区 -->
        <div class="menu">
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>/ 医院信息</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
                    <el-icon>
                        <Bell />
                    </el-icon>
                    <span>预约通知</span>
                </el-menu-item>
                <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧路由组件展示区 -->
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Document,
    Calendar,
    InfoFilled,
    Search,
    Bell,
    HomeFilled
} from '@element-plus/icons-vue'

import { useRouter, useRoute } from 'vue-router';

import { onMounted } from 'vue';
import useDetailStore from '@/store/modules/hospitalDetails';

let $router = useRouter()

const changeActive = (path: string) => {
    // 跳转到二级路由
    $router.push({ path, query: { hosCode: $route.query.hosCode } })
}

// 获取当前路由信息
let $route = useRoute()
// console.log($route);
// $route.path打印出来是'/hospital/路由'
// 因此将他写入default-active中,避免每次刷新后重新回到原来的高亮对象上


// 获取仓库对象
let detailStore = useDetailStore()
// 组件挂载完毕：通知pinia仓库发请求获取医院详情数据，存储仓库当中
onMounted(() => {

    // 获取医院详情的数据
    detailStore.getHospital($route.query.hosCode as string);

    //获取某一个医院科室的数据
    detailStore.getDeparment($route.query.hosCode as string);
})

</script>

<style scoped>
.hospital {
    display: flex;

    /* 2:8的比例分配导航区和路由区 */
    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;

        .top {
            color: #7f7f7f;
        }
    }

    .content {
        flex: 8;
    }
}
</style>