<template>
    <div class="visitor">
        <div class="top">
            <div class="left">
                <span class="free">{{ user.isInsure == 1 ? '医保' : '自费' }}</span>
                <span class="username">{{ user.name }}</span>
            </div>
            <div class="right">
                <el-button @click="handler" circle type="primary" size="default" :icon="Edit"></el-button>
                <el-popconfirm @confirm="removeUser" class="box-item" :title="`你确定要删除${user.name}吗？`" width="200" placement="bottom">
                    <template #reference> 
                        <el-button v-if="$route.path == '/user/patient'" circle type="danger"
                            size="default" :icon="Delete"></el-button>
                    </template>
                </el-popconfirm>


            </div>
        </div>
        <div class="bottom">
            <p>证件类型：{{ user.param.certificatesTypeString }}</p>
            <p>证件号码：{{ user.certificatesNo }}</p>
            <p>用户性别：{{ user.sex == 0 ? "女生" : "男士" }}</p>
            <p>出生日期：{{ user.birthdate }}</p>
            <p>手机号码：{{ user.phone }}</p>
            <p>婚姻状况：{{ user.isMarry == 0 ? "未婚" : "已婚" }}</p>
            <p>当前住址：{{ user.param.cityString }}</p>
            <p>详细地址：{{ user.param.fullAddress }}</p>

            <!-- 红色“已选择”大字 -->
            <Transition name="confirm">
                <div class="confirm" v-if="index == currentIndex">已选择</div>
            </Transition>

        </div>
    </div>
</template>

<script setup lang="ts" name="Visitor">
import { reqRemoveUser } from '@/api/user';
import { Delete, Edit } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

let props = defineProps(['user', 'currentIndex', 'index'])

// 获取路由
let $route = useRoute()
// 获取路由器
let $router = useRouter()

// 声明自定义事件
let $emit = defineEmits(['change-Scene','remove-user'])

// 点击修改按钮的回调
const handler = () => {
    // 要么是就诊人管理模块点击修改按钮 ， 要么是预约挂号regiser_step2点击的修改
    if ($route.path == '/user/patient') {
        $emit('change-Scene', props.user)
    }
    else {
        // 跳转到编辑界面，并携带type='edit',id:props.user.id
        $router.push({ path: '/user/patient', query: { type: 'edit', id: props.user.id } })

    }

}

// 删除某一个用户
const removeUser=async()=>{
    try {
        // 删除用户成功
        await reqRemoveUser(props.user.id)
        // 消息提示
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        $emit('remove-user')

    } catch (error) {
        
    }
}

</script>

<style scoped lang="scss">
.visitor {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

    .top {
        height: 60px;
        background-color: #e5e5e5;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .left {
            .free {
                background-color: white;
                padding: 5px;
                font-size: 12px;
                margin-right: 5px;
                border-radius: 10px;
            }

            .username {
                color: #7f7f7f;
            }
        }
    }

    .bottom {
        padding-left: 50px;
        position: relative;

        p {
            line-height: 40px;
        }

        .confirm {
            position: absolute;
            width: 200px;
            height: 200px;
            color: red;
            border-radius: 50%;
            border: 1px dashed red;
            text-align: center;
            line-height: 200px;
            left: 20%;
            top: 20%;
            opacity: 0.5;
            transform: rotate(25deg);
            font-weight: 900;
        }

        .confirm-enter-from {
            transform: scale(1);
        }

        .confirm-enter-active {
            transition: all 0.3s;
        }

        .confirm-enter-to {
            transform: scale(1.2);
        }
    }
}
</style>