<template>
    <!-- 实名认证组件的结构 -->
    <el-card class="box-card">
        <!-- 卡片头部 -->
        <template #header>
            <div class="card-header">
                <h1>实名信息</h1>
            </div>
        </template>

        <!-- 卡片身体上半部分放置实名认证提示 -->
        <div class="tip" style="color: #7f7f7f;">
            <el-icon>
                <InfoFilled />
            </el-icon>
            <p>完成实名认证后才可以添加就诊人，进行正常挂号，为了不影响后续步骤，建议提前实名认证</p>
        </div>

        <!-- 卡片身体下半部分分为两种情况进行陈列：认证成功、未认证成功 -->
        <el-descriptions v-if="userInfo?.authStatus==1" size="small" class="margin-top" :column="1" style="margin: 20px auto;" border>
            <el-descriptions-item label-align="center" width="25px">
                <template #label>
                    <div class="cell-item">
                        用户姓名
                    </div>
                </template>
                {{ userInfo.name }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" width="25px">
                <template #label>
                    <div class="cell-item">
                        证件类型
                    </div>
                </template>
                {{ userInfo.certificatesType=='10'?'身份证':'户口本' }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" width="25px">
                <template #label>
                    <div class="cell-item">
                        证件号码
                    </div>
                </template>
                {{ userInfo.certificatesNo }}
            </el-descriptions-item>

        </el-descriptions>

        <!-- 用户未验证结构 -->
        <el-form style="width: 60%;margin: 20px auto;" label-width="80" v-else>
            <el-form-item v-model="value" label="用户姓名">
                <el-input placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select placeholder="请选择证件类型" style="width:100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item v-model="value" label="证件号码">
                <el-input style="width: 100%;" placeholder="请输入证件号码"></el-input>
            </el-form-item>
            <el-form-item label="上传证件">
                <el-upload list-type="picture-card">
                    <img style="width: 100%;height: 100%;" src="../../../assets/images/auth_example.png" alt="">
                </el-upload>

                <!-- <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog> -->
            </el-form-item>

            <el-form-item>
                <el-button type="primary">提交</el-button>
                <el-button>重写</el-button>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script setup lang="ts" name="">
import { reqUserInfo } from '@/api/user';
import type { UserInfo, UseringoResponseData } from '@/api/user/type';
import { InfoFilled } from '@element-plus/icons-vue';
import { ref, onMounted } from 'vue';


const value = ref('')

const options = [
    {
        value: '身份证',
        label: '身份证',
    },
    {
        value: '户口本',
        label: '户口本',
    },

]

let userInfo=ref<UserInfo>()

// 挂载
onMounted(() => {
    // 获取用户信息的方法
    getUserInfo()
})

const getUserInfo = async () => {
    let result: UseringoResponseData = await reqUserInfo();
    if(result.code==200){
        userInfo.value=result.data
    }


}


</script>

<style scoped lang="scss">
.box-card {
    .tip {
        display: flex;
        justify-content: center;
        align-items: center;

    }


}
</style>