<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级：</div>
            <ul class="hospital">
                <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
                <li v-for="level in levelArr" :key="level.value" @click="changeLevel(level.value)" :class="{active:activeFlag==level.value}">{{ level.name }}</li>

            </ul>
        </div>
    </div>
</template>

<script setup lang="ts" name="Level">
import { reqHospitalLevelAndRegion } from '@/api/home';
import { onMounted,ref } from 'vue';
import type { HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData } from '@/api/home/type';

// 定义一个数组来存储医院等级
let levelArr=ref<HospitalLevelAndRegionArr>([]);

// 控制医院等级高亮的响应式数组
let activeFlag=ref<string>('')

function changeLevel(curlevel : string){
    // 高亮的响应是数据存储
    activeFlag.value=curlevel

    // 触发自定义事件：将医院等级参数传回父组件
    $emit('getLevel',curlevel)
}

// 组件挂载完毕
onMounted(()=>{
    getLevel()
})

// 获取医院等级的数据
const getLevel=async()=>{
    let result:HospitalLevelAndRegionResponseData=await reqHospitalLevelAndRegion('HosType')
    // console.log(result);
    if(result.code==200){
        levelArr.value=result.data
    }
    
}

let $emit=defineEmits(['getLevel'])

</script>

<style scoped lang="scss">
.level {
    color: #7f7f7f;

    h1 {
        font-weight: 900;
        margin: 10px 0;
    }

    .content {
        display: flex;

        .left {
            margin-right: 10px;
        }

        .hospital {
            display: flex;

            li {
                margin-right: 10px;
                cursor: pointer;
                // 如果li标签中带有active
                &.active{
                    color: #55a6fe;
                }
            }
            li:hover{
                color: #55a6fe;
                
            }
        }
    }
}
</style>