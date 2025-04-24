<template>
    <el-card class="box-card">
        <!-- 卡片头部 -->
        <template #header>
            <div class="detail">
                挂号详情
            </div>
        </template>

        <!-- 展示身体部分的顶部结构 -->
        <div class="top">
            <!-- 左侧的标签 -->
            <el-tag type="success">
                <div class="tag">
                    <svg t="1745287160474" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2663" width="16" height="16">
                        <path
                            d="M939.36 218.912a32 32 0 0 1 45.856 44.672l-538.016 552a32 32 0 0 1-43.776 1.92L63.872 526.048a32 32 0 1 1 41.696-48.544l316.768 271.936L939.36 218.88z"
                            fill="#19fa28" p-id="2664"></path>
                    </svg>
                    <span>{{ orderInfo?.param.orderStatusString }}</span>
                </div>
            </el-tag>

            <!-- 右侧的二维码 -->
            <div class="right_info">
                <img src="@/assets/images/code_app.png" alt="">
                <div class="info">
                    <p>微信 关注 “北京114预约挂号”</p>
                    <p>“快速挂号”</p>
                </div>
            </div>
        </div>

        <!-- 订单详情底部的结构 -->
        <div class="bottom">
            <div class="left">
                <el-descriptions :column="1" border>
                    <el-descriptions-item label="就诊人信息">{{ orderInfo?.patientName }}</el-descriptions-item>
                    <el-descriptions-item label="就诊日期">{{ orderInfo?.reserveDate }}</el-descriptions-item>
                    <el-descriptions-item label="就诊医院">{{ orderInfo?.hosname }}</el-descriptions-item>
                    <el-descriptions-item label="就诊科室">{{ orderInfo?.depname }}</el-descriptions-item>
                    <el-descriptions-item label="医生职称">{{ orderInfo?.title }}</el-descriptions-item>
                    <el-descriptions-item label="医事服务费">
                        <span style="color: red;">{{ orderInfo?.amount }}元</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="挂号单号">{{ orderInfo?.outTradeNo }}</el-descriptions-item>
                    <el-descriptions-item label="挂号时间">{{ orderInfo?.createTime }}</el-descriptions-item>
                </el-descriptions>
                <div class="btn" v-if="orderInfo?.orderStatus == 0 || orderInfo?.orderStatus == 1">
                    <el-popconfirm class="box-item" title="确定取消预约吗?" placement="bottom" @confirm="cancelmyOrder">
                        <template #reference>
                            <el-button>取消预约</el-button>
                        </template>
                    </el-popconfirm>

                    <el-button @click="openDialog" type="primary" size="default"
                        v-if="orderInfo.orderStatus == 0">支付</el-button>
                </div>
            </div>
            <div class="right">
                <el-card shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span>注意事项</span>
                        </div>
                    </template>
                    <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
                    <p style="color: red">
                        2.【取号】就诊当天需在{{ orderInfo?.fetchTime }}前
                        在医院取号，未取号视为爽约，该号不退不换；
                    </p>
                    <p>
                        3.【退号】在{{ orderInfo?.quitTime }}前可在线退号 ，逾期将不可办理退号退费；
                    </p>
                    <p>
                        4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
                    </p>
                    <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                </el-card>
            </div>
        </div>

    </el-card>

    <!-- 展示支付二维码 -->
    <!-- 对话框通过v-model 来控制显示与隐藏 -->
    <div class="zhifu">
        <el-dialog v-model="dialogVisible" title="微信支付" width="500" @close="closeDialog">
            <!-- 支付中需要使用的二维码图片 -->
            <div class="qrcode">
                <img :src="imgUrl" alt="">
                <p>使用微信扫一扫</p>
                <p>扫描二维码支付</p>
            </div>
            <!-- 底部窗口关闭 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="closeDialog">关闭窗口</el-button>
                </div>
            </template>
        </el-dialog>
    </div>

</template>

<script setup lang="ts" name="">
import { reqCancelOrder, reqOrderInfo, reqQrcode, reqQueryPayState } from '@/api/user';
import type { OrderInfo, OrderResponseData, PayReslt, QrCode } from '@/api/user/type';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// 生成二维码插件
//@ts-ignore
import QRCode from 'qrcode'

// 存储订单信息
let orderInfo = ref<OrderInfo>()

// 路由
let $route = useRoute()

// 控制对话框显示与隐藏的布尔值
let dialogVisible = ref<boolean>(false)

// 定义存储二维码路径的url
let imgUrl = ref<string>('')

// 存储定时器引用
let timer = ref<any>()

onMounted(() => {
    getOrderInfo()
})

// 获取订单详情
const getOrderInfo = async () => {
    let result: OrderResponseData = await reqOrderInfo($route.query.orderId as string)
    if (result.code == 200) {
        orderInfo.value = result.data
    }

}

// 取消订单
// 订单状态有三种 orderStatus : -1(取消预约)、0(预约了，但是没有支付)
const cancelmyOrder = async () => {
    try {
        // 取消预约成功
        let result = await reqCancelOrder($route.query.orderId as string)
        console.log(result);

        // 再次获取订单详情数据
        getOrderInfo()
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '取消预约失败'
        })
    }

}


// 打开对话框
const openDialog = async () => {
    dialogVisible.value = true

    // 发请求获取支付二维码
    let result: QrCode = await reqQrcode($route.query.orderId as string)

    if (result.code == 200) {
        // 根据服务器返回二维码信息生成二维码图片
        imgUrl.value = await QRCode.toDataURL(result.data.codeUrl)

        // 询问支付结果
        // 只要二维码查来：需要每隔几秒询问服务器是否支付成功
        timer.value = setInterval(async () => {
            let result2: PayReslt = await reqQueryPayState($route.query.orderId as string)
            if (result2.data) {
                // 支付成功关闭对话框
                dialogVisible.value = false
                // 弹出消息提示用户支付成功
                ElMessage({
                    message: '支付成功',
                    type: 'success',
                })
                // 清除定时器
                clearInterval(timer.value)
                // 支付成功后，再次获取订单详情（主要是修改上面的tag标签的状态）
                getOrderInfo()
            }
        }, 2000)

    }
}


// 关闭对话框
const closeDialog=()=>{
    dialogVisible.value=false
    clearInterval(timer.value)
}

</script>

<style scoped lang="scss">
.box-card {
    .detail {
        color: #7f7f7f;
        font-weight: 900;
    }

    .top {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 10px;

        .tag {
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                margin-left: 5px;
            }
        }

        .right_info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
            }

            .info {
                margin-left: 10px;

                p {
                    font-size: 12px;
                    line-height: 20px;
                }
            }
        }
    }

    .bottom {
        display: flex;
        margin-top: 20px;

        .left {
            flex: 4;

            .btn {
                margin: 10px 0;
            }
        }

        .right {
            margin-left: 20px;
            flex: 6;

            p {
                line-height: 30px;
            }
        }
    }
}

.zhifu {
    :deep(.el-dialog__body) {
        border-top: 1px solid #7f7f7f;
        border-bottom: 1px solid #7f7f7f;
    }
}

.qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        line-height: 30px;
    }
}
</style>