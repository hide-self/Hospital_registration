import { createApp } from 'vue'
import App from './App.vue'

// 1.引入初始化样式（清除默认样式）
// 由于是sass文件，所以需要引入样式将scss文件变成css文件
// 安装方式npm i sass
// 新改变：此处现在已经改成了css文件
import '@/style/reset.css'

// 2.引入全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
import Visitor from '@/components/visitor/visitor.vue'

// 3.引入vue-router并安装
import router from '@/router'

// 4.引入element-plus插件并安装
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 5.引入element-plus中的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//6.引入element-plus的国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 7.引入pinia仓库
import pinia from '@/store'


const app = createApp(App)

// 将全局组件定义，使用app的component方法，第一个传入的是组件名，第二个传入组件变量
// 注册全局组件后，就不用引入了
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login',Login)
app.component('Visitor',Visitor)

// 安装vue-router
app.use(router)
// 引入路由鉴权，引入之后就可以直接生效了，不用安装什么别的东西
import './permission'

// 安装element-plus组件库
app.use(ElementPlus)

// 定义图标全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//使用elementPlus的国际化
app.use(ElementPlus, {
    locale: zhCn,
})


// 安装pinia仓库
app.use(pinia)

app.mount('#app')
