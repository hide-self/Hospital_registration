<template>
    <!-- 展示全部订单的结构 -->
    <el-card>
        <template #header>
            <div class="card-header">
                <span>挂号订单</span>
            </div>
        </template>

        <!-- 提供用户选择的下拉菜单 -->
        <el-form :inline="true">
            <el-form-item label="就诊人" style="width: 45%;">
                <el-select placeholder="请选择就诊人" v-model="patientId" @change="changeUser">
                    <el-option label="请选择就诊人" value=""></el-option>
                    <el-option v-for="item in allUser" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单状态" style="width: 45%;">
                <el-select placeholder="请选择所有订单状态" v-model="orderStatus" @change="changeStatus">
                    <el-option label="请选择订单状态" value=""></el-option>
                    <el-option v-for="item in allOrderStatus" :key="item.status" :label="item.comment" :value="item.status"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <!-- 展示订单数据的表格 -->
        <el-table :data="allOrderArr" style="width: 100%;margin: 10px 0px;">
            <el-table-column prop="reserveDate" label="就诊时间" />
            <el-table-column prop="hosname" label="医院" />
            <el-table-column prop="depname" label="科室" />
            <el-table-column prop="title" label="医生" />
            <el-table-column prop="amount" label="服务费" />
            <el-table-column prop="patientName" label="就诊人" />
            <el-table-column prop="param.orderStatusString" label="订单状态" />
            <el-table-column label="操作">
                <template  #="{row}">
                    <el-button type="text" @click="goDetail(row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        

        <!-- 底部分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            :background="true" layout="prev, pager, next, jumper,->,total, sizes" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
</template>

<script setup lang="ts" name="">
import { reqUserOrderInfo,reqAllUser,reqOrderState } from '@/api/user';
import type { AllOrderState, AllOrderStateResponseData, AllUser, AllUserResponseData, Records, UserOrderInfoResponseData } from '@/api/user/type';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// 当前页码
let pageNo = ref<number>(1)
// 一页中的数据
let pageSize = ref<number>(10)
// 收集就诊人ID
let patientId=ref<string>('')
// 收集订单状态
let orderStatus=ref<string>('')
// 一页中的所有数据记录
let allOrderArr=ref<Records>([])
// 存储订单的总个数
let total=ref<number>(0)
// 获取路由器对象
let $router=useRouter()

// 存储所有就诊人信息
let allUser=ref<AllUser>([])
// 存储所有订单状态种类
let allOrderStatus=ref<AllOrderState>([])

// 挂载后发起请求
onMounted(()=>{
    // 获取相应订单的方法
    getOrderInfo()

    // 获取全部就诊人信息、获取全部订单状态种类
    getData()

})

const getOrderInfo=async()=>{
    let result:UserOrderInfoResponseData=await reqUserOrderInfo(pageNo.value,pageSize.value,patientId.value,orderStatus.value)
    if(result.code==200){
        allOrderArr.value=result.data.records
        total.value=result.data.total
    }
    
}

// 点击后进入订单详情
const goDetail=(row:any)=>{
    $router.push({path:'/user/order',query:{orderId:row.id}})
}

// 点击下一页之后获取新一页数据的事件回调
// 页码改变时，自动触发
const handleCurrentChange=()=>{
    getOrderInfo()
    
}

// 一页上展示数据量改变的事件回调
// 页容量改变时，自动触发
const handleSizeChange=()=>{
    getOrderInfo()
}

// 获取全部就诊人信息
const getData=async()=>{
    let result:AllUserResponseData=await reqAllUser()
    let result2:AllOrderStateResponseData=await reqOrderState()
    if(result.code==200){
        allUser.value=result.data
    }
    if(result2.code==200){
        allOrderStatus.value=result2.data
    }
    
}

// 就诊人下拉菜单回调方法
const changeUser=()=>{
    // 根据就诊人ID，筛选订单
    getOrderInfo()
}

// 订单状态下拉菜单回调方法
const changeStatus=()=>{
    // 根据订单状态，筛选订单
    getOrderInfo()
}

</script>

<style scoped></style>