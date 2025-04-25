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
        <!-- 这里的修改authStatus不等于1 -->
        <el-descriptions v-if="userInfo?.authStatus == 1" size="small" class="margin-top" :column="1"
            style="margin: 20px auto;" border>
            <el-descriptions-item label-align="center" width="25px">
                <template #label>
                    <div class="cell-item">
                        用户姓名
                    </div>
                </template>
                {{ userInfo?.name }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" width="25px">
                <template #label>
                    <div class="cell-item">
                        证件类型
                    </div>
                </template>
                {{ userInfo?.certificatesType == '10' ? '身份证' : '户口本' }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" width="25px">
                <template #label>
                    <div class="cell-item">
                        证件号码
                    </div>
                </template>
                {{ userInfo?.certificatesNo }}
            </el-descriptions-item>

        </el-descriptions>

        <!-- 用户未验证结构 -->
        <el-form ref="form" :rules="rules" :model="params" style="width: 60%;margin: 20px auto;" label-width="80" v-else>
            <el-form-item label="用户姓名" prop="name">
                <el-input v-model="params.name" placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" prop="certificatesType">
                <el-select v-model="params.certificatesType" placeholder="请选择证件类型" style="width:100%">
                    <el-option v-for="(item, index) in arrType" :key="index" :label="item.name" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="certificatesNo">
                <el-input v-model="params.certificatesNo" style="width: 100%;" placeholder="请输入证件号码"></el-input>
            </el-form-item>
            <el-form-item v-model="params.name" label="上传证件" prop="certificatesUrl">
                <!-- action:upload组件向服务器提交图片的路径 -->
                <!-- limit:表示照片墙最多上传的照片数目 -->
                <el-upload ref="upload" :on-remove="handleRemove" :on-preview="handlePictureCardPreview" :on-success="successhandler"
                    :on-exceed="exceedhandler" :limit="1" list-type="picture-card"
                    action="/api/oss/file/fileUpload?fileHost=userAuah">
                    <img style="width: 100%;height: 100%;" src="../../../assets/images/auth_example.png" alt="">
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full v-if="params.certificatesUrl" style="width: 100%;height: 100%;"
                        :src="params.certificatesUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="reset">重写</el-button>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script setup lang="ts" name="">
import { reqUserInfo, reqCertationType, reqUserCertation } from '@/api/user';
import type { CertationArr, CertationTypeResponseData, UserInfo, UseringoResponseData, UserParams } from '@/api/user/type';
import { InfoFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref, onMounted, reactive } from 'vue';

// 获取上传组件
let upload=ref()
// 获取表单组件
let form=ref()

// 存储用户信息
let userInfo = ref<UserInfo>()
// 存储证件类型
let arrType = ref<CertationArr>([])
// 收集用户表单认证的数据
let params = reactive<UserParams>({
    "certificatesNo": "",
    "certificatesType": "",
    "certificatesUrl": "",
    "name": ""
})

// 上传图片的弹窗
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 挂载
onMounted(() => {
    // 获取用户信息的方法
    getUserInfo()

    // 获取证件类型的接口
    getType()
})

const getUserInfo = async () => {
    let result: UseringoResponseData = await reqUserInfo();
    if (result.code == 200) {
        userInfo.value = result.data
    }


}

const getType = async () => {
    let result: CertationTypeResponseData = await reqCertationType()
    if (result.code == 200) {
        arrType.value = result.data
    }
}

const exceedhandler = () => {
    ElMessage({
        type: 'error',
        message: '图片只能上传一张'
    })
}

// 上传图片成功后的回调
const successhandler = (response: any, uploadFile: any, uploadFiles: any) => {
    // 若图片上传成功，将校验结果清除
    form.value.clearValidate('certificatesUrl')

    // 收集上传成功的图片地址
    // response:上传图片请求服务器返回的图片url
    // uploadFile:表示上传图片的信息（字节大小，图片url）
    // uploadFiles:表示上传图片组的信息（字节大小，图片url）
    params.certificatesUrl = response.data
}

// 查看上传图片的回调
const handlePictureCardPreview = (uploadFile: any) => {
    dialogVisible.value = true
}

// 删除上传图片的回调
const handleRemove = () => {
    // 清除文件上传列表
    upload.value.clearFiles()

    params.certificatesUrl = ''
}

// 重写按钮
const reset = () => {
    Object.assign(params, {
        "certificatesNo": "",
        "certificatesType": "",
        "certificatesUrl": "",
        "name": ""
    })
    upload.value.clearFiles()
}

// 提交按钮
const submit=async()=>{
    // 全部的表单校验
    //这行代码可以保证所有表单校验通过，并且返回成功的Promise
    // 若有一个校验失败返回的是一个失败的promise对象，后面的语句就不再执行了
    await form.value.validate()


    try {
        // 认证成功
        let result:any=await reqUserCertation(params)
        // 提示消息
        ElMessage({
            type:'success',
            message:'认证成功'
        })
        // 认证成功后再次获取用户信息
        getUserInfo()
    } catch (error) {
        ElMessage({
            type:'error',
            message:'认证失败'
        })
    }
}

// 自定义校验规则：姓名校验方法
const validatorName=(rule:any,value:any,callBack:any)=>{
    // rule即为当前校验字段的校验规则对象
    const reg = /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确中国人的名字"));
  }
}

// 自定义校验规则：证件类型校验方法
const validatorType=(rule:any,value:any,callBack:any)=>{
    if(value=='10'||value=='20'){
        callBack()
    }else{
        callBack(new Error('请选择证件的类型'))
    }
    
}

// 自定义校验规则：证件号码
const validatorNo = (rule: any, value: any, callBack:any) => {
  let sfz = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
  let hkb = /^\d{9}$/;
  if (sfz.test(value) || hkb.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的身份证或者户口本的号码"));
  }
};

// 自定义校验规则：上传图片
const validatorUrl = (rule: any, value: any, callBack: any) => {
  if (value.length) {
    callBack();
  } else {
    callBack(new Error("请上传证件照图片"));
  }
};

// 表单校验规则对象
const rules={
    // 用户姓名的校验规则
    name:[{
        required:true,//当前表单项为必填项
        validator:validatorName//文本变化时检测，检测函数为validatorName
    }],
    certificatesType:[{
        required:true,//当前表单项为必填项
        validator:validatorType//文本变化时检测
    }],
    certificatesNo:[{
        required:true,//当前表单项为必填项
        validator:validatorNo//文本变化时检测
    }],
    certificatesUrl: [{
      required: true,
      validator: validatorUrl,
    }],
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