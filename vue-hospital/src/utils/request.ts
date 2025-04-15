//对于axios函数库进行二次封装

//面试题：axios二次封装的目的？
//目的1：利用axios的请求与响应拦截器
//目的2：请求拦截器，一般可以在请求头中携带公共参数token
//目的3：响应拦截器，可以简化服务器返回的数据，处理http网络错误

import axios from "axios";

// 引入用户相关的仓库
import useUserStore from "@/store/modules/user";

import { ElMessage } from "element-plus";

//利用axios.create方法来创建一个axios实例：可以设置基础路径、超时的时间的设置
const request=axios.create({
    baseURL:'/api',//请求的基础路径设置
    timeout:5000,//超出时间设置5s，请求失败
})


// 请求拦截器
request.interceptors.request.use((config)=>{
    // 获取用户仓库
    let userStore=useUserStore()
    
    // token是公共参数，如果用户登录了，需要携带
    if(userStore.userInfo.token){
        config.headers.token=userStore.userInfo.token
    }

    // config：请求拦截器回调注入的对象，配置对象身上最终要的一件事情headers属性
    // 可以通过请求头携带公共参数 - token
    return config
})

// 响应拦截器
request.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    // 处理http网络错误
    let status=error.response.status
    // console.log(status)
    switch(status){
        case 404:
            // 错误的提示信息
            ElMessage({
                type:'error',
                message:'请求失败'
            })
            break;
        case 500|501|502|503|504|505:
            ElMessage({
                type:'error',
                message:'服务器挂了'
            })
            break;
    }

    return Promise.reject(new Error(error.message))
})


export default request