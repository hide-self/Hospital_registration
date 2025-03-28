<template>
    <!-- 参考代码1（自动补全）：https://element-plus.org/zh-CN/component/autocomplete.html -->
    <!-- 参考代码2（按钮）：https://element-plus.org/zh-CN/component/button.html -->
    <!-- 参考代码3：（字体图标）：https://element-plus.org/zh-CN/component/icon.html -->
    <div class="search">
        <el-autocomplete v-model="hosname" clearable class="inline-input w-50" placeholder="请输入医院名称"
        :fetch-suggestions="fetchData"
        :trigger-on-focus="false"
        @select="goDetail" />
        <el-button :icon="Search" type="primary">搜索</el-button>
    </div>

</template>

<script setup lang="ts" name="seachBar">
import { Search } from '@element-plus/icons-vue'
import { reqHospitalInfo } from '@/api/home'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { HospitalInfo,Content } from '@/api/home/type'

// 收集搜索的关键字
let hosname = ref<string>('')

// fetchData获取数据,当且仅当鼠标获取聚焦或者输入新数据后才会触发该函数
// 在使用:trigger-on-focus="false"后，光标聚焦后不再直接发请求，只在输入数据后才会发请求
const fetchData=async(keyword:string,cb:any)=>{
    // console.log(keyword);//keyword为用户输入数据
    // console.log(cb);//cb是回调函数
    
    // 当用户输入完关键字后，此函数会执行一次，发请求，获取需要展示的数据即可

    let result: HospitalInfo = await reqHospitalInfo(keyword);
    
    // 整理数据，变成人家组件需要的数据格式，展示时必须有value
    let showData=result.data.map(item=>{
        return {
            value:item.hosname, //value作为匹配内容，必须展示医院名字
            hoscode:item.hoscode//存储医院的编码（唯一标识符）
        }
    })

    cb(showData)
}

// 创建路由器对象
let $router=useRouter()


// 点击某个推荐项后，触发的事件
// 点击推荐项目后跳转路由，进入医院详情页面
const goDetail=(item:any)=>{
    // 此处的item就是showData这个数组中的元素对象，他们的内容如上有value和hoscode两种属性

    // 跳转后将来要携带参数（医院编码）
    $router.push({path:'/hospital'})
}

</script>

<style scoped lang="scss">
.search {
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
    :deep(.inline-input) {
        width: 600px;
    }


}
</style>