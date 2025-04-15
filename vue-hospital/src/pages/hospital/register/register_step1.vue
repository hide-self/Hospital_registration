<template>
    <div class="wrap">
        <!-- 顶部结构 -->
        <div class="top">
            <div class="hosname">{{ workData.baseMap?.hosname }}</div>
            <div class="line"></div>
            <div>{{ workData.baseMap?.bigname }}</div>
            <div class="dot">.</div>
            <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
        </div>

        <!-- 中间展示日期的结构 -->
        <div class="center">
            <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
            <div class="container">
                <div class="item" :class="{ active: item.status == -1 || item.availableNumber == -1,cur:item.workDate==workTime.workDate }"
                    v-for="item in workData.bookingScheduleList" :key="item" @click="changeTime(item)"
                    >
                    <div class="top1">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
                    <div class="bottom1">
                        <div v-if="item.status == -1">停止挂号</div>
                        <div v-if="item.status == 0">
                            {{ item.availableNumber == -1 ? '约满了' : `有号(${item.availableNumber})` }}
                        </div>
                        <div v-if="item.status == 1">
                            即将放号
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination v-model:current-page="pageNo" layout="prev, pager, next" :total="50"
                @current-change="fetchWorkData" />
        </div>

        <!-- 底部展示医生的结构 -->
        <div class="bottom">
            <!-- 展示即将放号的时间 -->
            <div class="will" v-if="morningArr.length==0 && afternoonArr.length==0">
                <span class="time1">xxxx年x月x日xx:xx</span>
                <span class="willText">放号</span>
            </div>

            <!-- 展示医生的结构：上午、下午 -->
            <div class="doctor" v-else>
                <!-- 顶部文字提示 -->
                <!-- 上午医生信息 -->
                <div class="morning">
                    <div class="tip">

                        <svg t="1744638921763" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2657" width="32" height="32">
                            <path
                                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                                fill="#1296db" p-id="2658"></path>
                        </svg>
                        <span class="text">上午号源</span>
                    </div>
                    <!-- 上午号源中每个医生的信息 -->
                    <div class="doc_info" v-for="doctor in morningArr" :key="doctor.id">
                        <!-- 左侧展示医生名字+技能 -->
                        <div class="left">
                            <div class="info">
                                <span>{{ doctor.title }}</span>
                                <span>|</span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">{{ doctor.skill }}</div>
                        </div>
                        <!-- 右侧展示医生挂号费+剩余挂号的数量 -->
                        <div class="right">
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button type="primary" size="default" @click="goStep2(doctor)">{{ doctor.availableNumber }}</el-button>
                        </div>
                    </div>

                </div>

                <!-- 下午医生信息,由于样式与上午相同，所以直接使用上午有样式 -->
                <div class="morning">
                    <div class="tip">
                        <svg t="1744640390175" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4062" width="32" height="32">
                            <path
                                d="M956.67822 265.212314c0-16.954137-13.745049-30.699186-30.699186-30.699186H93.008812c-16.954137 0-30.699186 13.745049-30.699186 30.699186s13.745049 30.699186 30.699186 30.699186h149.107993C248.922814 356.451318 275.789719 412.512125 319.503313 456.226742c51.022047 51.021024 118.858038 79.119989 191.013405 79.119989S650.509099 507.247766 701.531146 456.226742c43.713594-43.714617 70.581522-99.775424 77.386508-160.315242h147.06138c16.954137 0 30.699186-13.745049 30.699186-30.699186z m-239.676731 30.699186c-14.888082 100.599186-101.811804 178.036859-206.484771 178.036859-104.671944 0-191.595666-77.438697-206.483748-178.036859h412.968519zM511.999488 587.553767c16.954137 0 30.699186 13.745049 30.699186 30.699185v141.216256c0 16.954137-13.745049 30.699186-30.699186 30.699186s-30.699186-13.745049-30.699186-30.699186v-141.216256c0-16.954137 13.745049-30.699186 30.699186-30.699185zM262.443759 493.174236c5.994528-5.994528 13.851473-8.991792 21.707395-8.991792s15.712867 2.997264 21.707394 8.991792c11.989055 11.988032 11.989055 31.425733 0 43.414789l-99.855242 99.855242c-11.989055 11.989055-31.426757 11.989055-43.415812 0-11.988032-11.989055-11.988032-31.426757 0-43.415812l99.856265-99.854219zM740.742193 484.182444c7.855922 0 15.71389 2.998287 21.707394 8.991792l99.855242 99.854219c11.989055 11.989055 11.989055 31.426757 0 43.414788-11.989055 11.990079-31.42778 11.990079-43.414788 0.001024l-99.855243-99.855242c-11.989055-11.988032-11.989055-31.425733 0-43.414789 5.995551-5.995551 13.849426-8.991792 21.707395-8.991792z"
                                fill="#1296db" p-id="4063"></path>
                        </svg>
                        <span class="text">下午号源</span>
                    </div>
                    <!-- 上午号源中每个医生的信息 -->
                    <div class="doc_info" v-for="doctor in afternoonArr" :key="doctor.id">
                        <!-- 左侧展示医生名字+技能 -->
                        <div class="left">
                            <div class="info">
                                <span>{{ doctor.title }}</span>
                                <span>|</span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">{{ doctor.skill }}</div>
                        </div>
                        <!-- 右侧展示医生挂号费+剩余挂号的数量 -->
                        <div class="right">
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button type="primary" size="default" @click="goStep2(doctor)">{{ doctor.availableNumber }}</el-button>
                        </div>
                    </div>
                    

                </div>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { reqHospitalDoctor, reqHospitalWork } from '@/api/hospital';
import { useRoute, useRouter } from 'vue-router';
import type { DocArr, Doctor, DoctorResponseData, HospitalWordData } from '@/api/hospital/type';

// 获取路由对象
let $route = useRoute()

// 当前分页器页码
let pageNo = ref<number>(1)
// 一页展示多少数据
let limit = ref<number>(6)

// 存储医院科室挂号数据
let workData = ref<any>({})

// 存储排版日期：当前数据的第一个
let workTime = ref<any>({})

// 存储排班医生的数据
let docArr = ref<DocArr>([])

// 组件挂在完毕后发送一次请求
onMounted(() => {
    fetchWorkData()
})

// 获取挂号数据
const fetchWorkData = async () => {
    let result: HospitalWordData = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string)
    if (result.code == 200) {
        workData.value = result.data

        // 存储第一天的数据
        // @ts-ignore
        workTime.value = workData.value.bookingScheduleList[0];

        // 获取一次医生的数据
        getDoctorWorkData()
    }

}

// 获取某一天医生排班的数据
const getDoctorWorkData = async () => {
    // 医院的编号
    let hoscode: string = $route.query.hoscode as string

    // 科室的编号
    let depcode: string = $route.query.depcode as string

    // 时间
    // @ts-ignore
    // let workDate=workTime.value.workDate//这个结果为xxxx-xx-xx，由于接口不再更新所以数据时间修改为定值2024-11-6
    let workDate: string = "2024-11-6"

    // 获取排班医生的数据
    let result: DoctorResponseData = await reqHospitalDoctor(hoscode, depcode, workDate)

    if (result.code == 200) {
        docArr.value = result.data
    }

}



// 点击顶部某天的时候出发回调
const changeTime = (item: any) => {
    // 存储用户选择的那一天的数据
    workTime.value = item
    // 再发一次获取医生排班的数据
    getDoctorWorkData()


}

// 计算出上午排班的医生数据
let morningArr = computed(() => {

    return docArr.value.filter((doc: Doctor) => {
        return doc.workTime == 0
    })
})

// 计算出下午排班的医生数据
let afternoonArr = computed(() => {

    return docArr.value.filter((doc: Doctor) => {
        return doc.workTime == 1
    })
})

// 获取路由器对象
let $router=useRouter()
// 跳转到第二步
const goStep2=(doctor:Doctor)=>{
    // 编程式路由导航,且携带医生的ID
    $router.push({path:'/hospital/register_step2',query:{docId:doctor.id}})

}

</script>

<style scoped lang="scss">
.wrap {
    padding-left: 20px;

    .top {
        display: flex;
        color: #7f7f7f;

        .line {
            width: 5px;
            height: 20px;
            background-color: skyblue;
            margin: 0px 5px;
        }

        .dot {
            margin: 0px 5px;
            color: skyblue;
        }
    }

    .center {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .time {
            margin: 30px 0;
            font-weight: 900;
        }

        .container {
            width: 100%;
            display: flex;

            .item {
                flex: 1;
                border: 1px solid skyblue;
                margin: 0px 5px;
                transition: all 0.5s;

                &.active {
                    border: 1px solid #ccc;
                    color: #7f7f7f;

                    .top1 {
                        background-color: #ccc;
                    }
                }
                &.cur{
                    transform: scale(1.1);//等比放大
                    
                }

                .top1 {
                    background-color: #e8f2ff;
                    width: 100%;
                    text-align: center;
                    line-height: 30px;
                }

                .bottom1 {
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                }
            }
        }
    }

    .bottom {
        .will {
            text-align: center;
            font-size: 30px;
            font-weight: 900;

            .time1 {
                color: red;
            }

            .willText {
                color: skyblue;
            }
        }


        .doctor {
            .morning {
                .tip {
                    display: flex;
                    align-items: center;

                    .text {
                        color: #7f7f7f;
                        font-weight: 900;
                    }
                }

                .doc_info {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0px;
                    border-bottom: 1px solid #ccc;

                    .left {
                        .info {
                            color: skyblue;
                            margin: 10px 0;

                            span {
                                margin: 0 5px;
                                font-size: 18px;
                                font-weight: 900;
                            }
                        }

                        .skill {
                            margin: 10px 0;
                            color: #7f7f7f;
                            padding-left: 5px;
                        }
                    }

                    .right {
                        width: 150px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .money {
                            color: #7f7f7f;
                            font-weight: 900;
                        }
                    }
                }
            }

        }
    }
}
</style>