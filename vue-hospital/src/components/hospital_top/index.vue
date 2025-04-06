<template>
    <div class="top">
        <div class="content">
            <!-- 左侧 -->
            <div class="left" @click="goHome">
                <img src="../../assets/images/logo.png" alt="">
                <p>尚医通 预约挂号统一平台</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <!-- 未登录时，显示正常的登陆注册标签 -->
                <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
                <!-- 登陆成功后的下拉菜单 -->
                <el-dropdown v-else style="cursor: pointer;">
                    <span class="el-dropdown-link">
                        {{ userStore.userInfo.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>实名认证</el-dropdown-item>
                            <el-dropdown-item>挂号订单</el-dropdown-item>
                            <el-dropdown-item>就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { ArrowDown } from '@element-plus/icons-vue'

let $router = useRouter()

const goHome = () => {
    $router.push({ path: '/home' })
    // 由于之前已将写了重定向，所以path:'/'相当于path:'/home'
}


let userStore = useUserStore()
const login = () => {
    userStore.visiable = true
}

const logout=()=>{
    // 通知Pinia仓库清除用户相关信息，并且清空本地存储
    userStore.logout()
    // 退出后跳转至首页(编程式路由导航)
    $router.push({path:'/home'})
}

</script>

<style scoped lang="scss">
.top {
    // 顶部导航栏固定搭配
    position: sticky;
    top: 0;

    z-index: 999;
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: center;

    .content {
        width: 1200px;
        height: 70px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }

            p {
                font-size: 20px;
                color: rgb(126, 187, 255);
            }
        }

        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #ccc;

            .help {
                margin-right: 10px;
                cursor: pointer;
            }

            .login {
                cursor: pointer;
            }

            .login:hover,
            .help:hover {
                color: #7f7f77;
            }
        }
    }
}
</style>