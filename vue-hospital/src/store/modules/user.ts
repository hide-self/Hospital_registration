// 定义用户相关的仓库
import { defineStore } from "pinia";

// 引入获取验证码的请求方法
import { reqCode,reqUserLogin } from "@/api/hospital";

import type { LoginData, UserInfo, UserLoginResponseData } from "@/api/hospital/type";
import type { UserState } from "./interface";

// 引入用户信息本地存储的函数
import { GET_TOKEN,REMOVE_TOKEN,SET_TOKEN } from "@/utils/user";

const useUserStore=defineStore('User',{
    state:():UserState=>{
        return{
            visiable:false,//用于控制登陆组件dialog对话框的显示与隐藏
            code:'',//存储验证码

            // ***重点：Pinia本地存储持久化***
            userInfo:JSON.parse(GET_TOKEN() as string)||({} as UserInfo),//用于存储用户信息
        }
    },
    actions:{
        // 获取验证码的方法
        async getCode(phone:string){
            // 一般后端是用特殊插件（要花钱）将手机验证码推送到用户手机上
            // 此处我们会将获取到的验证码直接填充到前端表单上
            let result:any=await reqCode(phone)
            if (result.code==200){
                this.code=result.data
                return 'ok'
            }
            else{
                return Promise.reject(new Error(result.message))
            }
        },

        // 用户手机登录的方法
        async userLogin(loginData:LoginData){
            let result:UserLoginResponseData=await reqUserLogin(loginData)
            if(result.code==200){
                this.userInfo=result.data

                // ***重点：Pinia本地存储持久化***
                SET_TOKEN(JSON.stringify(this.userInfo))

                //返回一个成功的Promise
                return 'ok'
            }
            else{
                return Promise.reject(new Error(result.message))
            }
            
        },

        // 用户退出登录
        logout(){
            // 用户信息清空
            this.userInfo={name:'',token:''}
            // 本地存储清空(调用了utils->user.ts中的函数，该文件中只用于操作本地存储数据)
            REMOVE_TOKEN()
        }

    },
    getters:{

    }
})

export default useUserStore;