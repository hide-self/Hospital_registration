<template>
    <div class="register">
        <!-- 顶部标题区 -->
        <div class="top">
            <div class="title">{{ hospitalStore.hospitalInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1743213646172" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2643" width="16" height="16">
                    <path
                        d="M621.674667 408.021333c16.618667-74.24 28.224-127.936 34.837333-161.194666C673.152 163.093333 629.941333 85.333333 544.298667 85.333333c-77.226667 0-116.010667 38.378667-138.88 115.093334l-0.586667 2.24c-13.728 62.058667-34.72 110.165333-62.506667 144.586666a158.261333 158.261333 0 0 1-119.733333 58.965334l-21.909333 0.469333C148.437333 407.808 106.666667 450.816 106.666667 503.498667V821.333333c0 64.8 52.106667 117.333333 116.394666 117.333334h412.522667c84.736 0 160.373333-53.568 189.12-133.92l85.696-239.584c21.802667-60.96-9.536-128.202667-70.005333-150.186667a115.552 115.552 0 0 0-39.488-6.954667H621.674667zM544.256 149.333333c39.253333 0 59.498667 36.48 49.888 84.928-7.573333 38.144-21.984 104.426667-43.221333 198.666667-4.512 20.021333 10.56 39.093333 30.912 39.093333h218.666666c6.101333 0 12.16 1.066667 17.909334 3.168 27.445333 9.984 41.674667 40.554667 31.776 68.266667l-85.568 239.573333C744.981333 838.026667 693.301333 874.666667 635.402667 874.666667H223.498667C194.314667 874.666667 170.666667 850.784 170.666667 821.333333V503.498667c0-17.866667 14.144-32.448 31.829333-32.821334l21.866667-0.469333a221.12 221.12 0 0 0 167.381333-82.56c34.346667-42.602667 59.146667-99.306667 74.869333-169.877333C482.101333 166.336 499.552 149.333333 544.266667 149.333333z"
                        fill="#d81e06" p-id="2644"></path>
                </svg>
                <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>

            </div>
        </div>

        <!-- 展示内容区 -->
        <div class="content">
            <div class="left">
                <img :src="`data:image/jpeg;base64,`+hospitalStore.hospitalInfo.hospital?.logoData" alt="">
            </div>
            <div class="right">
                <div>挂号规则</div>
                <div class="time">
                    预约周期：10天 放号时间：{{ hospitalStore.hospitalInfo.bookingRule?.releaseTime }} 停挂事件：{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}
                </div>
                <div class="address">
                    具体地址：{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}
                </div>
                <div class="route">
                    具体路线：{{ hospitalStore.hospitalInfo.hospital?.route }}
                </div>
                <div class="releasetime">
                    退号时间：就诊前一工作日{{ hospitalStore.hospitalInfo.bookingRule?.quitTime }}前取消
                </div>
                <div class="ruler">预约挂号规则</div>
                <div class="rulerInfo" v-for="(item,index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key="index">
                    {{ index+1 }}.{{ item }}
                </div>
            </div>
        </div>

        <!-- 放置每个医院科室的数据 -->
        <div class="department">
            <div class="leftNav">
                <ul>
                    <li @click="changeIndex(index)" v-for="(department,index) in hospitalStore.departmentArr" :key="department.depcode" :class="{active:index==currentIndex}">{{ department.depname }}</li>
                </ul>
            </div>
            <div class="departmentInfo">
                <!-- 用一个div代表：一个大科室与小科室 -->
                 <div class="showDepartment" v-for="(department,index) in hospitalStore.departmentArr" :key="department.depcode">
                    <h1 class="cur">
                        {{ department.depname }}
                    </h1>
                    <ul>
                        <li @click="showLogin(item)" v-for="(item) in department.children" :key="item.depcode">{{ item.depname }}</li>
                    </ul>
                 </div>
            </div>
        </div>

        
    </div>
</template>

<script setup lang="ts" name="Register">
// 引入医院详情的数据
import useDetailStore from '@/store/modules/hospitalDetails';
import { ref } from 'vue';
import useUserStore from '@/store/modules/user';

// 引入路由器用于跳转
import { useRouter,useRoute } from 'vue-router';

let $router=useRouter()
let $route=useRoute()

let hospitalStore = useDetailStore()

// 控制科室高亮的响应式数据
let currentIndex=ref<number>(0)

// 左侧大的科室点击的事件
const changeIndex=(index:number)=>{
    currentIndex.value=index;

    // 点击导航获取右侧科室（大的科室的h1标题）
    let allH1=document.querySelectorAll('.cur')
    // 点击后滚动到对于科室的位置
    allH1[currentIndex.value].scrollIntoView({behavior:'smooth'})
}


let userStore=useUserStore()
const showLogin=(item:any)=>{
    // 若未登录，展示登录对话框
    // userStore.visiable=true

    // 登陆后，点击医院科室，进入到相应的预约挂号详情页面register_step1.vue
    // 跳转路由时，携带医院编号和科室编号
    $router.push({path:'/hospital/register_step1',query:{hoscode:$route.query.hosCode,depcode:item.depcode}})


}

</script>

<style scoped lang="scss">
.register {
    padding-left: 20px;

    .top {
        display: flex;

        .title {
            font-size: 30px;
            font-weight: 900;
        }

        .level {
            color: #7f7f7f;
            margin-left: 10px;
            text-align: center;
            line-height: 40px;

            span {
                margin-left: 5px;
            }
        }
    }
    .content{
        margin-top: 20px;
        display: flex;
        .left{
            width: 80px;
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }
        .right{
            // 左侧设置宽度为80px，右侧设置flex为1，可以将剩下空间全给右侧
            flex: 1;
            margin-left: 20px;
            .time,.address,.route,.releasetime,.rulerInfo{
                font-size: 14px;
                margin-top: 10px;
                color: #7f7f7f;
            }
            .ruler{
                margin: 10px 0;
            }
            
        }
    }
    .department{
        width: 100%;
        height: 500px;
        display: flex;
        margin-top: 20px;
        .leftNav{
            width: 80px;
            height: 100%;
            ul{
                width: 100%;
                height: 100%;
                background-color: rgb(248,248,248);
                display: flex;
                flex-direction: column;
                li{
                    flex: 1;
                    text-align: center;
                    color: #7f7f7f;
                    font-size: 14px;
                    line-height: 30px;
                    cursor: pointer;
                    &.active{
                        border-left: 1px solid red;
                        color:red;
                        background-color: white;
                    }
                }
                li:hover{
                    color: red;
                }
            }
        }
        .departmentInfo{
            flex: 1;
            margin-left: 20px;
            height: 100%;
            overflow: auto;
            &::-webkit-scrollbar{
                display: none;
            }
            .showDepartment{
                h1{
                    background-color: rgb(248,248,248);
                    color: #7f7f7f;
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        color: #7f7f7f;
                        width: 33%;
                        line-height: 30px;
                        cursor: pointer;
                    }
                    li:hover{
                        opacity: 0.5;
                    }
                }
            }
        }
    }

}
</style>