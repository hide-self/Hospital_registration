// 引入二次封装的axios
import request from "@/utils/request";
import type { HospitalDetail,DeparmentResponseData,LoginData,UserLoginResponseData } from "./type";

// 枚举请求地址
enum API{
    HOSPITALALDETAIL_URL='/hosp/hospital/',

    //获取某一个医院的科室的数据
    HOSPITALDEPARMENT_URL = '/hosp/hospital/department/',

    // 获取验证码接口
    GETUSERCODE_URL='/sms/send/',

    // 用户登录接口
    USERLOGIN_URL='/user/login/',
}

// 获取医院详情的接口
export const reqHospitalDetail=(hosCode:string)=>request.get<any,HospitalDetail>(API.HOSPITALALDETAIL_URL+hosCode)

//获取医院科室的接口
export const reqHospitalDeparment = (hoscode: string) => request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode);

// 获取验证码接口
export const reqCode=(phone:string)=>request.get<any,any>(API.GETUSERCODE_URL+phone)

// 用户登录接口
export const reqUserLogin=(data:LoginData)=>request.post<any,UserLoginResponseData>(API.USERLOGIN_URL,data)


