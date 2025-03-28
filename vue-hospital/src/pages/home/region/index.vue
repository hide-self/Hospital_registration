<template>
    <div class="region">
        <div class="content">
            <div class="left">地区：</div>
            <ul>
                <li :class="{ active: activeFlag == '' }" @click="changeRegion('')">全部</li>
                <li v-for="region in regionArr" :key="region.value" @click="changeRegion(region.value)"
                    :class="{ active: activeFlag == region.value }">{{ region.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts" name="Region">
import { reqHospitalLevelAndRegion } from '@/api/home';
import { onMounted, ref } from 'vue';
import type { HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData } from '@/api/home/type';

let regionArr = ref<HospitalLevelAndRegionArr>([]);

// 控制医院地区高亮的响应式数组
let activeFlag = ref<string>('')

function changeRegion(curregion: string) {
    // 高亮的响应是数据存储
    activeFlag.value = curregion

    // 触发自定义事件：将医院地区参数传回父组件
    $emit('getRegion', curregion)
}

// 地区组件挂载完毕，获取地区数据
onMounted(() => {
    getRegion()
})

const getRegion = async () => {
    let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin')
    if (result.code == 200) {
        regionArr.value = result.data
    }

}


let $emit = defineEmits(['getRegion'])

</script>

<style scoped lang="scss">
.region {
    color: #7f7f7f;
    margin-top: 10px;

    .content {
        display: flex;

        .left {
            margin-right: 10px;
            width: 51.5px;
        }

        ul {
            display: flex;
            flex-wrap: wrap;
            white-space: nowrap;

            li {
                margin-right: 10px;
                margin-bottom: 10px;
                cursor: pointer;

                &.active {
                    color: #55a6fe;
                }
            }

            li:hover {
                color: #55a6fe;
            }
        }
    }
}
</style>