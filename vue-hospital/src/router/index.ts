import { createRouter, createWebHistory } from "vue-router";

import Home from '@/pages/home/index.vue'
import Hospital from '@/pages/hospital/index.vue'

// createRouter方法，用于创建路由器实例，可以管理多个路由
const router = createRouter({
    // 路由模式
    history: createWebHistory(),

    // 管理路由
    routes: [
        {
            path: '/home',
            component: Home
            // component第二种写法
            // component:()=>import('@/pages/home/index.vue')


        },
        {
            path: '/hospital',
            component: Hospital,
            children: [
                {
                    path: 'register',
                    component: () => import('@/pages/hospital/register/index.vue')
                },
                {
                    path: 'detail',
                    component: () => import('@/pages/hospital/detail/index.vue')
                },
                {
                    path: 'notice',
                    component: () => import('@/pages/hospital/notice/index.vue')
                },
                {
                    path: 'close',
                    component: () => import('@/pages/hospital/close/index.vue')
                },
                {
                    path: 'search',
                    component: () => import('@/pages/hospital/search/index.vue')
                },
                // {
                //     // 子路由的重定向，默认打开后直接到register界面
                //     path: '/hospital',
                //     redirect: '/hospital/register'
                // }
            ]
        },
        {
            // 重定向，默认打开后直接到home界面
            path: '/',
            redirect: '/home'
        }
    ],

    // 滚动行为：控制跳转路由前后的滚动条位置
    scrollBehavior() {
        return {
            // 每次跳转过后滚动条到最左上
            left: 0,
            top: 0
        }
    }
})

export default router;