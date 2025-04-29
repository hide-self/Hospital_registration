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
            component: Home,
            // component第二种写法
            // component:()=>import('@/pages/home/index.vue')

            meta:{
                title:'首页'
            }
        },
        {
            path: '/hospital',
            component: Hospital,
            children: [
                {
                    path: 'register',
                    component: () => import('@/pages/hospital/register/index.vue'),

                    meta:{
                        title:'预约挂号'
                    }
                },
                {
                    path: 'detail',
                    component: () => import('@/pages/hospital/detail/index.vue'),
                    meta:{
                        title:'医院详情'
                    }
                },
                {
                    path: 'notice',
                    component: () => import('@/pages/hospital/notice/index.vue'),
                    meta:{
                        title:'预约通知'
                    }
                },
                {
                    path: 'close',
                    component: () => import('@/pages/hospital/close/index.vue'),
                    meta:{
                        title:'停诊信息'
                    }
                },
                {
                    path: 'search',
                    component: () => import('@/pages/hospital/search/index.vue'),
                    meta:{
                        title:'查询/取消'
                    }
                },
                {
                    path:'register_step1',
                    component:()=>import('@/pages/hospital/register/register_step1.vue'),
                    meta:{
                        title:'预约第一步'
                    }
                },
                {
                    path:'register_step2',
                    component:()=>import('@/pages/hospital/register/register_step2.vue'),
                    meta:{
                        title:'预约第一步'
                    }
                }

            ]
        },
        {
            path:'/wxlogin',
            component:()=>import('@/pages/wxlogin/index.vue')
        },
        {
            path:'/user',
            component:()=>import('@/pages/user/index.vue'),
            children:[
                {
                    path:'certification',
                    component:()=>import('@/pages/user/certification/index.vue'),
                    meta:{
                        title:'实名认证'
                    }
                },
                {
                    path:'order',
                    component:()=>import('@/pages/user/order/index.vue'),
                    meta:{
                        title:'挂号订单'
                    }
                },
                {
                    path:'patient',
                    component:()=>import('@/pages/user/patient/index.vue'),
                    meta:{
                        title:'就诊人管理'
                    }
                },
                {
                    path:'profile',
                    component:()=>import('@/pages/user/profile/index.vue'),
                    meta:{
                        title:'账号信息'
                    }
                },
                {
                    path:'feedback',
                    component:()=>import('@/pages/user/feedback/index.vue'),
                    meta:{
                        title:'意见反馈'
                    }
                },
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

export default router;//对外暴露：主要给入口文件main.ts注册 和 路由鉴权文件permission.ts来调用书写路由鉴权



// 路由鉴权：
// 用户未登录时可以访问的路由：
// /home 首页
// /hospital/register 医院挂号
// /hospital/detail   医院详情
// /hospital/notice   医院预约通知
// /hospital/close    医院停诊信息
// /hospital/search   医院的查询/取消
// 其他路由皆不可访问

