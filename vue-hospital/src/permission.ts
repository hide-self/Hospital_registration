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


// 取消掉进度条加载的小球
Nprogress.configure({showSpinner:false})

// 添加相应的全局守卫
// 前置守卫(访问路由之前)
router.beforeEach((to,from,next)=>{
    // 在访问路由组件之前，先让进度条开始动
    Nprogress.start()

    // 传入的三个参数的含义：
    // 1.to代表跳转过去的路由对象
    document.title=`尚医通-${to.meta.title}`//通过to，可以动态显示浏览器页面标题

    next()
})
// 后置路由(访问路由之后)
router.afterEach((to,from)=>{
    // 访问成功后进度条消失
    Nprogress.done()

})


// 做完之后，要在入口文件main.ts中引入