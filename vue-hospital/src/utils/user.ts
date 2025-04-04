// 本文件用于操作用户本地存储的信息
// 主要在Pinia的user.ts文件中用到

export const SET_TOKEN=(userInfo:string)=>{
    localStorage.setItem('USERINFO',userInfo)
}

export const GET_TOKEN=()=>{
    return localStorage.getItem('USERINFO')
}
