// 定义仓库中医院详情数据的数据类型

import type { HosPitalDetail, DeparmentArr, UserInfo } from "@/api/hospital/type";

export interface DetailState {
    hospitalInfo: HosPitalDetail,
    departmentArr: DeparmentArr

}


// 用户仓库相关state数据的ts类型的定义
export interface UserState {
    visiable: boolean,
    code:string,
    userInfo: UserInfo,
}
