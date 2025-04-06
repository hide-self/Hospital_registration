// 本文件用于操作用户本地存储的信息
// 主要在Pinia的user.ts文件中用到

// 存储本地用户数据
export const SET_TOKEN=(userInfo:string)=>{
    localStorage.setItem('USERINFO',userInfo)
}

// 获取本地用户数据（免得每次进入页面重新登录）
export const GET_TOKEN=()=>{
    return localStorage.getItem('USERINFO')
}

// 清空本地用户数据
export const REMOVE_TOKEN=()=>{
    localStorage.removeItem('USERINFO')
}
