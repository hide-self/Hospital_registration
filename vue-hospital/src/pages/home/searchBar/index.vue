<template>
    <!-- 参考代码1（自动补全）：https://element-plus.org/zh-CN/component/autocomplete.html -->
    <!-- 参考代码2（按钮）：https://element-plus.org/zh-CN/component/button.html -->
    <!-- 参考代码3：（字体图标）：https://element-plus.org/zh-CN/component/icon.html -->
    <div class="search">
        <el-autocomplete v-model="state2" :fetch-suggestions="querySearch" :trigger-on-focus="false" clearable
            class="inline-input w-50" placeholder="请输入医院名称" @select="handleSelect" />
            <el-button :icon="Search" type="primary">搜索</el-button>
    </div>

</template>

<script setup lang="ts" name="seachBar">
import { Search } from '@element-plus/icons-vue'

import { onMounted, ref } from 'vue'

interface RestaurantItem {
    value: string
    link: string
}

const state1 = ref('')
const state2 = ref('')

const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
    // call callback function to return suggestions
    cb(results)
}
const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}
const loadAll = () => {
    return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' },
    ]
}

const handleSelect = (item: Record<string, any>) => {
    console.log(item)
}

onMounted(() => {
    restaurants.value = loadAll()
})
</script>

<style scoped lang="scss">
.search{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;


    /* 
        三种深度选择器（用于修改组件样式）：
        1.css     >>>
        2.less    /deep/
        3.sass（引入时被称作scss）    ::v-deep 选择器   或者  :deep(选择器)
     */
    :deep(.inline-input){
        width: 600px;
    }


}
</style>