<template>
    <div class="container">
        <h1 class="tip">确认挂号信息</h1>

        <!-- 卡片：展示就诊人信息 -->
        <el-card class="box-card">
            <!-- 卡片头部 -->
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button type="primary" size="default" @click="" :icon="User">添加就诊人信息</el-button>
                </div>
            </template>

            <!-- 卡片中部 -->
            <div class="user">
                <Visitor @click="changeIndex(index)" v-for="(user, index) in userArr" :key="user.id" class="Item"
                    :user="user" :index="index" :currentIndex="currentIndex" />
            </div>


        </el-card>

        <!-- 卡片：展示医生信息 -->
        <el-card class="box-card">
            <!-- 卡片头部 -->
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>

                </div>
            </template>

            <!-- 卡片的身体部分：展示医生信息 -->
            <el-descriptions class="margin-top" :column="2" border>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊日期:
                        </div>
                    </template>
                    {{ docInfo?.workDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊医院:
                        </div>
                    </template>
                    {{ docInfo?.param.hosname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊科室:
                        </div>
                    </template>
                    {{ docInfo?.param.depname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生姓名:
                        </div>
                    </template>
                    {{ docInfo?.docname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生职称:
                        </div>
                    </template>
                    {{ docInfo?.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生专长:
                        </div>
                    </template>
                    {{ docInfo?.skill }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医事服务费:
                        </div>
                    </template>
                    <span style="color: red;">{{ docInfo?.amount }}</span>
                </el-descriptions-item>
            </el-descriptions>


        </el-card>

        <!-- 确定挂号按钮 -->
        <div class="btn">
            <el-button @click="submitOrder" type="primary" size="large" :disabled="currentIndex == -1">确认挂号</el-button>
        </div>
    </div>
</template>

<script setup lang="ts" name="">
// 引入用户图标
import { User } from '@element-plus/icons-vue';

// 就诊人组件
import Visitor from './visitor.vue';

// 引入获取就诊人信息的接口
import { reqDoctorInfo, reqGetUser } from '@/api/hospital';
import { onMounted, ref } from 'vue';

// 引入ts类型
import type { UserResponseData, UserArr, DoctorInfoData, Doctor } from '@/api/hospital/type';
import { useRoute, useRouter } from 'vue-router';
import { reqSubmitOrder } from '@/api/user';
import type { SubmitOrder } from '@/api/user/type';
import { ElMessage } from 'element-plus';

// 存储就诊人信息
let userArr = ref<UserArr>([])

// 获取路由
let $route = useRoute()

//存储医生信息
let docInfo = ref<Doctor>()

// 存储用户索引值,确认选择的就诊人
let currentIndex = ref<number>(-1)//起始值为-1，表示谁都没选择




// 挂载后获取信息
onMounted(() => {
    // 获取就诊人信息
    fetchUserData()

    // 获取医生信息
    fetchInfo()
})

// 获取就诊人信息
const fetchUserData = async () => {
    // 获取就诊人信息：当前老师账号下已经添加过就诊人信息了
    // 若是新账号，则需要手动添加就诊人，将数据存储到数据库中
    let result: UserResponseData = await reqGetUser()
    if (result.code == 200) {
        userArr.value = result.data
    }

}

// 获取医生信息
const fetchInfo = async () => {
    let result: DoctorInfoData = await reqDoctorInfo($route.query.docId as string)
    if (result.code == 200) {
        docInfo.value = result.data
    }

}

const changeIndex = (index: number) => {
    // 存储当前用户选中的就诊人的信息
    currentIndex.value = index

}


let $router=useRouter()
// 确定挂号按钮的回调
const submitOrder = async () => {
    //医院编号
    let hoscode = docInfo.value?.hoscode
    //医生的ID
    let scheduleId = docInfo.value?.id
    //就诊人的ID
    let patientId = userArr.value[currentIndex.value].id;
    //提交订单
    let result: SubmitOrder = await reqSubmitOrder(hoscode as string, scheduleId as string, patientId);

    //提交订单成功
    if (result.code == 200) {
        $router.push({ path: "/user/order", query: { orderId: result.data } });
    } else {
        ElMessage({
            type: "error",
            message: result.message,
        });
    }


}


</script>

<style scoped lang="scss">
.container {
    padding-left: 20px;

    .tip {
        font-weight: 900;
        color: #7f7f7f;
        font-size: 20px;
    }

    .box-card {

        margin: 20px 0px;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user {
            display: flex;
            flex-wrap: wrap;

            .Item {
                width: 32%;
                margin: 5px;
            }
        }
    }

    .btn {
        display: flex;
        justify-content: center;
        margin: 10px 0;
    }
}
</style>