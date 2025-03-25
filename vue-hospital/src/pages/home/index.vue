<template>
    <div>
        <!-- 首页轮播图 -->
        <Carousel />

        <!-- 首页搜索医院表单区域 -->
        <searchBar />

        <!-- 首页底部展示医院 -->
        <!-- :gutter用于设置列间距，此处相当于margin:0 10px -->
        <el-row :gutter="20">
            <!-- elementPlus每一行有24格，通过:span来设置所占份额 -->
            <el-col :span="20">
                <!-- 等级子组件 -->
                <Level />

                <!-- 地区子组件 -->
                <Region />

                <!-- 展示医院结构 -->
                <div class="hospital">
                    <Card class="item" v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item" />
                </div>
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                    :size="size" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
                    @current-change="currentChange"
                    @size-change="sizeChange" />


            </el-col>
            <el-col :span="4">456</el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import Carousel from './carousel/index.vue'
import searchBar from './searchBar/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'

import { ref, onMounted } from 'vue'
import { reqHospital } from '@/api/home'

// 为了写size的类型而引入的
import type { ComponentSize } from 'element-plus'

// 引入泛型
import type { Content,HospitalResponseData } from '@/api/home/type'

// 分页器需要的数据
let pageNo = ref<number>(1);//当前页码
let pageSize = ref<number>(10);//每一页呈现的数据条数
const size = ref<ComponentSize>('default')


// 存储已有的医院数据
let hasHospitalArr = ref<Content>([])
let total = ref<number>(0)

// 组件挂在完毕，发一次请求
onMounted(() => {
    getHospitalInfo()

})
// 获取已有的医院的数据
const getHospitalInfo = async () => {
    // 获取医院数据：默认获取第一页，一页十个
    let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value)
    // console.log(result);
    // console.log(result.data.content);


    if (result.code == 200) {
        //存储已有的医院的数据
        hasHospitalArr.value = result.data.content;
        //存储医院的总个数
        total.value = result.data.totalElements;
    }
}

// 分页器页码发生变化时，触发的回调，实现一个翻页功能
const currentChange = () => {
    // 当前页码是通过双向绑定变量pageNo来实现的
    // 当前页码中显示的卡片数量是通过双向绑定变量pageSize来实现的


    // 触发页码改变事件后，再次请求，默认会把数组继续下去
    getHospitalInfo()
}


// 分页器下拉菜单选择呈现个数发生变化的时候，出发回调，实现一个改变一页中呈现个数的功能
const sizeChange=()=>{
    getHospitalInfo()
}

</script>

<style scoped lang="scss">
.hospital {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 48%;
        margin: 10px 0;
    }
}
</style>