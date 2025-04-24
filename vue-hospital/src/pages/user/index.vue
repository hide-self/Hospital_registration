<template>
    <div class="user">
        <!-- 左侧显示导航区 -->
        <div class="menu">
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>/ 会员中心</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">  
                <el-menu-item index="/user/certification" @click="goUser('/user/certification')">
                    <el-icon>
                        <Postcard />
                    </el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order" @click="goUser('/user/order')">
                    <el-icon>
                        <Notebook/>
                    </el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/patient" @click="goUser('/user/patient')">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/profile" @click="goUser('/user/profile')">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/feedback" @click="goUser('/user/feedback')">
                    <el-icon>
                        <ChatDotRound />
                    </el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>

        <!-- 右侧展示会员中心二级路由组件区域 -->
        <div class="content">
            <RouterView/>
        </div>
    </div>
</template>

<script setup lang="ts" name="">
// 引用elementPlus自带的图标
import {
  Document,
  Postcard,
  Notebook,
  User,
  ChatDotRound,
  HomeFilled
} from '@element-plus/icons-vue'

// 引入路由器、路由
import { useRouter,useRoute } from 'vue-router';

// 获取路由器对象（用于跳转）
let $router=useRouter()

// 获取路由对象（用于获取路径）
let $route=useRoute()

// 点击菜单进行跳转
const goUser=(path:string)=>{
    $router.push({path:path})
}

</script>

<style scoped lang="scss">
.user {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top {
            color: #7f7f7f;
        }
    }

    .content {
        flex: 8;
    }
}
</style>