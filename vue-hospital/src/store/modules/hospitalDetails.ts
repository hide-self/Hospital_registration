import { defineStore } from "pinia";
import { reqHospitalDeparment, reqHospitalDetail } from "@/api/hospital";
import type { DeparmentResponseData, HosPitalDetail, HospitalDetail,DeparmentArr } from "@/api/hospital/type";
import type { DetailState } from "./interface";

// pinia小仓库

// pinia小仓库可以用选择式API写法、组合式API写法
const useDetailStore = defineStore('Detail', {
    state: (): DetailState => {
        return {
            hospitalInfo: ({} as HosPitalDetail),
            departmentArr:[]
        }
    },
    actions: {
        // 获取医院详情的方法
        async getHospital(hoscode: string) {
            let result: HospitalDetail = await reqHospitalDetail(hoscode)
            // console.log(result);
            if (result.code == 200) {
                this.hospitalInfo = result.data
            }

        },

        // 获取某一个医院科室的数据
        async getDeparment(hoscode: string) {
            let result: DeparmentResponseData = await reqHospitalDeparment(hoscode)
            if (result.code==200){
                this.departmentArr=result.data
            }
            
        }
    },
    getters: {

    }
})

// 获取仓库的方法对外暴露
export default useDetailStore

