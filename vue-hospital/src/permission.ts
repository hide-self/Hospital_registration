// 路由鉴权：全局守卫完成
// 用户未登录时可以访问的路由：
// /home 首页
// /hospital/register 医院挂号
// /hospital/detail   医院详情
// /hospital/notice   医院预约通知
// /hospital/close    医院停诊信息
// /hospital/search   医院的查询/取消
// 其他路由皆不可访问



// 引入路由器
import router from "./router";

// 引入进度条（提前下载好：npm i nprogress）
// @ts-ignore
import Nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入pinia仓库
import pinia from '@/store'
import useUserStore from "./store/modules/user";

// 引入用户仓库
let userStore=useUserStore(pinia)

// 取消掉进度条加载的小球
Nprogress.configure({showSpinner:false})


// 白名单列表：用于存储用户未登录时可以访问的路由
let whiteList = ["/home", '/hospital/register', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search'];

// 添加相应的全局守卫
// 前置守卫(访问路由之前)
router.beforeEach((to,from,next)=>{
    // 在访问路由组件之前，先让进度条开始动
    Nprogress.start()
    // 传入的三个参数的含义：
    // 1.to代表跳转过去的路由对象,to的内部键值对就是axios文件中createRouter的第二个参数数组的对象的键值对
    // 因此to能够访问meta和path
    document.title=`尚医通-${to.meta.title}`//通过to，可以动态显示浏览器页面标题

    // 根据token判断用户是否登录
    let token=userStore.userInfo.token
    if(token){//若已经登录，则开放所有路由

        // 3.next表示跳转页面的函数，表示放行。若next无参数时，默认正常跳转，可以传入路由来控制跳转方位
        next()
    }
    else{//若用户未登录
        if(whiteList.includes(to.path)){//若访问路由在白名单中，则放行
            next()
        }
        else{//若不在白名单中，则跳转到主页/home,并打开登录组件
            // 跳转到首页
            next({path:'/home',query: { redirect: to.fullPath }})//若过后又登录成功，则重新跳回原来想去的路径

            // 打开登录组件
            userStore.visiable=true
        }
    }

    
})
// 后置路由(访问路由之后)
router.afterEach((to,from)=>{
    // 访问成功后进度条消失
    Nprogress.done()

})


// 做完之后，要在入口文件main.ts中引入