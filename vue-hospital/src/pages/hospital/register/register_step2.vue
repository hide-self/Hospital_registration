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
                <Visitor v-for="item in 4" :key="item" class="Item" />
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
                    xxxxxx
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊医院:
                        </div>
                    </template>
                    xxxxx
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊科室:
                        </div>
                    </template>
                    xxx
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生姓名:
                        </div>
                    </template>
                    xxx
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生职称:
                        </div>
                    </template>
                    xxx
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生专长:
                        </div>
                    </template>
                    xxx
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医事服务费:
                        </div>
                    </template>
                    <span style="color: red;">100</span>
                </el-descriptions-item>
            </el-descriptions>


        </el-card>

        <!-- 确定挂号按钮 -->
        <div class="btn">
            <el-button type="primary" size="large" @click="" >确认挂号</el-button>
        </div>
    </div>
</template>

<script setup lang="ts" name="">
// 引入用户图标
import { User } from '@element-plus/icons-vue';

// 就诊人组件
import Visitor from './visitor.vue';

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

    .btn{
        display: flex;
        justify-content: center;
        margin: 10px 0;
    }
}
</style>