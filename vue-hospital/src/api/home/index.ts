// 同意管理首页模块接口
// 将首页的请求全部封装于此

import request from "@/utils/request";

import type { HospitalResponseData } from "./type";

// 通过美剧管理首页模块的接口地址
enum API{
    // 获取已有的医院的数据接口地址
    HOSPITAL_URL='/hosp/hospital/'
}

// 获取医院的数据
export const reqHospital=(page:number,limit:number)=>request.get<any,HospitalResponseData>(API.HOSPITAL_URL+`${page}/${limit}`)
