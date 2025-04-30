<template>
    <div class="login-container">
        <!-- v-model是控制对话框显示与否的布尔值 -->
        <!-- title是对话框左上角的标题 -->
        <el-dialog v-model="userStore.visiable" title="用户登录" @close="closeDialog">
            <!-- 对话框身体部分结构 -->
            <div class="content">
                <el-row>
                    <!-- 左侧结构：手机号码登陆、微信扫码登录 -->
                    <el-col :span="12">
                        <div class="login">
                            <div v-show="scene == 0">
                                <el-form :model="loginParam" :rules="rules" ref="form">
                                    <el-form-item prop="phone">
                                        <el-input placeholder="请输入手机号" :prefix-icon="User"
                                            v-model="loginParam.phone"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="code">
                                        <el-input placeholder="请输入手机验证码" :prefix-icon="Lock"
                                            v-model="loginParam.code"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button :disabled="!isPhone || flag" @click="getCode">
                                            <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                                            <span v-else>获取验证码</span>

                                        </el-button>
                                    </el-form-item>
                                </el-form>
                                <el-button style="width: 100%;" type="primary"
                                    :disabled="!isPhone || loginParam.code.length != 6" @click="login">用户登录</el-button>
                                <div class="bottom" @click="changeScene">
                                    <p>微信扫码登录</p>
                                    <svg t="1743399438150" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2661" width="16" height="16">
                                        <path
                                            d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                            fill="#28C445" p-id="2662"></path>
                                        <path
                                            d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                            fill="#28C445" p-id="2663"></path>
                                    </svg>

                                </div>
                            </div>

                            <div class="webchat" v-show="scene == 1">
                                <!-- 在这个容器中显示微信扫码登陆 -->
                                <div id="login_container"></div>
                                <div class="phone" @click="handler">
                                    <p>手机短息验证码登录</p>
                                    <svg t="1744036714548" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2769" width="16" height="16">
                                        <path
                                            d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                            p-id="2770"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </el-col>

                    <!-- 右侧结构 -->
                    <el-col :span="12">
                        <div class="rightContent">
                            <div class="top">
                                <div class="item">
                                    <img src="../../assets/images/code_app.png" alt="">
                                    <svg t="1743399438150" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2661" width="16" height="16">
                                        <path
                                            d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                            fill="#cdcdcd" p-id="2662"></path>
                                        <path
                                            d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                            fill="#cdcdcd" p-id="2663"></path>
                                    </svg>
                                    <p>微信扫一扫关注</p>
                                    <p>快速预约挂号</p>
                                </div>
                                <div class="item">
                                    <img src="../../assets/images/code_login_wechat.png" alt="">
                                    <svg t="1743399972984" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="3864" width="16" height="16">
                                        <path
                                            d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                                            fill="#000000" p-id="3865"></path>
                                    </svg>
                                    <p>微信扫一扫下载</p>
                                    <p>预约挂号App</p>
                                </div>

                            </div>
                        </div>
                        <p class="tip">xxxxx官方指定平台</p>
                        <p class="tip">快速挂号，安全放心</p>
                    </el-col>
                </el-row>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="closeDialog" type="primary">取消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref, computed,watch } from 'vue';

// 引入字体图标
import { User, Lock } from '@element-plus/icons-vue';

// 引入pinia仓库
import useUserStore from '@/store/modules/user';

// 引入倒计时组件
import CountDown from '@/components/countdown/index.vue'
import { ElMessage } from 'element-plus';

// 获取user的仓库数据(visialbe，用于控制对话框的显示与隐藏)
let userStore = useUserStore()

// 引入微信扫码登录参数请求
import { reqWxLogin } from '@/api/hospital';
import type { WXLoginResponseData } from '@/api/hospital/type';

//引入路由和路由器，便于在登陆后，重新回到待访问页面
import { useRoute,useRouter } from 'vue-router';

// 获取路由和路由器
let $route=useRoute()
let $router=useRouter()


let scene = ref<number>(0);//0代表手机号码登陆，1代表微信扫码登录

// 点击“微信扫码登陆|微信小图标”切换为微信扫码登录

const changeScene = async () => {
    scene.value = 1

    // 发请求获取微信扫码二维码需要的参数
    // 需要携带一个参数：登陆成功后重定向的页面位置，通常是是服务器域名，此处就是本地http://localhost:5173
    let redirect_URL = encodeURIComponent(window.location.origin)
    // console.log(redirect_URL)//输出结果为http://localhost:5173
    let result: WXLoginResponseData = await reqWxLogin(redirect_URL)


    // 生成微信扫码登录的二维码页面
    // 官方文档：https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
    //@ts-ignore
    var obj = new WxLogin({
        self_redirect: true,//true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri，false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。默认为 false。
        id: "login_container",//显示二维码标签的id设置
        appid: result.data.appid,//提交审核后才可以有（300元）
        scope: "snsapi_login",//参数值固定，表示当前页面已授权
        redirect_uri: result.data.redirectUri,//重定向地址，审核时填写的授权回调域
        state: result.data.state,//state就是服务器重定向地址(携带用户信息)
        style: "black",//二维码外观，只有black和white两种值
        href: "",//css样式链接
        //@ts-ignore
        onReady: function (isReady) {
            console.log(isReady);
        }
    });
}


// 收集表单中的手机号码用于验证码获取与填充
let loginParam = reactive({
    phone: '',//手机
    code: '',//手机验证码
})

// 用计算属性计算出当前表单元素收集的手机号码是否符合手机正则表达式
let isPhone = computed(() => {
    // 手机号码的正则表达式
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

    return reg.test(loginParam.phone)
})

// 获取验证码按钮的回调
const getCode = async () => {
    // 点击获取验证码后，除了要发请求，还要开启倒计时来防抖
    flag.value = true
    try {
        // 验证码的获取，在Pinia仓库中存储
        await userStore.getCode(loginParam.phone)
        loginParam.code = userStore.code
    } catch (error) {
        //获取验证码失败
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }

}

// 定义一个响应式数据来控制倒计时数据的显示与隐藏
let flag = ref<boolean>(false)//flag为真开启获取验证码倒计时

// 计数器子组件绑定的自定义事件
// 当倒计时为0时，flag重新变成false
const getFlag = (val: boolean) => {
    // 倒计时模式结束
    flag.value = val

}

// 获取form组件实例
let form = ref<any>()

// 手机号码的自定义校验规则
const validatorPhone = (rule: any, value: any, callBack: any) => {
    // rule是表单校验规则对象
    // value即为当前文本内容
    // callBack即为回调函数。无参数传入，就是无提示；有错误对象参数传入时，会红字提示，相当于官方提供的message

    // 手机号码的正则表达式
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (reg.test(value)) {
        callBack()
    }
    else {
        callBack(new Error('请输入正确的手机号码格式'))
    }
}

// 验证码的自定义校验规则
const validatorCode = (rule: any, value: any, callBack: any) => {
    // 验证码的正则表达式
    const reg = /^\d{6}$/
    if (reg.test(value)) {
        callBack()
    }
    else {
        callBack(new Error('请输入正确的验证码格式'))
    }
}

// 表单校验规则
const rules = {
    /*接下来的官方提供的简单校验方式*/
    // required代表当前字段无比进行校验
    // message代表校验错误后的提示
    // trigger代表表单触发时机，有两种值：change(文本变化时触发)、blur(失去焦点时触发)
    // min与max代表最小和最大位数
    // phone:[
    //     {required: true, message: '手机号码务必是11位',trigger:'blur',min:11},
    // ],
    // code:[
    //     {required: true, message: '手机验证码务必是6位',trigger:'change',min:6},
    // ],

    /* 接下来是官方提供的自定义校验方式 */
    phone: [{ trigger: 'change', validator: validatorPhone }],
    code: [{ trigger: 'change', validator: validatorCode }],
}






// 用户登录按钮事件
const login = async () => {
    // 登录校验
    // await form.value.validator()

    // 发起登录请求
    // 发起请求成功：顶部组件需要展示用户名字、关闭dialog
    // 发起请求失败：弹出对应登陆失败信息
    try {
        // 用户登陆成功
        await userStore.userLogin(loginParam)

        // 关闭对话框
        userStore.visiable = false

        // 获取url上的query参数，并在登陆后，跳转到原本想要访问的页面
        let redirect=$route.query.redirect
        if(redirect){
            $router.push(redirect as string)
        }
        else{
            $router.push('/home')
        }

    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}

// 对话框关闭事件,用于清除对话框内的数据和校验提示
const closeDialog = () => {
    // // 法一：将对应数据一一置为初始值
    // Object.assign(loginParam, { phone: "", code: "" })//登录表单内容
    // scene.value = 0//切换为手机号码登录
    // userStore.visiable = false//对话框不可见
    // form.value.resetFields()//清除校验状态

    // 法二：在App组件中的login组件加上v-if="userStore.visiable"，然后在此事件中回调将visiable置为false
    // 用此方法本质上可以使得登录对话框不显示时自动卸载
    userStore.visiable = false
}

// 点击手机验证码盒子，切换成手机验证码登录模式
const handler=()=>{
    scene.value=0
}

// 监听场景数值
watch(()=>scene.value,(val:number)=>{
    if(val==1){
        userStore.queryState()
    }
})

</script>

<style scoped lang="scss">
.login-container {
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .login {
        padding: 20px;
        border: 1px solid #ccc;

        .webchat {
            display: flex;
            flex-direction: column;
            align-items: center;

            .phone {
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                p{
                    margin: 10px 0;
                    
                }
            }
        }
    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 10px 0;
        }

        cursor: pointer;
    }

    .rightContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 130px;
                    height: 130px;
                }

                p {
                    margin: 5px 0;
                }
            }
        }
    }

    .tip {
        text-align: center;
        margin: 20px 0;
        font-size: 20px;
        font-weight: 900;
    }
}
</style>