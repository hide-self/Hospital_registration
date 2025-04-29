<template>
    <!-- 就诊人的静态结构 -->
    <el-card>
        <template #header>
            <div class="card-header">
                <span>就诊人管理</span>
                <el-button type="success" :icon="User" @click="addUser">添加就诊人</el-button>
            </div>
        </template>
        <!-- 就诊人管理模块 -->
        <div class="visitors" v-if="scene == 0">
            <Visitor @remove-user="removeUser" @change-Scene="changeScene" class="item" v-for="(user, index) in userArr" :key="user.id"
                :user="user" :index="index" />
        </div>

        <!-- 添加就诊人|修改已有的就诊人信息的结构 -->
        <div class="form" v-else>
            <el-divider content-position="left">就诊人信息</el-divider>
            <el-form style="width: 60%;margin: 10px auto;" label-width="80">
                <el-form-item label="用户姓名">
                    <el-input placeholder="请您输入用户姓名" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请您选择证件类型" style="width: 100%" v-model="userParams.certificatesType">
                        <el-option v-for="item in certationArr" :key="item.id" :label="item.name" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请您输入证件号码" v-model="userParams.certificatesNo"></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                    <el-radio-group v-model="userParams.sex">
                        <el-radio value="1">男</el-radio>
                        <el-radio value="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker type="date" placeholder="请选择您的出生日期" value-format="YYYY-MM-DD" v-model="userParams.birthdate"></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请您输入手机号码" v-model="userParams.phone"></el-input>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
            <el-form style="width: 60%;margin: 10px auto;" label-width="80">
                <el-form-item label="婚姻状况">
                    <el-radio-group v-model="userParams.isMarry">
                        <el-radio value="1">已婚</el-radio>
                        <el-radio value="0">未婚</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="自费/医保">
                    <el-radio-group v-model="userParams.isInsure">
                        <el-radio value="1">自费</el-radio>
                        <el-radio value="0">医保</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="当前住址">
                    <el-cascader :props="props" v-model="userParams.addressSelected"/>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input placeholder="请输入您的详细地址" v-model="userParams.address"></el-input>
                </el-form-item>
            </el-form>

            <el-divider content-position="left">联系人信息（选填）</el-divider>
            <el-form style="width: 60%;margin: 10px auto;" label-width="80">
                <el-form-item label="用户姓名">
                    <el-input placeholder="请您输入用户姓名" v-model="userParams.contactsName"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请您选择证件类型" style="width: 100%" v-model="userParams.contactsCertificatesType">
                        <el-option v-for="item in certationArr" :key="item.id" :label="item.name" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请您输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请您输入手机号码" v-model="userParams.contactsPhone"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button>重写</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>


</template>

<script setup lang="ts" name="">
import { User } from '@element-plus/icons-vue';
import { reqGetUser } from '@/api/hospital';
import { onMounted, reactive, ref,watch } from 'vue';
import type { UserArr, UserResponseData } from '@/api/hospital/type';
import { reqAddOrUpdateUser, reqCertationType, reqCity } from '@/api/user/index'
import type { AddOrUpdateUser, CertationArr, CertationTypeResponseData } from '@/api/user/type';
import { ElMessage, type CascaderProps } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

// 存储全部就诊人的信息
let userArr = ref<UserArr>([])

// 定义一个响应式数据来决定卡片的身体部分的展示内容（就诊人陈列or修改添加就诊人）
let scene = ref<number>(0)//scene为0时，陈列就诊人；scene为1时，展示表单

// 存储证件类型的数组
let certationArr = ref<CertationArr>([])

// 定义路由器
let $router=useRouter()
// 定义路由
let $route=useRoute()

// 收集新增就诊人的数据
let userParams=reactive<AddOrUpdateUser>({
    name: "",
    certificatesType: "",
    certificatesNo:"",
    sex:0,
    birthdate:"",
    phone:"",
    isMarry:0,
    isInsure:0,
    addressSelected:[],
    address:"",
    contactsName:"",
    contactsCertificatesType:"",
    contactsCertificatesNo:"",
    contactsPhone:""
})

// 组件挂载完毕后，获取就诊人信息
// 此处将onMounted内部函数写成async和await，是为了阻塞前两个请求，等他们完全执行完之后，再执行下面两个判断
onMounted(() => {
    // 获取就诊人信息封装成方法，便于后面增删改再次获取请求
    getAllUser()

    // 获取证件类型的数据
    getCertationType()

    // 挂载后，判断一下当前组件是否是医院挂号那里跳转过来的（通过判断路由上面是否带上type来确定，带了就是跳转过来的）
    if($route.query.type=='add'){
        scene.value=1
    }
    else if($route.query.type=='edit'){
        scene.value=1

    }
})

// 获取全部就诊人信息
const getAllUser = async () => {
    let result: UserResponseData = await reqGetUser()
    if (result.code == 200) {
        userArr.value = result.data
    }

}

// 清空表单
const reset=()=>{
    Object.assign(userParams,{
    id:null,
    name: "",
    certificatesType: "",
    certificatesNo:"",
    sex:0,
    birthdate:"",
    phone:"",
    isMarry:0,
    isInsure:0,
    addressSelected:[],
    address:"",
    contactsName:"",
    contactsCertificatesType:"",
    contactsCertificatesNo:"",
    contactsPhone:""
})
}

// 按钮“添加就诊人”按下后切换表单
const addUser = () => {
    // 每次点击添加就诊人都要清空表单
    reset()

    scene.value = 1
}

// 按钮“编辑“，跳转到表单
const changeScene = (user:AddOrUpdateUser) => {
    scene.value = 1

    // 收集已有的就诊人信息
    Object.assign(userParams,user)
}

// 点击”删除“，且删除成功后，重新发请求，更新界面
const removeUser=()=>{
    // 再次获取全部就诊人信息
    getAllUser()
}

// 获取证件类型的接口
const getCertationType = async () => {
    let result: CertationTypeResponseData = await reqCertationType()
    if (result.code == 200) {
        certationArr.value = result.data
    }
}

// 级联选择器接口（详见elementPlus的级联选择器的动态加载）
const props:CascaderProps = {
    lazy: true,//懒加载，需要的时候再发请求

    // lazyLoad就是级联选择器加载数据的方法
    // 该方法的触发时机：挂载的时候会触发一次，此后点击每个层级后又会加载一次
    async lazyLoad(node, resolve) {
        // node表示发请求送回来的数组的被点击的元素
        // resolve表示一个方法，传入一个由对象组成的数组，它的常见固定构成如下方的showData数组,其中它的id、label、value、leaf都是固定名称

        //第一级别默认发送一个86，获得所有市区
        let result:any=await reqCity(node.data?.id as string||'86')

        // 整理数据
        let showData=result.data.map(((item:any)=>{
            return {//此处返回的label和value分别是级联选择器的两个需要收集的数据的固定名称
                id:item.id,//id表示发请求获得下一个层级的参数
                label:item.name,//label是显示标签
                value:item.value,//value是点击标签后获取的值
                leaf:!item.hasChildren//false表示有孩子，true表示没有孩子，这个是反过来的
            }
        }))
        
        // 注入组件需要展示的数据
        // 注入的数据是一个数组，这个数组的每个元素都是{label:某个值,value:某个值}，这个对象的含义如上
        resolve(showData)
        
    },

}

// 点击提交后的回调方法
const submit=async()=>{
    // 新增就诊人 or 更新一个已有的就诊人
    try {
        // 新增用户成功 or 更新已有用户成功
        await reqAddOrUpdateUser(userParams)
        // 成功后提示（提示词根据具体操作而变）
        ElMessage({
            type:'success',
            message:userParams.id?'更新成功':'添加成功'
        })
        // 成功添加或修改后，切换场景,转换为展示所有就诊人 || 如果路由上带有type，则返回医院挂号那里的“regiseter_step2”
        scene.value=0
        // 再次重新获取全部就诊人信息
        getAllUser()
    } catch (error) {
        ElMessage({
            type:'error',
            message:userParams.id?'更新失败':'添加失败'
        })
    }
    
}


// 监听所有就诊人的数据
watch(
    () => userArr.value,
  () => {
    if ($route.query.type == "edit") {
       let user  = userArr.value.find((item:any)=>{
           return item.id==$route.query.id;
       });
      Object.assign(userParams,user)
    }
  }
)



</script>

<style scoped lang="scss">
.card-header {
    display: flex;
    justify-content: space-between; //主轴
    align-items: center; //侧轴
}

.visitors {
    display: flex;
    flex-wrap: wrap; //弹性子元素默认不换行，这里改成换行

    .item {
        width: 32%;
        margin: 5px;
    }
}
</style>